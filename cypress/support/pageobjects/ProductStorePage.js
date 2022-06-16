class ProductStorePage {

    getItems() {
        return cy.get('#tbodyid h4.card-title');
    }

    getAddToCart() {
        return cy.get( 'a.btn.btn-success.btn-lg[onclick="addToCart(1)"]');
    }
}

export default ProductStorePage