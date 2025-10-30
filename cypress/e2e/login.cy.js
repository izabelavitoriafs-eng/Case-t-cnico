describe('Funcionalidade: Login no site Automation Practice', () => {

  // Cenário 1: Login com sucesso
  describe('Cenário: Verificar login bem-sucedido no site "Automation Practice"', () => {

    it('Dado que o usuário esteja na página "Automation Practice"', () => {
      cy.visit('http://automationpractice.pl/index.php?controller=authentication&back=my-account');
    });

    it('Quando o usuário inserir credenciais válidas e clicar em "Sign in"', () => {
      cy.get('#email').type('testecasetecnico@gmail.com');
      cy.get('#passwd').type('12345');
      cy.get('#SubmitLogin').click();
    });

    it('Então o sistema deve redirecionar o usuário para a página "My account"', () => {
      cy.url().should('include', 'controller=my-account');
      cy.get('h1').should('contain.text', 'My account');
    });
  });

  // Cenário 2: Senha inválida
  describe('Cenário: Tentativa de login com senha incorreta', () => {

    it('Dado que o usuário esteja na página "Automation Practice"', () => {
      cy.visit('http://automationpractice.pl/index.php?controller=authentication&back=my-account');
    });

    it('Quando o usuário preencher o email válido e senha incorreta e clicar em "Sign in"', () => {
      cy.get('#email').type('testecasetecnico@gmail.com');
      cy.get('#passwd').type('senhaerrada');
      cy.get('#SubmitLogin').click();
    });

    it('Então a página deve retornar uma mensagem de erro ao usuário', () => { // senha incorreta
      cy.get('.alert-danger').should('contain.text', 'Authentication failed');
    });
  });

  // Cenário 3: Campos vazios
  describe('Cenário: Tentativa de login com campos vazios', () => {

    it('Dado que o usuário esteja na página "Automation Practice"', () => {
      cy.visit('http://automationpractice.pl/index.php?controller=authentication&back=my-account');
    });

    it('Quando o usuário não preencher os campos e clicar em "Sign in"', () => {
      cy.get('#email').clear();
      cy.get('#passwd').clear();
      cy.get('#SubmitLogin').click();
    });

    it('Então a página deve retornar uma mensagem de erro ao usuário', () => {
      cy.get('.alert-danger').should('contain.text', 'Required fields are empty.'); //Os campos obrigatórios estão vazios.
    });
  });

});