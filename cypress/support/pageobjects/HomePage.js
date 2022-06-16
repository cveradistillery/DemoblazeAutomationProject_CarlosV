class HomePage {
    getProductStore() {
        return cy.get('#nava');
    }

    getUserIsLoggedIn() {
        //return cy.get('#nameofuser[style="display: block;"');
        return cy.get('#nameofuser');
    }
}

export default HomePage