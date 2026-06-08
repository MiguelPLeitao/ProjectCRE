import { expect } from '@playwright/test';

class LoginPage {
    constructor(page) {
        this.page = page;
        this.TITLE_Header = page.getByRole('heading', { name: '📚 Login' });
        this.EMAIL_Text = page.getByText('Email:');
        this.EMAIL_InputField = page.getByRole('textbox', { name: 'Email:' });
        this.PASSWORD_Text = page.getByText('Senha:');
        this.PASSWORD_InputField = page.getByRole('textbox', { name: 'Senha:' });
        this.ENTER_LOGIN_Button = page.getByRole('button', { name: 'Entrar' });
        this.DONT_HAVE_ACCOUNT_Text = page.getByText('Não tem uma conta? Registre-se');
        this.DONT_HAVE_ACCOUNT_Text_REDIRECT_REGISTER_Button = page.getByRole('link', { name: 'Registre-se' });

        this.PAGEBODY_allpage = page.locator('body');
    }

    async FillEmail_Password_InputFields(email, password) {
        await this.EMAIL_InputField.fill(email);
        await this.PASSWORD_InputField.fill(password);
    }

    async FillEmail_InputField(email) {
        await this.EMAIL_InputField.fill(email);
    }

    async FillPassword_InputField(password) {
        await this.PASSWORD_InputField.fill(password);
    }

    async ClickEnterLogin_Button() {
        await this.ENTER_LOGIN_Button.click();
    }

    async ClickDontHaveAccountRedirectRegister_Button() {
        await this.DONT_HAVE_ACCOUNT_Text_REDIRECT_REGISTER_Button.click();
    }
}

export default LoginPage;