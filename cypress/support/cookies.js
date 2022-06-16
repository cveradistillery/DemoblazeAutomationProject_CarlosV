function insertCookies() { //Inserting these explicit cookies since the ones created in https://api.demoblaze.com/ doesn't work in https://www.demoblaze.com/ (even tested manually)
    cy.setCookie('tokenp_', 'dGVzdEB0ZXN0Lm5ldDE2NTU4MTI=')
    cy.setCookie('user', 'fd3c41b5-5203-74b3-cdb7-8248a99a5e4d')
    //cy.log(cy.getCookie('user'))}
    //cy.wait(100)
    cy.reload() //To make sure the user is logged in
}

export { insertCookies };