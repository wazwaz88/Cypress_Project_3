const ProjectPage = require("../pages/ProjectPage")

describe('Project - Booking Function', () => {
    
beforeEach(() => {
    cy.visit('https://techglobal-training.com/frontend/project-3')
})

const projectPage = new ProjectPage()

it('Test Case 01 - Validate the default Book your trip form', () => {

    projectPage.getRadioButton().first().should("be.visible").and('be.enabled').and('be.checked')
    projectPage.getRadioButton().last().should("be.visible").and('be.enabled').and('not.be.checked')

    const data = ['Cabin Class', 'From', "To", 'Depart', 'Return', 'Number of passengers', 'Passenger 1']
    projectPage.getLabels().each((el, index) => {
        cy.wrap(el).should('be.visible').and('have.text', data[index])
    })
    projectPage.getDropdowns().each((el) => {
        cy.wrap(el).should('be.visible')
    })

    projectPage.getDatePickers().first().should('be.visible')
    projectPage.getDatePickers().last().should('be.visible').and('be.disabled')

    projectPage.getDropdowns().eq(3).children().first().should('have.attr', 'value', 1)
    projectPage.getDropdowns().eq(4).children().first().should('have.text', 'Adult (16-64)')

    projectPage.getBookButton().should('be.visible').and('be.enabled')

})

it('Test Case 02 - Validate the Book your trip form when Round trip is selected', () => {
    projectPage.getRadioButton().last().click()
    projectPage.getRadioButton().last().should('be.checked')
    projectPage.getRadioButton().first().should('not.be.checked')

    const data = ['Cabin Class', 'From', "To", 'Depart', 'Return', 'Number of passengers', 'Passenger 1']
    projectPage.getLabels().each((el, index) => {
        cy.wrap(el).should('be.visible').and('have.text', data[index])
    })

    projectPage.getDropdowns().each((el) => {
        cy.wrap(el).should('be.visible')
    })

    projectPage.getDatePickers().first().should('be.visible')
    projectPage.getDatePickers().last().should('be.visible')

    projectPage.getDropdowns().eq(3).children().first().should('have.attr', 'value', 1)
    projectPage.getDropdowns().eq(4).children().first().should('have.text', 'Adult (16-64)')

    projectPage.getBookButton().should('be.visible').and('be.enabled')

})

it('Test Case 03 - Validate the booking for 1 passenger and one way', () => {
    projectPage.getRadioButton().first().click()
    const selectArr = ['Business', 'Illinois', 'Florida', '1', 'Senior (65+)']
    projectPage.getDropdowns().each((el, index) => {
        cy.wrap(el).select(selectArr[index])
    })
    const obj = new Date();
    let year = obj.getFullYear()
    let date = obj.getDate() + 7
    let month = obj.getMonth() + 1

    projectPage.getDatePickers().first().clear().type(`${month}/${date}/${year}{enter}`)

    projectPage.getBookButton().click()

    projectPage.getTicketDepartLabel().should('have.text', 'DEPART')
    projectPage.getTicketLocations().should('have.text', 'IL to FL')
    projectPage.getTicketDate().should('have.text', 'Wed Dec 13 2023')

    const moreTicketDetails = ['Number of Passengers: 1', 'Passenger 1: Senior (65+)', 'Cabin class: Business']

    projectPage.getTicketDetails().each((el, i) => {
        cy.wrap(el).should('have.text', moreTicketDetails[i])
    })

})

it('Test Case 04 - Validate the booking for 1 passenger and round trip', () => {
    projectPage.getRadioButton().last().click()

    const selectArr = ['First', 'California', 'Illinois', '1', 'Adult (16-64)']
    projectPage.getDropdowns().each((el, index) => {
        cy.wrap(el).select(selectArr[index])
    })

    const obj1 = new Date();
    let year = obj1.getFullYear()
    let date = obj1.getDate() + 7
    let month = obj1.getMonth() + 1

    const obj2 = new Date();
    let year2 = obj2.getFullYear() + 1
    let date2 = obj2.getDate()
    let month2 = obj2.getMonth() - 10;

    projectPage.getDatePickers().first().clear().type(`${month}/${date}/${year}{enter}`)
    projectPage.getDatePickers().last().clear().type(`${month2}/${date2}/${year2}{enter}`)

    projectPage.getBookButton().click()

    projectPage.getTicketDepartLabel().should('have.text', 'DEPARTRETURN')
    projectPage.getTicketLocations().should('have.text', 'CA to ILIL to CA')
    projectPage.getTicketDate().should('have.text', 'Wed Dec 13 2023Sat Jan 06 2024')

    const moreTicketDetails = ['Number of Passengers: 1', 'Passenger 1: Adult (16-64)', 'Cabin class: First']

    projectPage.getTicketDetails().each((el, i) => {
        cy.wrap(el).should('have.text', moreTicketDetails[i])
    })


})

it.only('Test Case 05 - Validate the booking for 2 passengers and one way', () => {
    projectPage.getRadioButton().first().click()
    projectPage.getDropdowns().eq(3).select('2')
    const selectArr = ['Premium Economy', 'New York', 'Texas', '2', 'Adult (16-64)', 'Child (2-11)']
    projectPage.getDropdowns().each((el, index) => {
        cy.wrap(el).select(selectArr[index])
    })

    const obj1 = new Date();
    let year = obj1.getFullYear()
    let date = obj1.getDate() + 1
    let month = obj1.getMonth() + 1

    projectPage.getDatePickers().first().clear().type(`${month}/${date}/${year}{enter}`)

    projectPage.getBookButton().click()

    projectPage.getTicketDepartLabel().should('have.text', 'DEPART')
    projectPage.getTicketLocations().should('have.text', 'NY to TX')
    projectPage.getTicketDate().should('have.text', 'Thu Dec 07 2023')

    const moreTicketDetails = ['Number of Passengers: 2', 'Passenger 1: Adult (16-64)', 'Passenger 2: Child (2-11)', 'Cabin class: Premium Economy']

    projectPage.getTicketDetails().each((el, i) => {
        cy.wrap(el).should('have.text', moreTicketDetails[i])
    })


})



})