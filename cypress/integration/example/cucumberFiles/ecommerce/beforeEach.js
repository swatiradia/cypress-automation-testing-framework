
before(function() {
        cy.fixture('dataForTestFramework').then(function(data) {
            this.data = data
        })
    })

