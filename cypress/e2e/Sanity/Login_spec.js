
const dashboardPage = require("../../locators/DashboardPage.json");

describe('Login Functionality Test case', () => {
  beforeEach(() => {
    cy.visit('/user/login');
  });

  afterEach(() => {
    cy.LogOutFromAPI();
  });

  it("1. Verify user should be able to login in APP", { tags: ['@Sanity', '@Regression', '@Login']}, () => {
    cy.LoginUser(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
    cy.xpath(dashboardPage.profileIcon).should("be.visible").then(()=> {
      console.log("simple log");
    });
    cy.findAllByText('Non-existing Button Text').should('not.exist');
  });
 
});
