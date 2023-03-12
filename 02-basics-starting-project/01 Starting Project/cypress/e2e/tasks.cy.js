/// <reference types="Cypress" />

describe('tasks management', () => {
  it('should open and close the new task modal', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('.backdrop').click({ force: true });
    cy.get('.backdrop').should('not.exist');
    cy.get('dialog.modal').should('not.exist');
  });

  it('should close modal on cancel button click', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.contains('Cancel').click();

    cy.get('.backdrop').should('not.exist');
    cy.get('dialog.modal').should('not.exist');
  });

  it('should create a new task', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();

    cy.get('#title').type('New task');
    cy.get('#summary').type('Some description');
    cy.get('.modal').contains('Add Task').click();

    cy.get('.backdrop').should('not.exist');
    cy.get('dialog.modal').should('not.exist');
    cy.get('.task').should('have.length', 1);
    cy.get('.task h2').contains('New task');
    cy.get('.task p').contains('Some description');
  });

  it('should validate user input', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();

    cy.get('.modal').contains('Add Task').click();

    cy.contains('Please provide values')
  });

  it('should filter tasks', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();

    cy.get('#title').type('New task');
    cy.get('#summary').type('Some description');
    cy.get('#category').select('urgent');
    cy.get('.modal').contains('Add Task').click();

    cy.get('.task').should('have.length', 1);
    cy.get('#filter').select('moderate');
    cy.get('.task').should('have.length', 0);
    cy.get('#filter').select('urgent');
    cy.get('.task').should('have.length', 1);
    cy.get('#filter').select('all');
    cy.get('.task').should('have.length', 1);
  });

  it('should add multiple tasks', () => {
    cy.visit('http://localhost:5173/');
    
    cy.contains('Add Task').click();
    cy.get('#title').type('Task 1');
    cy.get('#summary').type('Some description 1');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 1);

    cy.contains('Add Task').click();
    cy.get('#title').type('Task 2');
    cy.get('#summary').type('Some description 2');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 2);

    cy.get('.task').eq(0).contains('Task 1');
    cy.get('.task').eq(1).contains('Task 2');
  })
})