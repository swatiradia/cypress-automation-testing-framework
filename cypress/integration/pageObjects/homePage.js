class homePage{

getNameEditBox(){
    return cy.get('input[name="name"]:nth-child(2)')
}

getTwoWayDataBindingEditBox(){
    return cy.get("input[name='name']:nth-child(1)")
}

selectGenderDropdown(){
    return cy.get('select')
}

getEntrepreneaur(){
    return cy.get('#inlineRadio3')
}

getShopTab(){
    return cy.get("a[href='/angularpractice/shop']")
}

}

export default homePage;