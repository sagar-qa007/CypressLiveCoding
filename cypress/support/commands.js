// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************


const loginPage = require("../locators/LoginPage.json");
import {addMatchImageSnapshotCommand} from '@simonsmith/cypress-image-snapshot/command'
import '@testing-library/cypress/add-commands'

addMatchImageSnapshotCommand({
  failureThreshold: 0.20,
  failureThresholdType: "percent",
});

Cypress.Commands.add("LoginUser", (uname, pword) => {
    cy.visit("/user/login", { timeout: 60000 });
    cy.wait(3000);
    cy.get(loginPage.username).type(uname);
    cy.get(loginPage.password).type(pword, { log: false });
    cy.get(loginPage.submitBtn).click();
    cy.wait(3000);
    cy.waitForNetworkIdle("*.js", 1000, { timeout: 5 * 1000 });
  });
  
  
  Cypress.Commands.add("LoginFromAPI", (uname, pword) => {
    let baseURL = Cypress.config().baseUrl;
    baseURL = baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL;
    cy.clearCookie("SESSION");
  
    cy.visit({
      method: "POST",
      url: "api/v1/login",
      headers: {
        origin: baseURL,
      },
      followRedirect: true,
      body: {
        username: uname,
        password: pword,
      },
      timeout: 60000,
    });
  });
  
  Cypress.Commands.add("LogOutFromAPI", () => {
    let httpMethod = "GET";
    cy.request({
      method: httpMethod,
      url: "/api/v1/logout",
      headers: {
        "X-Requested-By": "Appsmith",
      },
    }).then((response) => {
      cy.reload();
      expect(response.status).equal(200); 
    });
  });


  Cypress.Commands.add('uploadFileFromView', { prevSubject: true }, (subject, fileName, fileType = '') => {
    cy.fixture(fileName,'binary').then(content => {
      return Cypress.Blob.binaryStringToBlob(content, fileType).then(blob => {
        const el = subject[0];
        const testFile = new File([blob], fileName, {type: fileType});
        const dataTransfer = new DataTransfer();
  
        dataTransfer.items.add(testFile);
        el.files = dataTransfer.files;
        cy.wrap(subject).trigger('change', { force: true });
      });
    });
  });