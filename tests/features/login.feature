Feature: User Login

  Scenario: Successful login redirects to profile page
    Given I open the login page
    When I enter valid credentials
    And I submit the form
    Then I should be redirected to the profile page

  Scenario: Login fails with invalid credentials
    Given I open the login page
    When I enter invalid credentials
    And I submit the form
    Then I should see an error message
