describe('Verify file upload functionality ', { tags: ['@FileUploadDesc'] }, ()=>{

    it('Sample test steps for file upload', { tags: ['@FileUpload'] }, ()=>{
        cy.visit('https://demoqa.com/upload-download');
        cy.on('uncaught:exception', (err, runnable) => {
            // Ignore specific errors or exceptions that might occur during the test
            // For example, you can log the error and continue the test
            console.error('Caught unhandled exception: ', err.message);
            return false; // Prevent Cypress from failing the test
          });
        cy.get('input[type=file]').selectFile('cypress/fixtures/istockphoto.jpg');
        cy.get('#uploadedFilePath').should('contain.text', 'C:\\fakepath\\istockphoto.jpg');
    });
});