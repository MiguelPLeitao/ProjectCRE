import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import Register_page from '../Page_Objects_Model_POM_FRONTEND/Register_page';
import Login_page from '../Page_Objects_Model_POM_FRONTEND/Login_page';
import Dashboard_page from '../Page_Objects_Model_POM_FRONTEND/Dashboard_page';
import BuyOrders_page from '../Page_Objects_Model_POM_FRONTEND/BuyOrders_page';
import Books_page from '../Page_Objects_Model_POM_FRONTEND/Books_page';
import BookDetails_page from '../Page_Objects_Model_POM_FRONTEND/BookDetails_page';
import Favourites_page from '../Page_Objects_Model_POM_FRONTEND/Favourites_page';
import Rents_page from '../Page_Objects_Model_POM_FRONTEND/Rents_page';
import MyBuyOrders_page from '../Page_Objects_Model_POM_FRONTEND/MyBuyOrders_page';
import Admin_Approvals_page from '../Page_Objects_Model_POM_FRONTEND/Admin_Approvals_page';
import Admin_BuyOrders_page from '../Page_Objects_Model_POM_FRONTEND/Admin_BuyOrders_page';
import Admin_AdminUsers_page from '../Page_Objects_Model_POM_FRONTEND/Admin_AdminUsers_page';


