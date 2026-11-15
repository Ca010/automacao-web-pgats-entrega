const seletores = {
  tituloTodosProdutos: '.features_items .title',
  listaProdutos: '.features_items .col-sm-4',
  primeiroBotaoVerProduto: '.choose a[href*="/product_details/"]',
  nomeProdutoDetalhe: '.product-information h2',
  blocoInformacoesProduto: '.product-information',
  campoBusca: '#search_product',
  botaoBuscar: '#submit_search',
  tituloProdutosPesquisados: '.features_items .title',
  itensPesquisados: '.features_items .product-image-wrapper',
  botaoAdicionarPrimeiroProduto: '.features_items .productinfo a.add-to-cart',
  modalCarrinho: '#cartModal',
  botaoContinuarComprando: '#cartModal .close-modal'
};

function validarPaginaTodosProdutos() {
  cy.url().should('include', '/products');
  cy.get(seletores.tituloTodosProdutos)
    .should('be.visible')
    .and(($el) => {
      expect($el.text().toUpperCase()).to.include('ALL PRODUCTS');
    });
  cy.get(seletores.listaProdutos).should('have.length.greaterThan', 0);
}

function acessarDetalhesPrimeiroProduto() {
  cy.get(seletores.primeiroBotaoVerProduto).first().click();
}

function validarDetalhesDoProduto() {
  cy.url().should('include', '/product_details/');
  cy.get(seletores.nomeProdutoDetalhe).should('be.visible');
  cy.get(seletores.blocoInformacoesProduto).within(() => {
    cy.contains('p', 'Category:').should('be.visible');
    cy.contains('span', 'Rs.').should('be.visible');
    cy.contains('p', 'Availability:').should('be.visible');
    cy.contains('p', 'Condition:').should('be.visible');
    cy.contains('p', 'Brand:').should('be.visible');
  });
}

function pesquisarProduto(termo) {
  cy.get(seletores.campoBusca).clear().type(termo);
  cy.get(seletores.botaoBuscar).click();
}

function validarProdutosPesquisados() {
  cy.get(seletores.tituloProdutosPesquisados)
    .should('be.visible')
    .and(($el) => {
      expect($el.text().toUpperCase()).to.include('SEARCHED PRODUCTS');
    });
  cy.get(seletores.itensPesquisados).should('have.length.greaterThan', 0);
}

function adicionarPrimeiroProdutoAoCarrinho() {
  cy.get(seletores.botaoAdicionarPrimeiroProduto).first().click({ force: true });
  cy.get(seletores.modalCarrinho).should('be.visible');
  cy.get(seletores.botaoContinuarComprando).click();
}

module.exports = {
  validarPaginaTodosProdutos,
  acessarDetalhesPrimeiroProduto,
  validarDetalhesDoProduto,
  pesquisarProduto,
  validarProdutosPesquisados,
  adicionarPrimeiroProdutoAoCarrinho
};
