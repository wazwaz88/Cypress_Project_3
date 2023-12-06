class ProjectPage {

    getRadioButton(){
        return cy.get(".radio input")
    }

    getLabels(){
        return cy.get(".field > .label")
    }

    getDropdowns(){
        return cy.get('.field select')
    }

    getDatePickers(){
        return cy.get('.field input[type="text"]')
    }

    getBookButton(){
        return cy.get('button[type="submit"]')
    }

    getTicketDepartLabel(){
        return cy.get('.field h1')
    }

    getTicketLocations(){
        return cy.get('.field h3')
    }

    getTicketDate(){
        return cy.get('.field p')
    }

    getTicketDetails(){
        return cy.get('.mt-4 > p')
    }

    getReturnLabel(){
        return cy.get('.ml h1')
    }

    getReturnLocations(){
        return cy.get('.ml h3')
    }

    getReturnDate(){
        return cy.get('.ml p')
    }

}

module.exports = ProjectPage