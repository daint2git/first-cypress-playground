describe("Footer", () => {
  context("with a single todo", () => {
    it("Displays a singular todo in count", () => {
      cy.sendAndVisit([
        {
          id: 1,
          text: "Buy milk",
          isComplete: false,
        },
      ]);

      cy.get(".todo-count").should("contain", "1 todo left");
    });
  });

  context("with multiple todos", () => {
    beforeEach(() => {
      cy.sendAndVisit();
    });

    it("Displays plural todos in count", () => {
      cy.get(".todo-count").should("contain", "3 todos left");
    });

    // it("Filters to active todos", () => {
    //   cy.contains("Active").click();

    //   cy.get(".todo-list li").should("have.length", 3);
    // });

    // it.only("Filters to completed todos", () => {
    //   cy.contains("Completed").click();

    //   cy.get(".todo-list li").should("have.length", 1);
    // });

    it("Handles filter links", () => {
      const filters = [
        { link: "Active", expectedTodoLength: 3 },
        { link: "Completed", expectedTodoLength: 1 },
        { link: "All", expectedTodoLength: 4 },
      ];

      cy.wrap(filters).each((filter: typeof filters[0]) => {
        cy.contains(filter.link).click();

        cy.get(".todo-list li").should(
          "have.length",
          filter.expectedTodoLength
        );
      });
    });
  });
});
