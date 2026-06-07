// @ts-check
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Admin Usuários', () => {
    test('Listar Usuários (Sucesso)', async ({ page }) => {
        let responseGETall_users = await page.request.get('/usuarios');

        expect(responseGETall_users.status()).toBe(200);

        let bodyGETall_users = await responseGETall_users.json();

        expect(Array.isArray(bodyGETall_users)).toBe(true);
        expect(bodyGETall_users.length).toBeGreaterThan(0);

        for (const user of bodyGETall_users) {
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('nome');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('tipo');
            expect(user).not.toHaveProperty('senha');
        }
    });


    test('Atualizar Usuário (Sucesso)', async ({ page }) => {
        let response2GETall_users = await page.request.get('/usuarios');

        expect(response2GETall_users.status()).toBe(200);

        let body2GETall_users = await response2GETall_users.json();

        expect(Array.isArray(body2GETall_users)).toBe(true);
        expect(body2GETall_users.length).toBeGreaterThan(0);

        let randomUser = faker.helpers.arrayElement(body2GETall_users.filter(user => user.tipo < 3)).id;

        let User2arrayPosition;
        for (const user2 of body2GETall_users) {
            if (user2.id === randomUser) {
                expect(user2).toHaveProperty('id');
                expect(user2).toHaveProperty('nome');
                expect(user2).toHaveProperty('email');
                expect(user2).toHaveProperty('tipo');
                expect(user2).not.toHaveProperty('senha');
                User2arrayPosition = body2GETall_users.indexOf(user2);
                break;
            }
        }
        console.log(User2arrayPosition);
        console.log(body2GETall_users[User2arrayPosition].tipo);
        console.log(body2GETall_users[User2arrayPosition].nome);
        console.log(body2GETall_users[User2arrayPosition].email);

        let newType;
        if (body2GETall_users[User2arrayPosition].tipo === 2) {
            newType = 1;
        }
        else if (body2GETall_users[User2arrayPosition].tipo === 1) {
            newType = 2;
        }
        else {
            console.log("Tipo de usuário: " + body2GETall_users[User2arrayPosition].tipo);
            throw new Error("Tipo de usuário inválido ou não pode ser alterado");
        }

        let response2PUTuser = await page.request.put(`/usuarios/${randomUser}`,
            {
                data: {
                    nome: body2GETall_users[User2arrayPosition].nome + " - Atualizado",
                    email: "atualizado" + body2GETall_users[User2arrayPosition].email,
                    tipo: newType
                }
            }
        );

        expect(response2PUTuser.status()).toBe(200);

        let body2PUTuser = await response2PUTuser.json();

        expect(body2PUTuser).toHaveProperty('id');
        expect(body2PUTuser.id).toBe(randomUser);
        expect(body2PUTuser).toHaveProperty('nome');
        expect(body2PUTuser.nome).toBe(body2GETall_users[User2arrayPosition].nome + " - Atualizado");
        expect(body2PUTuser).toHaveProperty('email');
        expect(body2PUTuser.email).toBe("atualizado" + body2GETall_users[User2arrayPosition].email);
        expect(body2PUTuser).toHaveProperty('tipo');
        expect(body2PUTuser.tipo).toBe(newType);
        expect(body2PUTuser).not.toHaveProperty('senha');
    });


    test('Excluir Usuário (Não-Admin Principal) (Sucesso)', async ({ page }) => {
        let response2GETall_users = await page.request.get('/usuarios');

        expect(response2GETall_users.status()).toBe(200);

        let body2GETall_users = await response2GETall_users.json();

        expect(Array.isArray(body2GETall_users)).toBe(true);
        expect(body2GETall_users.length).toBeGreaterThan(0);

        let randomUser2 = faker.helpers.arrayElement(body2GETall_users.filter(user => user.tipo < 3)).id;

        let response2DELETEuser = await page.request.delete(`/usuarios/${randomUser2}`);

        expect(response2DELETEuser.status()).toBe(200);

        let body2DELETEuser = await response2DELETEuser.json();

        expect(body2DELETEuser.mensagem).toBe('Usuário deletado com sucesso');

        let response2DELETEuserAgain = await page.request.delete(`/usuarios/${randomUser2}`);

        expect(response2DELETEuserAgain.status()).toBe(404);
    });


    test('Tentar Excluir Admin Principal (Falha)', async ({ page }) => {
        let response3GETall_users = await page.request.get('/usuarios');

        expect(response3GETall_users.status()).toBe(200);

        let body3GETall_users = await response3GETall_users.json();

        expect(Array.isArray(body3GETall_users)).toBe(true);
        expect(body3GETall_users.length).toBeGreaterThan(0);

        let randomUser3 = faker.helpers.arrayElement(body3GETall_users.filter(user => user.tipo === 3)).id;

        let response3DELETEuser = await page.request.delete(`/usuarios/${randomUser3}`);

        expect(response3DELETEuser.status()).toBe(403);

        let body3DELETEuser = await response3DELETEuser.json();

        expect(body3DELETEuser.mensagem).toBe('Admin principal não pode ser deletado');

    });
})