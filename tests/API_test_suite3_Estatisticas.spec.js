// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Estatísticas', () => {
    test('Obter Estatísticas da Biblioteca', async ({ request }) => {
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        let responseGETbooks = await request.get('/livros');
        let responseGETavailablebooks = await request.get('/livros/disponiveis');
        let responseGETusers = await request.get('/usuarios');
        let responseGETbookloans = await request.get('/arrendamentos');
        let responseGETorders = await request.get('/compras');

        expect(responseGETbooks.status()).toBe(200);
        expect(responseGETavailablebooks.status()).toBe(200);
        expect(responseGETusers.status()).toBe(200);
        expect(responseGETbookloans.status()).toBe(200);
        expect(responseGETorders.status()).toBe(200);

        let bodyGETusers = await responseGETusers.json();
        let bodyGETbooks = await responseGETbooks.json();
        let bodyGETavailablebooks = await responseGETavailablebooks.json();
        let bodyGETbookloans = await responseGETbookloans.json();
        let bodyGETorders = await responseGETorders.json();

        let totalBooks = bodyGETbooks.length;
        let totalPages = 0;
        for (const book of bodyGETbooks) {
            totalPages += book.paginas;
        }
        let totalUsers = bodyGETusers.length;
        let totalType1Users = bodyGETusers.filter(user => user.tipo === 1).length;
        let totalType2Users = bodyGETusers.filter(user => user.tipo === 2).length;
        let totalType3Users = bodyGETusers.filter(user => user.tipo === 3).length;

        let totalAvailableBooks = bodyGETavailablebooks.length;

        /* Outra forma de fazer o loop e contar em vez de usar função filter
        let totalavailablebooks2 = 0
        for (const book of bodyGETbooks) {
            if (book.disponivel === true) {
                totalavailablebooks2 = totalavailablebooks2 + 1;
            }
        };
        */

        let totalPendingLoans = bodyGETbookloans.filter(loan => loan.status === 'PENDENTE').length;

        let totalPendingOrders = bodyGETorders.filter(order => order.status === 'PENDENTE').length;


        let responseGETstatistics = await request.get('/estatisticas');

        expect(responseGETstatistics.status()).toBe(200);

        let bodyGETstatistics = await responseGETstatistics.json();

        expect(bodyGETstatistics.totalLivros).toBe(totalBooks);
        expect(Number.isInteger(bodyGETstatistics.totalLivros)).toBe(true);
        expect(bodyGETstatistics.totalLivros).toBeGreaterThanOrEqual(0);
        expect(bodyGETstatistics.totalPaginas).toBe(totalPages);
        expect(Number.isInteger(bodyGETstatistics.totalPaginas)).toBe(true);
        expect(bodyGETstatistics.totalPaginas).toBeGreaterThanOrEqual(0);
        expect(bodyGETstatistics.totalUsuarios).toBe(totalUsers);
        expect(Number.isInteger(bodyGETstatistics.totalUsuarios)).toBe(true);
        expect(bodyGETstatistics.totalUsuarios).toBeGreaterThanOrEqual(0);
        expect(bodyGETstatistics.usuariosPorTipo.alunos).toBe(totalType1Users);
        expect(Number.isInteger(bodyGETstatistics.usuariosPorTipo.alunos)).toBe(true);
        expect(bodyGETstatistics.usuariosPorTipo.alunos).toBeGreaterThanOrEqual(0);
        expect(bodyGETstatistics.usuariosPorTipo.funcionarios).toBe(totalType2Users);
        expect(Number.isInteger(bodyGETstatistics.usuariosPorTipo.funcionarios)).toBe(true);
        expect(bodyGETstatistics.usuariosPorTipo.funcionarios).toBeGreaterThanOrEqual(0);
        expect(bodyGETstatistics.usuariosPorTipo.admins).toBe(totalType3Users);
        expect(Number.isInteger(bodyGETstatistics.usuariosPorTipo.admins)).toBe(true);
        expect(bodyGETstatistics.usuariosPorTipo.admins).toBeGreaterThanOrEqual(0);
        expect(bodyGETstatistics.livrosDisponiveis).toBe(totalAvailableBooks);
        expect(Number.isInteger(bodyGETstatistics.livrosDisponiveis)).toBe(true);
        expect(bodyGETstatistics.livrosDisponiveis).toBeGreaterThanOrEqual(0);
        expect(bodyGETstatistics.arrendamentosPendentes).toBe(totalPendingLoans);
        expect(Number.isInteger(bodyGETstatistics.arrendamentosPendentes)).toBe(true);
        expect(bodyGETstatistics.arrendamentosPendentes).toBeGreaterThanOrEqual(0);
        expect(bodyGETstatistics.comprasPendentes).toBe(totalPendingOrders);
        expect(Number.isInteger(bodyGETstatistics.comprasPendentes)).toBe(true);
        expect(bodyGETstatistics.comprasPendentes).toBeGreaterThanOrEqual(0);
        expect(bodyGETstatistics.totalUsuarios).toBe(totalType1Users + totalType2Users + totalType3Users);
    });

})