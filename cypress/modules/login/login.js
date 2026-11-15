const seletores = {
  tituloLogin: '.login-form h2',
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoLogin: '[data-qa="login-button"]',
  mensagemErro: 'form[action*="login"] > p'
};

function validarFormularioLoginVisivel() {
  cy.get(seletores.tituloLogin)
    .should('be.visible')
    .and('contain.text', 'Login to your account');
}

function preencherLogin(email, senha) {
  cy.get(seletores.email).clear().type(email);
  cy.get(seletores.senha).clear().type(senha);
}

function efetuarLogin(email, senha) {
  preencherLogin(email, senha);
  cy.get(seletores.botaoLogin).click();
}

function validarMensagemErroLogin() {
  cy.get(seletores.mensagemErro)
    .should('be.visible')
    .and('contain.text', 'Your email or password is incorrect!');
}

module.exports = {
  validarFormularioLoginVisivel,
  preencherLogin,
  efetuarLogin,
  validarMensagemErroLogin
};
