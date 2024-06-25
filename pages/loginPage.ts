import { Page } from "@playwright/test";

export default class LoginPage {
    constructor(public page: Page) {}

    async login(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    async enterEmail(email: string) {
        await this.page.getByLabel('Email address').fill(email);
    }

    async enterPassword(password: string) {
        await this.page.getByLabel('Password', { exact: true }).fill(password);
    }

    async clickLogin() {
        await this.page.getByRole('button', { name: 'Log in' }).click();
    }
}