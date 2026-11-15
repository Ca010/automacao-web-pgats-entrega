/// <reference types="cypress" />

const menu = require('../modules/menu/menu');
const cadastro = require('../modules/cadastro/cadastro');
const login = require('../modules/login/login');
const logout = require('../modules/logout/logout');
const produtos = require('../modules/produtos/produtos');
const carrinho = require('../modules/carrinho/carrinho');
const checkout = require('../modules/checkout/checkout');
const pagamento = require('../modules/pagamento/pagamento');
const inscricao = require('../modules/inscricao/inscricao');

describe('Automação de Testes Web - Automation Exercise (PGATS)', () => {
  let dadosUsuarios;
  let dadosPagamento;
  let dadosProdutos;

  before(() => {
    cy.fixture('usuarios').then((usuarios) => {
      dadosUsuarios = usuarios;
    });
    cy.fixture('pagamento').then((pag) => {
      dadosPagamento = pag;
    });
    cy.fixture('produtos').then((prod) => {
      dadosProdutos = prod;
    });
  });

  beforeEach(() => {
    menu.acessarPaginaInicial();
    menu.validarPaginaInicial();
  });

  it('Test Case 1: Register User', () => {
    const emailDinamico = `qa_test_case_1_${Date.now()}@mail.com`;

    menu.acessarLogin();
    cadastro.validarFormularioNovoUsuarioVisivel();
    cadastro.iniciarCadastro(dadosUsuarios.usuarioPadrao.nome, emailDinamico);
    cadastro.validarTelaInformacoesContaVisivel();
    cadastro.preencherFormularioCadastro(dadosUsuarios.usuarioPadrao);
    cadastro.confirmarCriacaoConta();
    cadastro.validarContaCriada();
    menu.validarUsuarioLogado(dadosUsuarios.usuarioPadrao.nome);
    menu.excluirConta();
    menu.validarContaExcluida();
  });

  it('Test Case 2: Login User with correct email and password', () => {
    const emailDinamico = `qa_test_case_2_${Date.now()}@mail.com`;

    menu.acessarLogin();
    cadastro.cadastrarNovoUsuario(dadosUsuarios.usuarioPadrao, emailDinamico);
    logout.efetuarLogout();

    menu.acessarLogin();
    login.validarFormularioLoginVisivel();
    login.efetuarLogin(emailDinamico, dadosUsuarios.usuarioPadrao.senha);
    menu.validarUsuarioLogado(dadosUsuarios.usuarioPadrao.nome);
    menu.excluirConta();
    menu.validarContaExcluida();
  });

  it('Test Case 3: Login User with incorrect email and password', () => {
    menu.acessarLogin();
    login.validarFormularioLoginVisivel();
    login.efetuarLogin(dadosUsuarios.usuarioInvalido.email, dadosUsuarios.usuarioInvalido.senha);
    login.validarMensagemErroLogin();
  });

  it('Test Case 4: Logout User', () => {
    const emailDinamico = `qa_test_case_4_${Date.now()}@mail.com`;

    menu.acessarLogin();
    cadastro.cadastrarNovoUsuario(dadosUsuarios.usuarioPadrao, emailDinamico);
    logout.efetuarLogout();

    menu.acessarLogin();
    login.validarFormularioLoginVisivel();
    login.efetuarLogin(emailDinamico, dadosUsuarios.usuarioPadrao.senha);
    menu.validarUsuarioLogado(dadosUsuarios.usuarioPadrao.nome);
    logout.efetuarLogout();
    logout.validarUsuarioDeslogado();
  });

  it('Test Case 5: Register User with existing email', () => {
    const emailDinamico = `qa_test_case_5_${Date.now()}@mail.com`;

    menu.acessarLogin();
    cadastro.cadastrarNovoUsuario(dadosUsuarios.usuarioPadrao, emailDinamico);
    logout.efetuarLogout();

    menu.acessarLogin();
    cadastro.validarFormularioNovoUsuarioVisivel();
    cadastro.iniciarCadastro(dadosUsuarios.usuarioPadrao.nome, emailDinamico);
    cadastro.validarMensagemEmailExistente();
  });

  it('Test Case 8: Verify All Products and product detail page', () => {
    menu.acessarProdutos();
    produtos.validarPaginaTodosProdutos();
    produtos.acessarDetalhesPrimeiroProduto();
    produtos.validarDetalhesDoProduto();
  });

  it('Test Case 9: Search Product', () => {
    menu.acessarProdutos();
    produtos.validarPaginaTodosProdutos();
    produtos.pesquisarProduto(dadosProdutos.termoBusca);
    produtos.validarProdutosPesquisados();
  });

  it('Test Case 10: Verify Subscription in home page', () => {
    inscricao.rolarAteRodape();
    inscricao.validarTextoInscricao();
    inscricao.preencherInscricao(`qa_sub_${Date.now()}@mail.com`);
    inscricao.validarInscricaoComSucesso();
  });

  it('Test Case 15: Place Order: Register before Checkout', () => {
    const emailDinamico = `qa_test_case_15_${Date.now()}@mail.com`;

    menu.acessarLogin();
    cadastro.cadastrarNovoUsuario(dadosUsuarios.usuarioPadrao, emailDinamico);
    menu.validarUsuarioLogado(dadosUsuarios.usuarioPadrao.nome);

    menu.acessarProdutos();
    produtos.adicionarPrimeiroProdutoAoCarrinho();

    menu.acessarCarrinho();
    carrinho.validarPaginaCarrinho();
    carrinho.prosseguirParaCheckout();

    checkout.validarDetalhesEntregaEFatura();
    checkout.preencherComentarioPedido(dadosPagamento.cartaoValido.comentario);
    checkout.clicarFazerPedido();

    pagamento.preencherDadosPagamento(dadosPagamento.cartaoValido);
    pagamento.confirmarPagamento();
    pagamento.validarPedidoRealizadoComSucesso();

    menu.excluirConta();
    menu.validarContaExcluida();
  });

  it('Test Case 16: Place Order: Login before Checkout', () => {
    const emailDinamico = `qa_test_case_16_${Date.now()}@mail.com`;

    menu.acessarLogin();
    cadastro.cadastrarNovoUsuario(dadosUsuarios.usuarioPadrao, emailDinamico);
    logout.efetuarLogout();

    menu.acessarLogin();
    login.validarFormularioLoginVisivel();
    login.efetuarLogin(emailDinamico, dadosUsuarios.usuarioPadrao.senha);
    menu.validarUsuarioLogado(dadosUsuarios.usuarioPadrao.nome);

    menu.acessarProdutos();
    produtos.adicionarPrimeiroProdutoAoCarrinho();

    menu.acessarCarrinho();
    carrinho.validarPaginaCarrinho();
    carrinho.prosseguirParaCheckout();

    checkout.validarDetalhesEntregaEFatura();
    checkout.preencherComentarioPedido(dadosPagamento.cartaoValido.comentario);
    checkout.clicarFazerPedido();

    pagamento.preencherDadosPagamento(dadosPagamento.cartaoValido);
    pagamento.confirmarPagamento();
    pagamento.validarPedidoRealizadoComSucesso();

    menu.excluirConta();
    menu.validarContaExcluida();
  });
});
