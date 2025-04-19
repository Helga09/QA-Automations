*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}       http://localhost:3000/login.html
${EMAIL}     admin@gmail.com
${PASSWORD}  password
${BROWSER}   Chrome

*** Test Cases ***
Login With Admin Credentials
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Wait Until Element Is Visible    id=email    timeout=10s
    Input Text    id=email    ${EMAIL}
    Input Text    id=password    ${PASSWORD}
    Click Button    xpath=//button[text()='Login']
    Sleep    2s
    [Teardown]    Close Browser

