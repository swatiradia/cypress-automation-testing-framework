import { Given, Then, When, And } from "@badeball/cypress-cucumber-preprocessor"
import homePage from "../../../pageObjects/homePage";
import productsPage from "../../../pageObjects/productsPage";
import checkoutPage from "../../../pageObjects/checkoutPage";
import deliveryAddressPage from "../../../pageObjects/deliveryAddressPage";

const homePageObject = new homePage()
const productPageObject = new productsPage()
const checkoutPageObject = new checkoutPage()
const deliveryAddressPageObject = new deliveryAddressPage()

Given('I open the ECommerce page', ()=>{
    cy.visit(Cypress.env('url')+"/angularpractice")

})

When('I add items to the cart', function(dataTable){
// using foreach loop to select all the products passed from custom comands added in commands.js
    cy.selectProduct(dataTable.rawTable[1][0])
    cy.selectProduct(dataTable.rawTable[1][1])
    productPageObject.getCheckoutButton().click()
})

When('validate the total of the items is calculated correctly', ()=>{

// Code to check the cost of all the product adds up to the Total displayed
    var totalCostCal = 0
    productPageObject.getTheProductsCost().each(($e1, index, $list)=>{
        const productCost = $e1.text()
        var resultProductCost = productCost.split(" ")
        resultProductCost = resultProductCost[1].trim()
        totalCostCal = Number(totalCostCal) + Number(resultProductCost)
    }).then(function(){
        cy.log(totalCostCal)
    })

// Assertion to check the summed up cost equals total cost
    productPageObject.getTotal().then(function(element){
        const totalBill = element.text()
        var resultBill = totalBill.split(" ")
        resultBill = resultBill[1].trim()
        expect(Number(resultBill)).to.equal(totalCostCal)
    })

    checkoutPageObject.getCheckoutButton().click()
})


When('select the country', () =>{
    deliveryAddressPageObject.getCountryDropdownBox().type('India')

// defaultCommandTimeout is only applied to this spec file
        cy.get('.suggestions > ul > li > a').click()
        deliveryAddressPageObject.getTermsAndConditionsCheckbox().click({force: true})

}) 
    
Then('I submit and verify Thank you message', () =>{
    deliveryAddressPageObject.getPurchaseButton().click()
    deliveryAddressPageObject.getTheSuccessText().then(function(element){
        const successText = element.text()
        expect(successText.includes('Success!')).to.be.true
    })

})

When('I fill the form deatils',function(dataTable){

    homePageObject.getNameEditBox().type(dataTable.rawTable[1][0])
    homePageObject.selectGenderDropdown().select(dataTable.rawTable[1][1])
}) 
    
Then('The fields are validate according to requiremnet',function(dataTable){
    homePageObject.getTwoWayDataBindingEditBox().should('have.value',dataTable.rawTable[1][0])
    homePageObject.getNameEditBox().should('have.attr', 'minlength', '2')
    homePageObject.getEntrepreneaur().should('be.disabled')
}) 

When('I click on Shop option on the menu',()=>{
    homePageObject.getShopTab().click()
}) 