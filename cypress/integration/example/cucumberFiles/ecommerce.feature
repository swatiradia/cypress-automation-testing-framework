Feature: End-to-end ECommerce validation

    Testing product order placing

    @Regression
    Scenario: ECommerce product order placement
    Given I open the ECommerce page
    When I click on Shop option on the menu
    When I add items to the cart
    When validate the total of the items is calculated correctly
    When select the country 
    Then I submit and verify Thank you message

    @Smoke
    Scenario: Fillling the form to shop
    Given I open the ECommerce page
    When I fill the form deatils
        | name | gender |
        | swati | Female |
    Then The fields are validate according to requiremnet
        | name  |
        | swati |
    When I click on Shop option on the menu