test.describe('Admin_Usuarios', () => {
    test('Acessar Tela de Usuários (Admin) (Sucesso)', async ({ page }) => {
        const login_page = new Login_page(page);
        const dashboard_page = new Dashboard_page(page);
        const adminusers_page = new Admin_AdminUsers_page(page);

        const ValidUserStudent = {
            "nome": faker.person.fullName(),
            "email": faker.internet.email(),
            "senha": faker.internet.password(),
            "tipo": 1
        }

        const ValidUserEmployee = {
            "nome": faker.person.fullName(),
            "email": faker.internet.email(),
            "senha": faker.internet.password(),
            "tipo": 2
        }

        let responsePOSTnewUserEmployee = await page.request.post('/registro',
            {
                data: ValidUserEmployee
            });

        let response2POSTnewUserStudent = await page.request.post('/registro',
            {
                data: ValidUserStudent
            });

        expect(responsePOSTnewUserEmployee.status()).toBe(201);
        let newUserEmployee = await responsePOSTnewUserEmployee.json();
        expect(newUserEmployee.usuario).toHaveProperty('id');
        expect(newUserEmployee.usuario).toHaveProperty('nome');
        expect(newUserEmployee.usuario.nome).toBe(ValidUserEmployee.nome);
        expect(newUserEmployee.usuario).toHaveProperty('email');
        expect(newUserEmployee.usuario.email).toBe(ValidUserEmployee.email);
        expect(newUserEmployee.usuario).toHaveProperty('tipo');

        expect(response2POSTnewUserStudent.status()).toBe(201);
        let newUserStudent = await response2POSTnewUserStudent.json();
        expect(newUserStudent.usuario).toHaveProperty('id');
        expect(newUserStudent.usuario).toHaveProperty('nome');
        expect(newUserStudent.usuario.nome).toBe(ValidUserStudent.nome);
        expect(newUserStudent.usuario).toHaveProperty('email');
        expect(newUserStudent.usuario.email).toBe(ValidUserStudent.email);
        expect(newUserStudent.usuario).toHaveProperty('tipo');

        await page.goto('http://localhost:3000/admin-usuarios.html');
        await expect(page).toHaveURL('http://localhost:3000/login.html');

        page.waitForEvent('dialog').then(async dialog => {
            if (dialog.message().includes('Login realizado com sucesso!')) {
                console.log("dialog message 'Login realizado com sucesso!' aceite")
                await dialog.accept();
            }
            else {
                throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
            }
        });

        await page.waitForTimeout(3000);

        await login_page.FillEmail_Password_InputFields(newUserStudent.usuario.email, ValidUserStudent.senha);
        await login_page.ClickEnterLogin_Button();
        await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
        await expect(dashboard_page.Admin_Usuarios_AdminUsers_button).not.toBeVisible();
        await page.goto('http://localhost:3000/admin-usuarios.html');
        await expect(page).toHaveURL('http://localhost:3000/admin-usuarios.html');
        await expect(adminusers_page.Mensagem_Message_text).toBeVisible();
        await expect(adminusers_page.NomeUsuario_UserName_inputfield).not.toBeVisible();
        await expect(adminusers_page.EmailUsuario_UserEmail_inputfield).not.toBeVisible();
        await expect(adminusers_page.SenhaUsuario_UserPassword_inputfield).not.toBeVisible();
        await expect(adminusers_page.TipoUsuario_UserType_dropdown).not.toBeVisible();
        await expect(adminusers_page.CriarUsuario_AddUser_button).not.toBeVisible();
        await expect(adminusers_page.UsersTable).not.toBeVisible();
        await adminusers_page.ClickSair_LogOut_button();
        await expect(page).toHaveURL('http://localhost:3000/login.html');
        const usuarioStudent = await page.evaluate(() => localStorage.getItem('usuario'));
        expect(usuarioStudent).toBeFalsy();

        page.waitForEvent('dialog').then(async dialog => {
            if (dialog.message().includes('Login realizado com sucesso!')) {
                console.log("dialog message 'Login realizado com sucesso!' aceite")
                await dialog.accept();
            }
            else {
                throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
            }
        });

        await page.waitForTimeout(3000);

        await login_page.FillEmail_Password_InputFields(newUserEmployee.usuario.email, ValidUserEmployee.senha);
        await login_page.ClickEnterLogin_Button();
        await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
        await expect(dashboard_page.Admin_Usuarios_AdminUsers_button).not.toBeVisible();
        await page.goto('http://localhost:3000/admin-usuarios.html');
        await expect(page).toHaveURL('http://localhost:3000/admin-usuarios.html');
        await expect(adminusers_page.Mensagem_Message_text).toBeVisible();
        await expect(adminusers_page.NomeUsuario_UserName_inputfield).not.toBeVisible();
        await expect(adminusers_page.EmailUsuario_UserEmail_inputfield).not.toBeVisible();
        await expect(adminusers_page.SenhaUsuario_UserPassword_inputfield).not.toBeVisible();
        await expect(adminusers_page.TipoUsuario_UserType_dropdown).not.toBeVisible();
        await expect(adminusers_page.CriarUsuario_AddUser_button).not.toBeVisible();
        await expect(adminusers_page.UsersTable).not.toBeVisible();
        await adminusers_page.ClickSair_LogOut_button();
        await expect(page).toHaveURL('http://localhost:3000/login.html');
        const usuarioEmployee = await page.evaluate(() => localStorage.getItem('usuario'));
        expect(usuarioEmployee).toBeFalsy();

        page.waitForEvent('dialog').then(async dialog => {
            if (dialog.message().includes('Login realizado com sucesso!')) {
                console.log("dialog message 'Login realizado com sucesso!' aceite")
                await dialog.accept();
            }
            else {
                throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
            }
        });

        await page.waitForTimeout(3000);

        await login_page.FillEmail_Password_InputFields("admin@biblioteca.com", "123456");

        await login_page.ClickEnterLogin_Button();

        await expect(page).toHaveURL('http://localhost:3000/dashboard.html');

        await dashboard_page.ClickAdmin_Usuarios_AdminUsers_button();

        await expect(page).toHaveURL('http://localhost:3000/admin-usuarios.html');

        await expect(adminusers_page.Mensagem_Message_text).not.toBeVisible();
        await expect(adminusers_page.NomeUsuario_UserName_inputfield).toBeVisible();
        await expect(adminusers_page.EmailUsuario_UserEmail_inputfield).toBeVisible();
        await expect(adminusers_page.SenhaUsuario_UserPassword_inputfield).toBeVisible();
        await expect(adminusers_page.TipoUsuario_UserType_dropdown).toBeVisible();
        await expect(adminusers_page.CriarUsuario_AddUser_button).toBeVisible();
        await expect(adminusers_page.UsersTable).toBeVisible();
    });


    test('Criar Funcionário pela UI Admin (Sucesso)', async ({ page }) => {
        const login_page = new Login_page(page);
        const dashboard_page = new Dashboard_page(page);
        const adminusers_page = new Admin_AdminUsers_page(page);

        await page.goto('http://localhost:3000/login.html');

        page.waitForEvent('dialog').then(async dialog => {
            if (dialog.message().includes('Login realizado com sucesso!')) {
                console.log("dialog message 'Login realizado com sucesso!' aceite")
                await dialog.accept();
            }
            else {
                throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
            }
        });

        await page.waitForTimeout(3000);

        await login_page.FillEmail_Password_InputFields("admin@biblioteca.com", "123456");

        await login_page.ClickEnterLogin_Button();

        await expect(page).toHaveURL('http://localhost:3000/dashboard.html');

        await dashboard_page.ClickAdmin_Usuarios_AdminUsers_button();

        await expect(page).toHaveURL('http://localhost:3000/admin-usuarios.html');

        page.waitForEvent('dialog').then(async dialog => {
            if (dialog.message().includes('Usuário criado com sucesso!')) {
                console.log("dialog message 'Usuário criado com sucesso!' aceite")
                await dialog.accept();
            }
            else {
                throw new Error('Dialog message 2 não aparece ou não contém o texto esperado.');
            }
        });

        await page.waitForTimeout(3000);

        const employee_name = faker.person.fullName();
        const employee_email = faker.internet.email();
        const employee_password = faker.internet.password();

        await adminusers_page.Fill_NovoUsuario_NewUser_inputfields(employee_name, employee_email, employee_password, "Funcionário");

        await adminusers_page.Click_CriarNovoUsuario_AddNewUser_button();

        const Table_newUserEmployee = await adminusers_page.Table_GetUserRow(employee_name);
        await expect(Table_newUserEmployee).toBeVisible();
    });


    test('Editar Usuário na Tabela (Sucesso)', async ({ page }) => {
        const login_page = new Login_page(page);
        const dashboard_page = new Dashboard_page(page);
        const adminusers_page = new Admin_AdminUsers_page(page);


        const ValidUserStudent = {
            "nome": faker.person.fullName(),
            "email": faker.internet.email(),
            "senha": faker.internet.password(),
            "tipo": 1
        }

        const ValidUserEmployee = {
            "nome": faker.person.fullName(),
            "email": faker.internet.email(),
            "senha": faker.internet.password(),
            "tipo": 2
        }

        let responsePOSTnewUserEmployee = await page.request.post('/registro',
            {
                data: ValidUserEmployee
            });

        let response2POSTnewUserStudent = await page.request.post('/registro',
            {
                data: ValidUserStudent
            });

        expect(responsePOSTnewUserEmployee.status()).toBe(201);
        let newUserEmployee = await responsePOSTnewUserEmployee.json();
        expect(newUserEmployee.usuario).toHaveProperty('id');
        expect(newUserEmployee.usuario).toHaveProperty('nome');
        expect(newUserEmployee.usuario.nome).toBe(ValidUserEmployee.nome);
        expect(newUserEmployee.usuario).toHaveProperty('email');
        expect(newUserEmployee.usuario.email).toBe(ValidUserEmployee.email);
        expect(newUserEmployee.usuario).toHaveProperty('tipo');

        expect(response2POSTnewUserStudent.status()).toBe(201);
        let newUserStudent = await response2POSTnewUserStudent.json();
        expect(newUserStudent.usuario).toHaveProperty('id');
        expect(newUserStudent.usuario).toHaveProperty('nome');
        expect(newUserStudent.usuario.nome).toBe(ValidUserStudent.nome);
        expect(newUserStudent.usuario).toHaveProperty('email');
        expect(newUserStudent.usuario.email).toBe(ValidUserStudent.email);
        expect(newUserStudent.usuario).toHaveProperty('tipo');




        await page.goto('http://localhost:3000/login.html');

        page.waitForEvent('dialog').then(async dialog => {
            if (dialog.message().includes('Login realizado com sucesso!')) {
                console.log("dialog message 'Login realizado com sucesso!' aceite")
                await dialog.accept();
            }
            else {
                throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
            }
        });

        await page.waitForTimeout(3000);

        await login_page.FillEmail_Password_InputFields("admin@biblioteca.com", "123456");

        await login_page.ClickEnterLogin_Button();

        await expect(page).toHaveURL('http://localhost:3000/dashboard.html');

        await dashboard_page.ClickAdmin_Usuarios_AdminUsers_button();

        await expect(page).toHaveURL('http://localhost:3000/admin-usuarios.html');

        page.waitForEvent('dialog').then(async dialog => {
            if (dialog.message().includes('Usuário atualizado com sucesso!')) {
                console.log("dialog message 'Usuário atualizado com sucesso!' aceite")
                await dialog.accept();
            }
            else {
                throw new Error('Dialog message 2 não aparece ou não contém o texto esperado.');
            }
        });

        await page.waitForTimeout(3000);

        const Table_newUserEmployee = await adminusers_page.Table_GetUserRow(newUserEmployee.usuario.nome);
        await expect(Table_newUserEmployee).toBeVisible();
        const userEmployeeID = await adminusers_page.Table_GetUserId(Table_newUserEmployee);
        await adminusers_page.Table_EditUserName(Table_newUserEmployee, `${newUserEmployee.usuario.nome} EDITADO`);
        await adminusers_page.Table_ClickSaveChanges(Table_newUserEmployee);
        await page.reload();
        await page.removeAllListeners('dialog');

        const Table_newUserEmployeeEdited = await adminusers_page.Table_GetUserRow(userEmployeeID);
        await expect(Table_newUserEmployeeEdited).toBeVisible();
        const userEmployeeEditedName = await adminusers_page.Table_GetUserName(Table_newUserEmployeeEdited);
        await expect(userEmployeeEditedName).toBe(`${newUserEmployee.usuario.nome} EDITADO`);


        page.waitForEvent('dialog').then(async dialog => {
            if (dialog.message().includes('Usuário atualizado com sucesso!')) {
                console.log("dialog message 'Usuário atualizado com sucesso!' aceite")
                await dialog.accept();
            }
            else {
                throw new Error('Dialog message 3 não aparece ou não contém o texto esperado.');
            }
        });

        await page.waitForTimeout(3000);

        const Table_newUserStudent = await adminusers_page.Table_GetUserRow(newUserStudent.usuario.nome);
        await expect(Table_newUserStudent).toBeVisible();
        const userStudentID = await adminusers_page.Table_GetUserId(Table_newUserStudent);
        await adminusers_page.Table_EditUserName(Table_newUserStudent, `${newUserStudent.usuario.nome} EDITADO`);
        await adminusers_page.Table_ClickSaveChanges(Table_newUserStudent);
        await page.reload();
        await page.removeAllListeners('dialog');

        const Table_newUserStudentEdited = await adminusers_page.Table_GetUserRow(userStudentID);
        await expect(Table_newUserStudentEdited).toBeVisible();
        const userStudentEditedName = await adminusers_page.Table_GetUserName(Table_newUserStudentEdited);
        await expect(userStudentEditedName).toBe(`${newUserStudent.usuario.nome} EDITADO`);
    });


    test('Excluir Usuário (Sucesso)', async ({ page }) => {
        const login_page = new Login_page(page);
        const dashboard_page = new Dashboard_page(page);
        const adminusers_page = new Admin_AdminUsers_page(page);


        const ValidUserStudent = {
            "nome": faker.person.fullName(),
            "email": faker.internet.email(),
            "senha": faker.internet.password(),
            "tipo": 1
        }

        const ValidUserEmployee = {
            "nome": faker.person.fullName(),
            "email": faker.internet.email(),
            "senha": faker.internet.password(),
            "tipo": 2
        }

        let responsePOSTnewUserEmployee = await page.request.post('/registro',
            {
                data: ValidUserEmployee
            });

        let response2POSTnewUserStudent = await page.request.post('/registro',
            {
                data: ValidUserStudent
            });

        expect(responsePOSTnewUserEmployee.status()).toBe(201);
        let newUserEmployee = await responsePOSTnewUserEmployee.json();
        expect(newUserEmployee.usuario).toHaveProperty('id');
        expect(newUserEmployee.usuario).toHaveProperty('nome');
        expect(newUserEmployee.usuario.nome).toBe(ValidUserEmployee.nome);
        expect(newUserEmployee.usuario).toHaveProperty('email');
        expect(newUserEmployee.usuario.email).toBe(ValidUserEmployee.email);
        expect(newUserEmployee.usuario).toHaveProperty('tipo');

        expect(response2POSTnewUserStudent.status()).toBe(201);
        let newUserStudent = await response2POSTnewUserStudent.json();
        expect(newUserStudent.usuario).toHaveProperty('id');
        expect(newUserStudent.usuario).toHaveProperty('nome');
        expect(newUserStudent.usuario.nome).toBe(ValidUserStudent.nome);
        expect(newUserStudent.usuario).toHaveProperty('email');
        expect(newUserStudent.usuario.email).toBe(ValidUserStudent.email);
        expect(newUserStudent.usuario).toHaveProperty('tipo');




        await page.goto('http://localhost:3000/login.html');

        page.waitForEvent('dialog').then(async dialog => {
            if (dialog.message().includes('Login realizado com sucesso!')) {
                console.log("dialog message 'Login realizado com sucesso!' aceite")
                await dialog.accept();
            }
            else {
                throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
            }
        });

        await page.waitForTimeout(3000);

        await login_page.FillEmail_Password_InputFields("admin@biblioteca.com", "123456");

        await login_page.ClickEnterLogin_Button();

        await expect(page).toHaveURL('http://localhost:3000/dashboard.html');

        await dashboard_page.ClickAdmin_Usuarios_AdminUsers_button();

        await expect(page).toHaveURL('http://localhost:3000/admin-usuarios.html');

        let approvalDialogCount1 = 0;
        page.on('dialog', async dialog => {
            approvalDialogCount1++;

            if (
                approvalDialogCount1 === 1 &&
                dialog.message().includes('Deseja realmente excluir o usuário')
            ) {
                console.log("dialog message 'Deseja realmente excluir o usuário?' aceite");
                await dialog.accept();
            }
            else if (
                approvalDialogCount1 === 2 &&
                dialog.message().includes('Usuário excluído com sucesso!')
            ) {
                console.log("dialog message 'Usuário excluído com sucesso!' aceite");
                await dialog.accept();
            }
            else {
                throw new Error(`Dialog inesperado: ${dialog.message()}`);
            }
        });

        await page.waitForTimeout(3000);

        const Table_newUserEmployee = await adminusers_page.Table_GetUserRow(newUserEmployee.usuario.nome);
        await expect(Table_newUserEmployee).toBeVisible();
        const userEmployeeID = await adminusers_page.Table_GetUserId(Table_newUserEmployee);
        await adminusers_page.Table_ClickDeleteUser(Table_newUserEmployee);
        await page.reload();
        await page.removeAllListeners('dialog');

        await expect(Table_newUserEmployee).not.toBeVisible();
        const Table_newUserEmployeeDeleted = await adminusers_page.Table_GetUserRow(userEmployeeID);
        await expect(Table_newUserEmployeeDeleted).not.toBeVisible();



        let approvalDialogCount2 = 0;
        page.on('dialog', async dialog => {
            approvalDialogCount2++;

            if (
                approvalDialogCount2 === 1 &&
                dialog.message().includes('Deseja realmente excluir o usuário')
            ) {
                console.log("dialog message 'Deseja realmente excluir o usuário?' aceite");
                await dialog.accept();
            }
            else if (
                approvalDialogCount2 === 2 &&
                dialog.message().includes('Usuário excluído com sucesso!')
            ) {
                console.log("dialog message 'Usuário excluído com sucesso!' aceite");
                await dialog.accept();
            }
            else {
                throw new Error(`Dialog inesperado: ${dialog.message()}`);
            }
        });

        await page.waitForTimeout(3000);

        const Table_newUserStudent = await adminusers_page.Table_GetUserRow(newUserStudent.usuario.nome);
        await expect(Table_newUserStudent).toBeVisible();
        const userStudentID = await adminusers_page.Table_GetUserId(Table_newUserStudent);
        await adminusers_page.Table_ClickDeleteUser(Table_newUserStudent);
        await page.reload();
        await page.removeAllListeners('dialog');

        await expect(Table_newUserStudent).not.toBeVisible();
        const Table_newUserStudentDeleted = await adminusers_page.Table_GetUserRow(userStudentID);
        await expect(Table_newUserStudentDeleted).not.toBeVisible();
    });

})