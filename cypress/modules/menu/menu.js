const seletores = {
  home: '.shop-menu a[href="/"]',
  produtos: '.shop-menu a[href="/products"]',
  carrinho: '.shop-menu a[href="/view_cart"]',
  login: '.shop-menu a[href="/login"]',
  excluirConta: '.shop-menu a[href="/delete_account"]',
  contaExcluida: '[data-qa="account-deleted"]',
  botaoContinuar: '[data-qa="continue-button"]',
  carrosselHome: '#slider'
};

function acessarPaginaInicial() {
  cy.visit('/');
}

function validarPaginaInicial() {
  cy.get(seletores.home).should('be.visible');
  cy.get(seletores.carrosselHome).should('be.visible');
}

function acessarLogin() {
  cy.get(seletores.login).click();
}

function acessarProdutos() {
  cy.get(seletores.produtos).click();
}

function acessarCarrinho() {
  cy.get(seletores.carrinho).click();
}

function excluirConta() {
  cy.get(seletores.excluirConta).click();
}

function validarContaExcluida() {
  cy.get(seletores.contaExcluida)
    .should('be.visible')
    .and(($el) => {
      expect($el.text().toUpperCase()).to.include('ACCOUNT DELETED');
    });
  cy.get(seletores.botaoContinuar).click();
}

function validarUsuarioLogado(nome) {
  cy.contains('.shop-menu a', /logged in as/i)
    .should('be.visible')
    .and('contain', nome);
}

module.exports = {
  acessarPaginaInicial,
  validarPaginaInicial,
  acessarLogin,
  acessarProdutos,
  acessarCarrinho,
  excluirConta,
  validarContaExcluida,
  validarUsuarioLogado
};
