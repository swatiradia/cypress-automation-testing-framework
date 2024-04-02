describe('Framework building', function(){

    before(function() {
        cy.fixture('dataForTestFramework').then(function(data) {
            this.data = data
        })
    })

    it('Test case 1', function(){

        cy.visit('https://rahulshettyacademy.com/angularpractice/')
        cy.get('input[name="name"]:nth-child(2)').type(this.data.name)
        cy.get('select').select(this.data.gender)
        cy.get("input[name='name']:nth-child(1)").should('have.value',this.data.name)
        cy.get('input[name="name"]:nth-child(2)').should('have.attr', 'minlength', '2')
        cy.get('#inlineRadio3').should('be.disabled')

        cy.get("a[href='/angularpractice/shop']").click()
        cy.selectProduct('Blackberry')


    })
})