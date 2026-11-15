import 'cypress-mochawesome-reporter/register';

// Impede que exceções não tratadas de scripts de terceiros/anúncios quebrem os testes
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
