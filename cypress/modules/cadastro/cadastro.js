const seletores = {
  tituloNovoUsuario: '.signup-form h2',
  nomeSignup: '[data-qa="signup-name"]',
  emailSignup: '[data-qa="signup-email"]',
  botaoSignup: '[data-qa="signup-button"]',
  generoMasculino: '#id_gender1',
  generoFeminino: '#id_gender2',
  senha: '[data-qa="password"]',
  diaNascimento: '[data-qa="days"]',
  mesNascimento: '[data-qa="months"]',
  anoNascimento: '[data-qa="years"]',
  checkboxNewsletter: '#newsletter',
  checkboxOfertas: '#optin',
  primeiroNome: '[data-qa="first_name"]',
  ultimoNome: '[data-qa="last_name"]',
  empresa: '[data-qa="company"]',
  endereco: '[data-qa="address"]',
  endereco2: '[data-qa="address2"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  cep: '[data-qa="zipcode"]',
  celular: '[data-qa="mobile_number"]',
  botaoCriarConta: '[data-qa="create-account"]',
  contaCriada: '[data-qa="account-created"]',
  botaoContinuar: '[data-qa="continue-button"]',
  mensagemErroEmailExistente: 'form[action*="signup"] p'
};

function validarFormularioNovoUsuarioVisivel() {
  cy.get(seletores.tituloNovoUsuario)
    .should('be.visible')
    .and(($el) => {
      expect($el.text().toUpperCase()).to.include('NEW USER SIGNUP');
    });
}

function iniciarCadastro(nome, email) {
  cy.get(seletores.nomeSignup).clear().type(nome);
  cy.get(seletores.emailSignup).clear().type(email);
  cy.get(seletores.botaoSignup).click();
}

function validarTelaInformacoesContaVisivel() {
  cy.contains('b', /enter account information/i).should('be.visible');
}

function preencherFormularioCadastro(usuario) {
  if (usuario.genero === 'female') {
    cy.get(seletores.generoFeminino).check();
  } else {
    cy.get(seletores.generoMasculino).check();
  }

  cy.get(seletores.senha).type(usuario.senha);

  if (usuario.diaNascimento) cy.get(seletores.diaNascimento).select(usuario.diaNascimento);
  if (usuario.mesNascimento) cy.get(seletores.mesNascimento).select(usuario.mesNascimento);
  if (usuario.anoNascimento) cy.get(seletores.anoNascimento).select(usuario.anoNascimento);

  cy.get(seletores.checkboxNewsletter).check();
  cy.get(seletores.checkboxOfertas).check();

  cy.get(seletores.primeiroNome).type(usuario.primeiroNome);
  cy.get(seletores.ultimoNome).type(usuario.ultimoNome);
  if (usuario.empresa) cy.get(seletores.empresa).type(usuario.empresa);
  cy.get(seletores.endereco).type(usuario.endereco);
  if (usuario.endereco2) cy.get(seletores.endereco2).type(usuario.endereco2);
  cy.get(seletores.pais).select(usuario.pais);
  cy.get(seletores.estado).type(usuario.estado);
  cy.get(seletores.cidade).type(usuario.cidade);
  cy.get(seletores.cep).type(usuario.cep);
  cy.get(seletores.celular).type(usuario.celular);
}

function confirmarCriacaoConta() {
  cy.get(seletores.botaoCriarConta).click();
}

function validarContaCriada() {
  cy.get(seletores.contaCriada)
    .should('be.visible')
    .and(($el) => {
      expect($el.text().toUpperCase()).to.include('ACCOUNT CREATED');
    });
  cy.get(seletores.botaoContinuar).click();
}

function validarMensagemEmailExistente() {
  cy.get(seletores.mensagemErroEmailExistente)
    .should('be.visible')
    .and(($el) => {
      expect($el.text().toUpperCase()).to.include('EMAIL ADDRESS ALREADY EXIST');
    });
}

function cadastrarNovoUsuario(usuario, email) {
  iniciarCadastro(usuario.nome, email);
  validarTelaInformacoesContaVisivel();
  preencherFormularioCadastro(usuario);
  confirmarCriacaoConta();
  validarContaCriada();
}

module.exports = {
  validarFormularioNovoUsuarioVisivel,
  iniciarCadastro,
  validarTelaInformacoesContaVisivel,
  preencherFormularioCadastro,
  confirmarCriacaoConta,
  validarContaCriada,
  validarMensagemEmailExistente,
  cadastrarNovoUsuario
};
