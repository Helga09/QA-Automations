import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

@pytest.fixture
def driver():
    options = Options()
    options.add_argument("--headless")  # Запуск у headless-режимі
    driver = webdriver.Chrome(options=options)
    driver.get("http://localhost/QA-Automations/QA-Automations/public/login.html")
    yield driver
    driver.quit()

def test_login_form_visible(driver):
    assert driver.find_element(By.ID, "loginForm").is_displayed()

def test_email_and_password_fields_exist(driver):
    email = driver.find_element(By.ID, "email")
    password = driver.find_element(By.ID, "password")
    assert email.is_displayed()
    assert password.is_displayed()

def test_login_button_exists(driver):
    button = driver.find_element(By.XPATH, "//button[@type='submit']")
    assert button.is_enabled()

def test_login_with_invalid_credentials_shows_error(driver):
    driver.find_element(By.ID, "email").send_keys("wrong@example.com")
    driver.find_element(By.ID, "password").send_keys("wrongpassword")
    driver.find_element(By.XPATH, "//button[@type='submit']").click()
    time.sleep(1)  # Чекаємо на відповідь від серверу
    error = driver.find_element(By.ID, "error")
    assert "error" in error.get_attribute("class")
    assert error.text != ""

def test_successful_login_redirects_to_profile(driver):
    driver.find_element(By.ID, "email").send_keys("admin@gmail.com")
    driver.find_element(By.ID, "password").send_keys("password")
    driver.find_element(By.XPATH, "//button[@type='submit']").click()
    time.sleep(1.5)  # Дай час на редірект
    assert "profile.html" in driver.current_url
