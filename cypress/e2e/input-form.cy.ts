describe("input form", () => {
  it("focuses input on load", () => {
    cy.visit("/");

    cy.focused().should("have.class", "new-todo");
  });

  it("accepts input", () => {
    cy.visit("/");

    const newTodo = "Learn cypress";
    cy.get(".new-todo").type(newTodo).should("have.value", newTodo);
  });

  context("Form submission", () => {
    it("Adds a new todo on submit", () => {
      // cy.request("http://localhost:3030/api/todos", {
      //   id: 1,
      //   text: "Learn Vue 3",
      //   isComplete: false,
      // });

      cy.intercept("GET", "http://localhost:3030/api/todos", {
        statusCode: 200,
        body: [],
      });

      cy.visit("/");

      const newTodo = "Learn cypress";
      cy.get(".new-todo")
        .type(newTodo)
        .type("{enter}")
        .should("have.value", "");

      cy.get(".todo-list li").should("have.length", 1).and("contain", newTodo);
    });

    it("Shows an error message on a failed submission", () => {
      // cy.request("POST", "http://localhost:3030/api/todos", {
      //   text: "Learn Vue 3",
      //   isComplete: false,
      // }).then((response) => {
      //   expect(response.body).to.have.property("text", "Learn Vue 3");
      //   expect(response.body).to.have.property("isComplete", false);
      // });

      cy.intercept("GET", "http://localhost:3030/api/todos", {
        statusCode: 200,
        body: [],
      });

      cy.intercept("POST", "http://localhost:3030/api/todos", {
        statusCode: 500,
        body: {},
      });

      cy.visit("/");

      cy.get(".new-todo").type("test{enter}");

      cy.get(".todo-list li").should("not.exist");

      cy.get(".error").should("be.visible");
    });
  });
});
