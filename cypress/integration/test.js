describe('Basic testing', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:5000');
    cy.contains('Anecdotes');
    cy.contains('create new');
  });

  it('can create a new anecdote', function () {
    cy.visit('http://localhost:5000');
    cy.get('#anecdote__input').type('Hello world');
    cy.get('#anecdote__button').click();

    cy.get('.anecdotelist__content').contains('Hello world');
  });
});