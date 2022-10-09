describe("Smoke tests", () => {
  beforeEach(() => {
    cy.request("GET", "http://localhost:3030/api/todos")
      .its("body")
      .each((todo: { id: number }) => {
        cy.request("DELETE", "http://localhost:3030/api/todos/" + todo.id);
      });
  });

  context("With no todos", () => {
    it("Saves new todos", () => {
      const items = [
        { text: "Buy milk", expectedLength: 1 },
        { text: "Buy eggs", expectedLength: 2 },
        { text: "Buy bread", expectedLength: 3 },
      ];

      cy.visit("/");

      cy.intercept("POST", "http://localhost:3030/api/todos").as("create");

      // cy.focused().type("Buy milk").type("{enter}");

      // cy.wait("@create");

      // cy.get(".todo-list li").should("have.length", 1);

      cy.wrap(items).each((item: typeof items[0]) => {
        cy.focused().type(item.text).type("{enter}");

        cy.wait("@create");

        cy.get(".todo-list li").should("have.length", item.expectedLength);
      });
    });
  });

  context("With active todos", () => {
    beforeEach(() => {
      cy.fixture("todos").each((todo) => {
        const newTodo = Cypress._.merge(todo, { isComplete: false });
        cy.request("POST", "http://localhost:3030/api/todos", newTodo);
      });

      cy.visit("/");
    });

    it("Loads existing data from the database", () => {
      cy.get(".todo-list li").should("have.length", 4);
    });

    it("Deletes todos", () => {
      cy.intercept("DELETE", "http://localhost:3030/api/todos/*").as("delete");

      cy.get(".todo-list li")
        .each(($el) => {
          cy.wrap($el).find(".destroy").invoke("show").click();

          cy.wait("@delete");
        })
        .should("not.exist");
    });

    it("Toggles todos", () => {
      const clickAndWait = ($el: JQuery<HTMLElement>) => {
        cy.wrap($el).as("item").find(".toggle").click();

        cy.wait("@update");
      };

      cy.intercept("PUT", "http://localhost:3030/api/todos/*").as("update");

      cy.get(".todo-list li")
        .each(($el) => {
          clickAndWait($el);

          cy.get("@item").should("have.class", "completed");
        })
        .each(($el) => {
          clickAndWait($el);

          cy.get("@item").should("not.have.class", "completed");
        });
    });
  });
});
