const seletores = {
  tabelaCarrinho: '#cart_info_table',
  botaoCheckout: 'a.check_out'
};

function validarPaginaCarrinho() {
  cy.url().should('include', '/view_cart');
  cy.get(seletores.tabelaCarrinho).should('be.visible');
}

function prosseguirParaCheckout() {
  cy.get(seletores.botaoCheckout).click();
}

module.exports = {
  validarPaginaCarrinho,
  prosseguirParaCheckout
};
