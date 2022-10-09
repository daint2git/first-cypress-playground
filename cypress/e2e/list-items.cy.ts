describe("List items", () => {
  beforeEach(() => {
    cy.sendAndVisit();
  });

  it("properly displays completed items", () => {
    cy.get(".todo-list li")
      .filter(".completed")
      .should("have.length", 1)
      .and("contain", "Eggs")
      .find(".toggle")
      .should("be.checked");
  });

  it("shows remaining todos in the footer", () => {
    cy.get(".todo-count").should("contain", 3);
  });

  it("Removes a todo", () => {
    cy.intercept("DELETE", "http://localhost:3030/api/todos/1", {
      statusCode: 200,
      body: [],
    });

    // cy.get(".todo-list li")
    //   .first()
    //   .find(".destroy")
    //   .invoke("show")
    //   .click({ force: true });

    cy.get(".todo-list li").as("todo-list");

    cy.get("@todo-list")
      .first()
      .find(".destroy")
      .invoke("show")
      .click({ force: true });

    cy.get("@todo-list").should("have.length", 3).and("not.contain", "Milk");
  });

  it("Marks an incomplete item complete", () => {
    cy.fixture("todos").then((json) => {
      const target = Cypress._.head(json) as {
        id: number;
        text: string;
        isComplete: boolean;
      };

      cy.intercept("PUT", "http://localhost:3030/api/todos/" + target.id, {
        statusCode: 200,
        body: Cypress._.merge(target, { isComplete: true }),
      });
    });

    cy.get(".todo-list li").first().as("first-todo");

    cy.get("@first-todo").find(".toggle").click().should("be.checked");

    cy.get("@first-todo").should("have.class", "completed");

    cy.get(".todo-count").should("contain", 2);
  });
});
