describe('Server authentication cases', function () {
    it('redirect when access /', () => {
        cy.request({
            url: '/',
            followRedirect: false,
        }).then(resp => {
            expect(resp.status).to.eq(302)
            expect(resp.redirectedToUrl).to.eq(Cypress.config().baseUrl + "/login.jsp")
        })
    })

    it('unauthorised when access api endpoints', () => {
        cy.request({
            method: "POST",
            url: "/api/hits",
            failOnStatusCode: false
        }).should((response) => {
            expect(response.status).to.eq(401)
        })
    })

    it('register with short password', () => {
        cy.request({
            method: "POST",
            url: "/api/user/register",
            body: {username: "alsdkfq", password: "5"}
        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.deep.eq({isError: true, errorMessage: "Password should be longer than 4 characters"})
        })
    })

    it('register - user already exists', () => {
        cy.request({
            method: "POST",
            url: "/api/user/register",
            body: {username: "aboba", password: "111111"}
        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.deep.eq({isError: true, errorMessage: "User already exists"})
        })
    })

    it('login with invalid password', () => {
        cy.request({
            method: "POST",
            url: "/api/user/login",
            body: {username: "aboba", password: "12345"},
            failOnStatusCode: false
        }).should((response) => {
            expect(response.status).to.eq(401)
        })
    })

    it('sucessful login', () => {
        cy.request({
            method: "POST",
            url: "/api/user/login",
            body: {username: "aboba", password: "aboba"}
        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.deep.eq({isError: false, errorMessage: "Success"})
        })
    })
})