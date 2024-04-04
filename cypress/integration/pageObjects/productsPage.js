class productsPage{

getCheckoutButton(){
    return cy.get('.nav-link.btn.btn-primary')
}

getTheProductsCost(){
    return cy.get('tr td:nth-child(4) strong')
}

getTotal(){
    return cy.get('h3 strong')
}
}

export default productsPage;