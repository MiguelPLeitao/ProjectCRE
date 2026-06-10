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

    let responsePOSTmail_Maria_Silva = await page.request.post('/registro',
      {
        data: {
          "nome": "Maria Silva",
          "email": "maria.silva@teste.com",
          "senha": "senha123"
        }
      });

    if (responsePOSTmail_Maria_Silva.status() === 400) {
      let responsePOSTmail_new_valid_user1 = await page.request.post('/registro',
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
    let responsePOSTmail_Admin = await page.request.post('/registro',
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


  test('Login com Credenciais Válidas (Admin)(Sucesso)', async ({ page }) => {
    let startTime = Date.now();

    let responsePOSTlogin_Admin = await page.request.post('/login',
      {
        data: {
          "email": "admin@biblioteca.com",
          "senha": "123456"
        }
      });

    let responsetime = Date.now() - startTime;
    expect(responsePOSTlogin_Admin.status()).toBe(200);
    expect(responsetime).toBeLessThan(2000);

    let bodyPOSTlogin_Admin = await responsePOSTlogin_Admin.json();

    expect(bodyPOSTlogin_Admin.mensagem).toBe('Login realizado com sucesso');
    expect(bodyPOSTlogin_Admin).toHaveProperty('usuario');
    expect(bodyPOSTlogin_Admin.usuario).not.toHaveProperty('senha');
    expect(bodyPOSTlogin_Admin.usuario).toHaveProperty('tipo');
    expect(bodyPOSTlogin_Admin.usuario.tipo).toBe(3);
  });

  test.describe('Validar rejeição de credenciais incorretas (Falha)', () => {
    test('Login com senha incorreta', async ({ page }) => {
      let response1POSTinvalidlogin_Admin = await page.request.post('/login',
        {
          data: {
            "email": "admin@biblioteca.com",
            "senha": "senhaerrada"
          }
        });

      expect(response1POSTinvalidlogin_Admin.status()).toBe(401);

      let body1POSTinvalidlogin_Admin = await response1POSTinvalidlogin_Admin.json();

      expect(body1POSTinvalidlogin_Admin.mensagem).toBe('Email ou senha incorretos');
    });

    test('Login com email incorreto', async ({ page }) => {
      let response2POSTinvalidlogin_Admin = await page.request.post('/login',
        {
          data: {
            "email": "adminmailincorreto@biblioteca.com",
            "senha": "123456"
          }
        });

      expect(response2POSTinvalidlogin_Admin.status()).toBe(401);

      let body2POSTinvalidlogin_Admin = await response2POSTinvalidlogin_Admin.json();

      expect(body2POSTinvalidlogin_Admin.mensagem).toBe('Email ou senha incorretos');
    });

    test('Login com email e senha vazios', async ({ page }) => {
      let response3POSTinvalidlogin_Admin = await page.request.post('/login',
        {
          data: {
            "email": "",
            "senha": ""
          }
        });

      expect(response3POSTinvalidlogin_Admin.status()).toBe(401);

      let body3POSTinvalidlogin_Admin = await response3POSTinvalidlogin_Admin.json();

      expect(body3POSTinvalidlogin_Admin.mensagem).toBe('Email ou senha incorretos');
    });
  });
});