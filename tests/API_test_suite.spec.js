// @ts-check
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Autenticação e Perfis', () => {
  test('Registo de Novo Usuário Aluno (Sucesso)', async ({ page }) => {
    const ValidUser = {
      "nome": faker.person.fullName(),
      "email": faker.internet.email(),
      "senha": faker.internet.password()
    }

    let responsePOSTmail_Maria_Silva = await page.request.post('http://localhost:3000/registro',
      {
        data: {
          "nome": "Maria Silva",
          "email": "maria.silva@teste.com",
          "senha": "senha123"
        }
      });

    if (responsePOSTmail_Maria_Silva.status() === 400) {
      let responsePOSTmail_new_valid_user1 = await page.request.post('http://localhost:3000/registro',
        {
          data: ValidUser
        }
      );
      expect(responsePOSTmail_new_valid_user1.status()).toBe(201);

      let bodyPOSTmail_new_valid_user1 = await responsePOSTmail_new_valid_user1.json();

      expect(bodyPOSTmail_new_valid_user1.usuario).toHaveProperty('id');
      expect(bodyPOSTmail_new_valid_user1.usuario).toHaveProperty('nome');
      expect(bodyPOSTmail_new_valid_user1.usuario).toHaveProperty('email');
      expect(bodyPOSTmail_new_valid_user1.usuario).toHaveProperty('tipo');
      expect(bodyPOSTmail_new_valid_user1.usuario).not.toHaveProperty('senha');

      expect(Number.isInteger(bodyPOSTmail_new_valid_user1.usuario.id)).toBe(true);
      expect(bodyPOSTmail_new_valid_user1.usuario.id).toBeGreaterThanOrEqual(0);
      expect(typeof bodyPOSTmail_new_valid_user1.usuario.nome).toBe("string");
      expect(typeof bodyPOSTmail_new_valid_user1.usuario.email).toBe("string");
      expect(bodyPOSTmail_new_valid_user1.usuario.nome).toBe(ValidUser.nome);
      expect(bodyPOSTmail_new_valid_user1.usuario.email).toBe(ValidUser.email);
      expect(bodyPOSTmail_new_valid_user1.mensagem).toBe("Usuário criado com sucesso");
      expect(bodyPOSTmail_new_valid_user1.usuario.tipo).toBe(1);
      console.log("Usuário aleatório criado com sucesso porque Maria Silva já existia");

    } else {
      expect(responsePOSTmail_Maria_Silva.status() === 201);

      let bodyPOSTmail_Maria_Silva = await responsePOSTmail_Maria_Silva.json();

      expect(bodyPOSTmail_Maria_Silva.usuario).toHaveProperty('id');
      expect(bodyPOSTmail_Maria_Silva.usuario).toHaveProperty('nome');
      expect(bodyPOSTmail_Maria_Silva.usuario).toHaveProperty('email');
      expect(bodyPOSTmail_Maria_Silva.usuario).toHaveProperty('tipo');
      expect(bodyPOSTmail_Maria_Silva.usuario).not.toHaveProperty('senha');

      expect(Number.isInteger(bodyPOSTmail_Maria_Silva.usuario.id)).toBe(true);
      expect(bodyPOSTmail_Maria_Silva.usuario.id).toBeGreaterThanOrEqual(0);
      expect(typeof bodyPOSTmail_Maria_Silva.usuario.nome).toBe("string");
      expect(typeof bodyPOSTmail_Maria_Silva.usuario.email).toBe("string");
      expect(bodyPOSTmail_Maria_Silva.usuario.nome).toBe("Maria Silva");
      expect(bodyPOSTmail_Maria_Silva.usuario.email).toBe("maria.silva@teste.com");
      expect(bodyPOSTmail_Maria_Silva.mensagem).toBe("Usuário criado com sucesso");
      expect(bodyPOSTmail_Maria_Silva.usuario.tipo).toBe(1);
      console.log("Usuário Maria Silva criado com sucesso");
    };
  });


  test('Registo com Email Duplicado (Falha)', async ({ page }) => {
    let responsePOSTmail_Admin = await page.request.post('http://localhost:3000/registro',
      {
        data: {
          "nome": "João Santos",
          "email": "admin@biblioteca.com",
          "senha": "senha456"
        }
      });

    expect(responsePOSTmail_Admin.status()).toBe(400);

    let bodyPOSTmail_Admin = await responsePOSTmail_Admin.json();

    expect(bodyPOSTmail_Admin.mensagem).toBe('Email já cadastrado');
  });


  test.describe('Registo com Dados Inválidos (Falha)', () => {
    test('rejeita uma senha vazia', async ({ page }) => {
      // Verifica se o sistema rejeita uma senha vazia.
      const responsePOSTmail_Invalid1 = await page.request.post('http://localhost:3000/registro', {
        data: {
          nome: faker.person.fullName(),
          email: faker.internet.email(),
          senha: ''
        }
      });

      expect(responsePOSTmail_Invalid1.status()).toBe(400);
      const bodyPOSTmail_Invalid1 = await responsePOSTmail_Invalid1.json();
      expect(bodyPOSTmail_Invalid1.senha).not.toBe(undefined);
    });

    test('rejeita um email com formato inválido', async ({ page }) => {
      // Verifica se o sistema rejeita um email com formato inválido.
      const responsePOSTmail_Invalid2 = await page.request.post('http://localhost:3000/registro', {
        data: {
          nome: faker.person.fullName(),
          email: faker.person.fullName(), // Email sem @
          senha: faker.internet.password()
        }
      });

      expect(responsePOSTmail_Invalid2.status()).toBe(400);
      const bodyPOSTmail_Invalid2 = await responsePOSTmail_Invalid2.json();
      expect(bodyPOSTmail_Invalid2.email).toContain("@");
    });

    test('rejeita um nome vazio', async ({ page }) => {
      // Verifica se o sistema rejeita um nome vazio.
      const responsePOSTmail_Invalid3 = await page.request.post('http://localhost:3000/registro', {
        data: {
          nome: '',
          email: faker.internet.email(),
          senha: 'senha789'
        }
      });

      expect(responsePOSTmail_Invalid3.status()).toBe(400);
      const bodyPOSTmail_Invalid3 = await responsePOSTmail_Invalid3.json();
      expect(bodyPOSTmail_Invalid3.nome).not.toBe(undefined);
    });

    test('rejeita um email vazio', async ({ page }) => {
      // Verifica se o sistema rejeita um email vazio.
      const responsePOSTmail_Invalid4 = await page.request.post('http://localhost:3000/registro', {
        data: {
          nome: faker.person.fullName(),
          email: '',
          senha: faker.internet.password()
        }
      });

      expect(responsePOSTmail_Invalid4.status()).toBe(400);
      const bodyPOSTmail_Invalid4 = await responsePOSTmail_Invalid4.json();
      expect(bodyPOSTmail_Invalid4.email).not.toBe(undefined);
    });

    test('rejeita um nome numérico', async ({ page }) => {
      // Verifica se o sistema rejeita um nome numérico.
      const responsePOSTmail_Invalid5 = await page.request.post('http://localhost:3000/registro', {
        data: {
          nome: faker.number.int({ min: 1, max: 1000 }),
          email: faker.internet.email(),
          senha: faker.internet.password()
        }
      });

      expect(responsePOSTmail_Invalid5.status()).toBe(400);
      const bodyPOSTmail_Invalid5 = await responsePOSTmail_Invalid5.json();
      expect(typeof bodyPOSTmail_Invalid5.nome).toBe('string');
    });

    test('rejeita um email numérico', async ({ page }) => {
      // Verifica se o sistema rejeita um email numérico.
      const responsePOSTmail_Invalid6 = await page.request.post('http://localhost:3000/registro', {
        data: {
          nome: faker.person.fullName(),
          email: faker.number.int({ min: 1, max: 1000 }),
          senha: faker.internet.password()
        }
      });

      expect(responsePOSTmail_Invalid6.status()).toBe(400);
      const bodyPOSTmail_Invalid6 = await responsePOSTmail_Invalid6.json();
      expect(typeof bodyPOSTmail_Invalid6.email).toBe('string');
    });

    test('rejeita uma senha numérica', async ({ page }) => {
      // Verifica se o sistema rejeita uma senha numérica.
      const responsePOSTmail_Invalid7 = await page.request.post('http://localhost:3000/registro', {
        data: {
          nome: faker.person.fullName(),
          email: faker.internet.email(),
          senha: faker.number.int({ min: 1, max: 1000 })
        }
      });

      expect(responsePOSTmail_Invalid7.status()).toBe(400);
      const bodyPOSTmail_Invalid7 = await responsePOSTmail_Invalid7.json();
      expect(typeof bodyPOSTmail_Invalid7.senha).toBe('string');
    });

    test('rejeita valores nulos', async ({ page }) => {
      // Verifica se o sistema rejeita valores nulos.
      const responsePOSTmail_Invalid8 = await page.request.post('http://localhost:3000/registro', {
        data: {
          nome: null,
          email: null,
          senha: null
        }
      });

      expect(responsePOSTmail_Invalid8.status()).toBe(400);
      const bodyPOSTmail_Invalid8 = await responsePOSTmail_Invalid8.json();
      expect(bodyPOSTmail_Invalid8.nome).not.toBe(undefined);
      expect(bodyPOSTmail_Invalid8.email).not.toBe(undefined);
      expect(bodyPOSTmail_Invalid8.senha).not.toBe(undefined);
    });

  });

})