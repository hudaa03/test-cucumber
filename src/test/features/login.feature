Feature: User Login and Navigate

  Scenario: User logs in and navigates
    Given the user navigates to the Spendflo login page
    When the user logs in with email "rishi@spendfloone.com" and password "Test@12345"
    And skips the "Skip for now" button if it appears
    And handles the Pendo popup if it appears
    And selects the "SpendfloOne" organization if necessary
    Then the user should be on the Spendflo homepage

