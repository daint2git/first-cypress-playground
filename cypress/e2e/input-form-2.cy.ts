describe("input form", () => {
  beforeEach(() => {
    cy.sendAndVisit([]);
  });

  it("focuses input on load", () => {
    cy.focused().should("have.class", "new-todo");
  });

  it("accepts input", () => {
    const newTodo = "Learn cypress";
    cy.get(".new-todo").type(newTodo).should("have.value", newTodo);
  });

  context("Form submission", () => {
    it("Adds a new todo on submit", () => {
      const newTodo = "Learn cypress";
      cy.get(".new-todo")
        .type(newTodo)
        .type("{enter}")
        .should("have.value", "");

      cy.get(".todo-list li").should("have.length", 1).and("contain", newTodo);
    });

    it("Shows an error message on a failed submission", () => {
      cy.intercept("POST", "http://localhost:3030/api/todos", {
        statusCode: 500,
        body: {},
      });

      cy.get(".new-todo").type("test{enter}");

      cy.get(".todo-list li").should("not.exist");

      cy.get(".error").should("be.visible");
    });
  });
});
