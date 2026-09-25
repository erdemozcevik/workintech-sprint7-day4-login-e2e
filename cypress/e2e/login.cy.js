describe('Login form', () => {
  beforeEach(() => cy.visit('/'));

  it('submits valid details and displays the success page', () => {
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('#email').type('erdem@example.com');
    cy.get('#password').type('Strong1!');
    cy.get('#terms').check();
    cy.get('button[type="submit"]').should('be.enabled').click();
    cy.contains('h1', 'Success').should('be.visible');
  });

  it('shows the expected errors and prevents invalid submissions', () => {
    cy.get('#email').type('invalid-email');
    cy.get('[role="alert"]').should('have.length', 1)
      .and('contain', 'Please enter a valid email address');
    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('#password').type('weak');
    cy.get('[role="alert"]').should('have.length', 2);
    cy.get('#password-error').should('contain', 'Password must be at least 8 characters');
    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('#email').clear().type('erdem@example.com');
    cy.get('#password').clear().type('Strong1!');
    cy.get('[role="alert"]').should('not.exist');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('#terms').check();
    cy.get('button[type="submit"]').should('be.enabled');
  });
});
