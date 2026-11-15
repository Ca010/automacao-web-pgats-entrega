const seletores = {
  nomeNoCartao: '[data-qa="name-on-card"]',
  numeroCartao: '[data-qa="card-number"]',
  cvc: '[data-qa="cvc"]',
  mesExpiracao: '[data-qa="expiry-month"]',
  anoExpiracao: '[data-qa="expiry-year"]',
  botaoConfirmarPagamento: '[data-qa="pay-button"]',
  mensagemSucesso: '[data-qa="order-placed"]'
};

function preencherDadosPagamento(dados) {
  cy.get(seletores.nomeNoCartao).type(dados.nomeNoCartao);
  cy.get(seletores.numeroCartao).type(dados.numeroCartao);
  cy.get(seletores.cvc).type(dados.cvc);
  cy.get(seletores.mesExpiracao).type(dados.mesExpiracao);
  cy.get(seletores.anoExpiracao).type(dados.anoExpiracao);
}

function confirmarPagamento() {
  cy.get(seletores.botaoConfirmarPagamento).click();
}

function validarPedidoRealizadoComSucesso() {
  cy.get(seletores.mensagemSucesso).should('be.visible');
  cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible');
}

module.exports = {
  preencherDadosPagamento,
  confirmarPagamento,
  validarPedidoRealizadoComSucesso
};
