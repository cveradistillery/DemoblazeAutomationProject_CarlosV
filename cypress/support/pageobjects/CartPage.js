class CartPage {
    getProductItems() {
        return cy.get('#tbodyid tr.success');
    }
    getPlaceOrderButton() {
        return cy.get('#page-wrapper button[class="btn btn-success"][data-toggle="modal"]');
    }
    getPlaceOrderModal() {
        //return cy.get('#orderModalLabel');
        return cy.get('label#totalm');
    }
    getTotalPlaceOrderModal() {
        return cy.get('#totalm');
    }
}

export default CartPage