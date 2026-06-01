// @ts-check
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Favoritos', () => {
    test('Adicionar Livro aos Favoritos (Sucesso)', async ({ page }) => {
        let responsePOSTfavoritebook = await page.request.post('/favoritos', {
            data: {
                "usuarioId": 1,
                "livroId": 1
            }
        })
    });
});