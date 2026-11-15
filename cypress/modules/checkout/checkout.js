const seletores = {
  detalhesEntrega: '#address_delivery',
  detalhesFatura: '#address_invoice',
  revisaoPedido: '#cart_info',
  campoComentario: 'textarea[name="message"]',
  botaoFazerPedido: 'a[href*="/payment"]'
};

function validarDetalhesEntregaEFatura() {
  cy.get(seletores.detalhesEntrega).should('be.visible');
  cy.get(seletores.detalhesFatura).should('be.visible');
  cy.get(seletores.revisaoPedido).should('be.visible');
}

function preencherComentarioPedido(comentario) {
  if (comentario) {
    cy.get(seletores.campoComentario).type(comentario);
  }
}

function clicarFazerPedido() {
  cy.get(seletores.botaoFazerPedido).click();
}

module.exports = {
  validarDetalhesEntregaEFatura,
  preencherComentarioPedido,
  clicarFazerPedido
};
