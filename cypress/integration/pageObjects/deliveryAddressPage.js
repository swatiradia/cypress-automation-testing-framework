class deliveryAddressPage{

getCountryDropdownBox(){
    return cy.get('#country')
}

getTermsAndConditionsCheckbox(){
    return cy.get('#checkbox2')
}

getPurchaseButton(){
    return cy.get('input[type="submit"]')
}

getTheSuccessText(){
    return cy.get('.alert')
}

}

export default deliveryAddressPage