// const todos = [
//   {
//     id: 1,
//     text: "Buy Milk",
//     isComplete: false,
//   },
//   {
//     id: 2,
//     text: "Buy Eggs",
//     isComplete: false,
//   },
//   {
//     id: 3,
//     text: "Buy Bread",
//     isComplete: false,
//   },
//   {
//     id: 4,
//     text: "Make French Toast",
//     isComplete: false,
//   },
// ];

// describe("App initialization", () => {
//   it.only("Loads todos on page load", () => {
//     cy.visit("/");
//     cy.intercept("GET", "http://localhost:3030/api/todos", {
//       statusCode: 200,
//       body: todos,
//     });

//     cy.get(".todo-list li").should("have.length", 4);
//   });
// });

describe("App initialization", () => {
  it("Loads todos on page load", () => {
    // cy.visit("/");

    // cy.fixture("todos").then((json) => {
    //   cy.intercept("GET", "http://localhost:3030/api/todos", {
    //     statusCode: 200,
    //     body: json,
    //   });
    // });

    cy.sendAndVisit();

    cy.get(".todo-list li").should("have.length", 4);
  });

  it("Displays an error on failure", () => {
    cy.intercept("GET", "http://localhost:3030/api/todos", {
      statusCode: 500,
      body: {},
    });

    cy.visit("/");

    cy.get(".todo-list li").should("not.exist");

    cy.get(".error").should("be.visible");
  });
});
