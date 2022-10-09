/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

type TodoType = { id: number; text: string; isComplete: boolean };

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      sendAndVisit(todos?: TodoType[]): Chainable<void>;
    }
  }
}

Cypress.Commands.add("sendAndVisit", (todos?: TodoType[]) => {
  cy.visit("/");

  // cy.fixture("todos").then((json) => {
  //   cy.intercept("GET", "http://localhost:3030/api/todos", {
  //     statusCode: 200,
  //     body: json,
  //   });
  // });

  cy.intercept(
    "GET",
    "http://localhost:3030/api/todos",
    Array.isArray(todos)
      ? {
          body: todos,
        }
      : {
          fixture: "todos",
        }
  );
});

export {};
