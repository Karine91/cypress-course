/// <reference types="Cypress" />

describe("contact form", () => {
  before(() => {
    // Runs only once, before all tests
  });
  beforeEach(() => {
    // Runs before every test
    cy.visit("/about");
  });

  afterEach(() => {
    // after each test
  });

  after(() => {
    // runs after all tests
  });

  it("should submit the form", () => {
    cy.getById("contact-input-message").type("Hello world");
    cy.getById("contact-input-name").type("Karine");

    cy.get('[data-cy="contact-btn-submit"').as("submitBtn");
    cy.get("@submitBtn").then((el) => {
      expect(el.attr("disabled")).to.be.undefined;
      expect(el.text()).to.eq("Send Message");
    });
    cy.screenshot();
    cy.get('[data-cy="contact-input-email"').type("test@example.com");
    cy.submitForm();
    cy.screenshot();
    cy.get("@submitBtn").contains("Sending...").should("have.attr", "disabled");
  });

  it("should validate the form input", () => {
    cy.task("seedDatabase", "filename.txt").then((returnValue) => {
      // ... use returnValue
    });
    cy.submitForm();
    cy.get('[data-cy="contact-btn-submit"').then((el) => {
      expect(el).to.not.have.attr("disabled");
      expect(el.text()).to.not.eq("Sending...");
    });

    cy.get('[data-cy="contact-btn-submit"').contains("Send Message");
    cy.get('[data-cy="contact-input-message"').focus().blur();
    cy.get('[data-cy="contact-input-message"')
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);
    cy.get('[data-cy="contact-input-name"').focus().blur();
    cy.get('[data-cy="contact-input-name"')
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);
    cy.get('[data-cy="contact-input-email"').focus().blur();
    cy.get('[data-cy="contact-input-email"')
      .parent()
      .should((el) => {
        expect(el.attr("class")).not.to.be.undefined;
        expect(el.attr("class")).contains("invalid");
      });
  });
});
