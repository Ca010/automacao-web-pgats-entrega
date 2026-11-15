const seletores = {
  rodape: '#footer',
  tituloInscricao: '.single-widget h2',
  campoEmail: '#susbscribe_email',
  botaoInscrever: '#subscribe',
  alertaSucesso: '#success-subscribe .alert-success'
};

function rolarAteRodape() {
  cy.get(seletores.rodape).scrollIntoView();
}

function validarTextoInscricao() {
  cy.get(seletores.tituloInscricao)
    .should('be.visible')
    .and('contain.text', 'Subscription');
}

function preencherInscricao(email) {
  cy.get(seletores.campoEmail).clear().type(email);
  cy.get(seletores.botaoInscrever).click();
}

function validarInscricaoComSucesso() {
  cy.get(seletores.alertaSucesso)
    .should('be.visible')
    .and('contain.text', 'You have been successfully subscribed!');
}

module.exports = {
  rolarAteRodape,
  validarTextoInscricao,
  preencherInscricao,
  validarInscricaoComSucesso
};
