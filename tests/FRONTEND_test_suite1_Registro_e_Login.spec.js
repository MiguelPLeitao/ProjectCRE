// @ts-check
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const ValidUser = {
    "nome": faker.person.fullName(),
    "email": faker.internet.email(),
    "senha": faker.internet.password(),
}

test.describe('Registo e Login', () => {
    test('Fluxo Completo de Registro (Aluno) (Sucesso)', async ({ page }) => {
        await page.goto('http://localhost:3000/registro.html');
        await page.goto('http://localhost:3000/login.html');
        await page.goto('http://localhost:3000/registro.html');
    });
})