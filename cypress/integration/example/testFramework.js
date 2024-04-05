import homePage from "../pageObjects/homePage"
import productsPage from "../pageObjects/productsPage"
import checkoutPage from "../pageObjects/checkoutPage"
import deliveryAddressPage from "../pageObjects/deliveryAddressPage"


describe('Framework building', function(){

    before(function() {
        cy.fixture('dataForTestFramework').then(function(data) {
            this.data = data
        })
    })

    it('Test case 1', function(){
// defaultCommandTimeout is only applied to this spec file
        // Cypress.config('defaultCommandTimeout', 8000)

// creating an object of homePage class.
        const homePageObject = new homePage()
        const productPageObject = new productsPage()
        const checkoutPageObject = new checkoutPage()
        const deliveryAddressPageObject = new deliveryAddressPage()

        cy.visit(Cypress.env('url')+"/angularpractice")
        
        homePageObject.getNameEditBox().type(this.data.name)
        homePageObject.selectGenderDropdown().select(this.data.gender)
        homePageObject.getTwoWayDataBindingEditBox().should('have.value',this.data.name)
        homePageObject.getNameEditBox().should('have.attr', 'minlength', '2')
        homePageObject.getEntrepreneaur().should('be.disabled')

        homePageObject.getShopTab().click()

// using foreach loop to select all the products passed from custom comands added in commands.js
        this.data.productName.forEach((element) => cy.selectProduct(element));

        productPageObject.getCheckoutButton().click()

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
        
        deliveryAddressPageObject.getCountryDropdownBox().type('India')

// defaultCommandTimeout is only applied to this spec file
        cy.get('.suggestions > ul > li > a').click()
        deliveryAddressPageObject.getTermsAndConditionsCheckbox().click({force: true})
        deliveryAddressPageObject.getPurchaseButton().click()
        deliveryAddressPageObject.getTheSuccessText().then(function(element){
            const successText = element.text()
            expect(successText.includes('Success!')).to.be.true
        })
        
    })
})