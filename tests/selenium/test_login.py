import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time
import uuid

@pytest.fixture
def driver():
    options = Options()
    options.add_argument("--headless") 
    driver = webdriver.Chrome(options=options)
    yield driver
    driver.quit()

def test_login_form_visible(driver):
    driver.get("http://localhost:3000/login.html")
    assert driver.find_element(By.ID, "loginForm").is_displayed()

def test_email_and_password_fields_exist(driver):
    driver.get("http://localhost:3000/login.html")
    email = driver.find_element(By.ID, "email")
    password = driver.find_element(By.ID, "password")
    assert email.is_displayed()
    assert password.is_displayed()

def test_login_button_exists(driver):
    driver.get("http://localhost:3000/login.html")
    button = driver.find_element(By.XPATH, "//button[@type='submit']")
    assert button.is_enabled()

def test_login_with_invalid_credentials_shows_error(driver):
    driver.get("http://localhost:3000/login.html")
    driver.find_element(By.ID, "email").send_keys("wrong@example.com")
    driver.find_element(By.ID, "password").send_keys("wrongpassword")
    driver.find_element(By.XPATH, "//button[@type='submit']").click()
    time.sleep(1)
    error = driver.find_element(By.ID, "error")
    assert "error" in error.get_attribute("class")
    assert error.text != ""

def register_user(driver, email, password):
    driver.get("http://localhost:3000/register.html")
    driver.find_element(By.ID, "email").send_keys(email)
    driver.find_element(By.ID, "password").send_keys(password)
    driver.find_element(By.ID, "confirmPassword").send_keys(password)
    driver.find_element(By.XPATH, "//button[@type='submit']").click()
    time.sleep(1.5)

def test_successful_login_redirects_to_profile(driver):
    unique_email = f"user_{uuid.uuid4().hex[:6]}@test.com"
    password = "testpass123"

    register_user(driver, unique_email, password)

    driver.get("http://localhost:3000/login.html")
    driver.find_element(By.ID, "email").send_keys(unique_email)
    driver.find_element(By.ID, "password").send_keys(password)
    driver.find_element(By.XPATH, "//button[@type='submit']").click()
    time.sleep(1.5)
    assert "profile.html" in driver.current_url
