/*
To run this:
> npm i
Headless mode (with video recording of the execution):
> ./node_modules/.bin/cypress run --browser chrome --spec "cypress/e2e/0-integration/demoblaze_spec.cy.js"
https://i.ibb.co/18Z0hTN/image.png

Or if you prefer to run the tests on demand and see the test execution in real time:
> ./node_modules/.bin/cypress open
//If you have the latest Cypress version installed you need to choose E2E Testing + desired browser + Start E2E Testing in <browser>  and just click in the desired <fileTestName>.spec.cy.js test file to run the ATCs

Any failure you will see the correspondent screenshot / Report:
https://i.ibb.co/68dxkxj/image.png

Execution Record:
https://www.veed.io/view/8a57c438-1ff2-4f53-98a3-6f693f8c0fc5
*/

/*
Main Paths:

/cypress.config.js: contains the two valid urls of the site https://api.demoblaze.com/ & https://www.demoblaze.com/
/cypress/e2e/0-integration/demoblaze_spec.cy.js: Valid ATCs / flow (signup, login, product store, cart, place order / purchase)
/cypress/support/pageobjects: PO pattern (it includes the web elements for example)
/cypress/support/cookies.js: cookies management
/cypress/videos: video execution folder if you run the test/s by command line / headless mode
/package.json: project dependencies
*/

import BasePage from '../../support/pageobjects/BasePage'
import CartPage from '../../support/pageobjects/CartPage'
import HomePage from '../../support/pageobjects/HomePage'
import ProductStorePage from '../../support/pageobjects/ProductStorePage'

const cookies = require('../../support/cookies')

describe('Demoblaze', () => {

    describe('Demoblaze Back-end', () => {

        const randomId = Cypress._.random(0, 10000)
        const username = 'Auto_' + randomId + '@test.net'
        const user = { username: username, password: 'automPwd' } //TODO: Create a json file with all the available users
        const automationUser = { username: 'automation@test.net', password: '123' } //We can use 'user' instead (the one created in signup api) but just using this to avoid creating users in every single test execution
        let respbody
        let token

        it('user signup using API enpoints', () => { //Create Random user so we can run this test multiple times with no problems of duplications //console.log('username: ' + username)
            cy.request('POST', '/signup', user) //meaning: https://api.demoblaze.com/signup
                .then((response) => {
                    //cy.log(`status code: ${response.status}`)
                    expect(response.status).to.eq(200)
                })
                .then(
                    (response) => { // response.body is automatically serialized into JSON
                        expect(response.body).to.have.length(0)//EMPTY RESPONSE: PROBABLY IT IS A BUG
                    }
                )
                .its('body')
                .should('deep.eq', '') //Same validation as: expect(response.body).to.eq('')
        })
        
        it('POST user login', () => { //Try to login with the fresh created user
            cy.request('POST', '/login', automationUser) //We can use 'user' instead of this
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.include('Auth_token: ')
                    respbody = response.body;
                })
        })

        it('Full respbody', () => {
            cy.log('body: ' + respbody)
        })

        it('Auth token', () => {
            token = respbody.split(':')[1]
            cy.log(token)
        })

    })


    describe('Demoblaze Front-end', () => {
        const homePage = new HomePage()
        const productStorePage = new ProductStorePage()
        const basePage = new BasePage()
        const cartPage = new CartPage()

        beforeEach(() => {
            cookies.insertCookies()
        })

        it('Navigate to blazedemo website', () => {
            cy.visit(Cypress.config().frontBaseUrl)
        })

        it('Verify blazedemo website is displayed', () => {
            homePage.getProductStore().should('be.visible') //validate PRODUCT STORE brand
        })

        it('Insert Credentials auth cookies', () => {
            //cookies.insertCookies() //already addressed by beforeEach
        })

        it('Verify the user is logged in blazedemo website', () => {
            homePage.getUserIsLoggedIn().should('be.visible')
        })

        it('Click Product Store Link', () => {
            homePage.getProductStore().click()
        })

        it('Verify Product Store URL is displayed', () => {
            cy.url().should('eq', 'https://www.demoblaze.com/index.html')
        })

        it('Click Product Store Item', () => {
            productStorePage.getItems().first().click()
        })

        it('Add Item to cart', () => {
            productStorePage.getAddToCart().click()
        })

        it('Validate Product added alert is displayed and click OK', () => { //confirm alert: 'Product added.' to continue
            cy.on('window:alert', (text) => { //or 'window:confirm'
                expect(text).to.contains('Product added.');
            });

            cy.on('window:confirm', () => true) //will simulate the click of ‘OK’ button.
        })

        it('Go to Cart', () => {
            basePage.getCartNavigationItem().click();
        })

        it('New Product Item was added in my Cart', () => {
            cartPage.getProductItems().should('be.visible') //There is at least one product in my cart (to avoid dependecies with an specific product name)
        })

        it('Place Order - click, modal & grater than zero', () => {
            cy.wait(1000) //Adding this because of flaky ATC from time to time //TODO: Improve this by waiting for Products table completion
            cartPage.getPlaceOrderButton().click() //Click Place Order button

            cartPage.getPlaceOrderModal().should('be.visible') //Validate Place Order modal is being displayed

            const regex = /Total:/; //Validate 'Total: ' text is being displayed by using Regex
            cy.get('label#totalm').contains(new RegExp(regex, 'g')); //cartPage.getTotalPlaceOrderModal().should('contain', new RegExp(regex, 'g'));


            cartPage.getTotalPlaceOrderModal().invoke('text').then((totalText) => { //Validation Total is greater than zero
                //cy.log('TOTAL TEXT: ' + totalText)
                const totalNumber = totalText.replace(/[^0-9]/g, '') //cy.log('Only Total Number: ' + totalNumber)
                cy.wrap(totalNumber).then(parseFloat).should('be.gt', 0);
            })
        })

    })

})

