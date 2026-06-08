import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const RandomValidUser = {
    NAME: faker.person.fullName(),
    EMAIL: faker.internet.email(),
    PASSWORD: faker.internet.password({ length: faker.number.int({ min: 6, max: 20 }) }),
}

class Register_page {
    constructor(page) {
        this.page = page;
        this.TITLE_Header = page.getByRole('heading', { name: '📚 Criar Conta' });
        this.NAME_Text = page.getByText('Nome:');
        this.NAME_InputField = page.getByRole('textbox', { name: 'Nome:' });
        this.EMAIL_Text = page.getByText('Email:');
        this.EMAIL_InputField = page.getByRole('textbox', { name: 'Email:' });
        this.PASSWORD_Text = page.getByText('Senha:', { exact: true });
        this.PASSWORD_InputField = page.getByRole('textbox', { name: 'Senha:', exact: true });
        this.CONFIRM_PASSWORD_Text = page.getByText('Confirmar Senha:');
        this.CONFIRM_PASSWORD_InputField = page.getByRole('textbox', { name: 'Confirmar Senha:' });
        this.REGISTER_Button = page.getByRole('button', { name: 'Registrar' });
        this.ALREADY_HAVE_ACCOUNT_Text = page.getByText('Já tem conta? Entrar');
        this.ALREADY_HAVE_ACCOUNT_REDIRECT_LOGIN_Button = page.getByRole('link', { name: 'Entrar' });

        this.PAGEBODY_allpage = page.locator('body');
    }


    async FillName_Email_Password_InputFields(name, email, password) {
        const finalName = name || RandomValidUser.NAME;
        const finalEmail = email || RandomValidUser.EMAIL;
        const finalPassword = password || RandomValidUser.PASSWORD;

        await this.NAME_InputField.fill(finalName);
        await this.EMAIL_InputField.fill(finalEmail);
        await this.PASSWORD_InputField.fill(finalPassword);
        await this.CONFIRM_PASSWORD_InputField.fill(finalPassword);
        await console.log("Os dados foram preenchidos com sucesso!");
        await console.log("O nome é: " + finalName);
        await console.log("O email é: " + finalEmail);
        await console.log("A senha é: " + finalPassword);

        return { finalName, finalEmail, finalPassword };
    }


    async FillName_InputField(name) {
        await this.NAME_InputField.fill(name);
    }

    async FillEmail_InputField(email) {
        await this.EMAIL_InputField.fill(email);
    }

    async FillPassword_and_ConfirmPassword_InputFields(password) {
        await this.PASSWORD_InputField.fill(password);
        await this.CONFIRM_PASSWORD_InputField.fill(password);
    }

    async FillPasssword_InputField(password) {
        await this.PASSWORD_InputField.fill(password);
    }

    async FillConfirmPassword_InputField(password) {
        await this.CONFIRM_PASSWORD_InputField.fill(password);
    }


    async ClickRegister_Button() {
        await this.REGISTER_Button.click();
    }

    async ClickAlreadyHaveAccountRedirectLogin_Button() {
        await this.ALREADY_HAVE_ACCOUNT_REDIRECT_LOGIN_Button.click();
    }
}

export default Register_page;