import {expect} from "@playwright/test";
import {userCredentials} from "./credentials";
import LoginPage from './pages/LoginPage';

// Login
export async function login(page: Page) {
    await navigateToHomepage(page)
    await page.getByRole('link', {name: 'Log in'}).click();
    const login = new LoginPage(page);
    await login.login(userCredentials.username, userCredentials.password)
    await page.waitForNavigation();
}

// Navigate to the homepage and accept cookies
export async function navigateToHomepage(page: Page): Promise<void> {
    await page.goto('/');
    if (await page.getByRole('heading', {name: 'Bruk av informasjonskapsler (cookies)'}).isVisible()) {
        await page.getByText('OK', {exact: true}).click();
    }
}

// Navigate to a specific section
export async function navigateToSection(page: Page, linkName: string): Promise<void> {
    await page.getByRole('link', {name: linkName}).click();
}

// Click a button by its name
export async function clickButton(page: Page, buttonName: string): Promise<void> {
    await page.getByRole('button', {name: buttonName}).click();
}

export async function fillApplicationInformation(page: Page, applicationName: string, applicationDesc: string) {
    await page.getByRole('link', {name: 'Create app'}).click();
    await page.getByLabel('Application name').fill(applicationName);
    await page.getByLabel('Application description').fill(applicationDesc);
}

export async function clickNext(page: Page) {
    await page.getByRole('button', {name: 'Next'}).click();
}

export async function attachAPI(page: Page, apiName: string) {
    await page.getByLabel(apiName).check();
}

export async function verifyFullAccessToApi(page: Page) {
    var isChecked = await page.locator('span:has-text("Full acces")').locator('input[type="checkbox"]').isChecked()
    expect(isChecked).toBe(true);
}

export async function verifyDetails(page: Page, applicationName: string, applicationDesc: string) {
    expect(await page.locator(".dnb-p__size--basis").nth(0)).toContainText(applicationName)
    expect(await page.locator(".dnb-p__size--basis").nth(1)).toContainText(applicationDesc)
    expect(await page.getByRole('heading', {name: 'Currencies'})).toHaveCount(1)
}

export async function clickCreateApplication(page: Page): Promise<boolean> {
    const [response] = await Promise.all([
        page.waitForResponse(response => response.url().includes('/apis/test-mode') && response.request().method() === 'POST'),
        page.getByRole('button', {name: 'Create application'}).click()
    ]);
    return response.status() == 204;
}

export async function gotoApplication(page: Page) {
    await page.getByRole('link', {name: 'Go to application'}).click();
}

export async function verifyAppDetails(page: Page, applicationName: string, applicationDesc: string, ownerName: string, selectedApi: string) {
    await page.waitForSelector(`text=${applicationName}`)
    expect(await page.locator(".dnb-space__bottom--small").nth(2).locator("p").nth(1)).toContainText(ownerName)
    expect(await page.locator(".dnb-space__bottom--small").nth(3).locator("p").nth(1)).toContainText(applicationName)
    expect(await page.locator(".dnb-space__bottom--small").nth(4).locator("p").nth(1)).toContainText(applicationDesc)
    expect(await page.locator(".dnb-accordion__header__title").locator(".dnb-p--bold")).toContainText(selectedApi)
}

export async function deleteApp(page: Page): Promise<boolean> {
    await page.click('button:has-text("Delete app")')
    const [response] = await Promise.all([
        page.waitForResponse(response => response.url().includes('/service/apps/') && response.request().method() === 'DELETE'),
        page.click('button:has-text("Delete app")')
    ]);
    return response.status() == 204;
}

export async function selectCategoryAll(page: Page) {
    await clickButton(page, 'All');
}

export async function selectCategoryCorporateAPI(page: Page) {
    await clickButton(page, 'Corporate APIs');
}

export async function selectCategoryRegulatoryAPI(page: Page) {
    await clickButton(page, 'Regulatory APIs');
}

export async function verifyCorporateAPIs(page: Page): Promise<void> {
    await expect(page.getByText('Account Pre-validationCurrent')).toBeVisible();
    await expect(page.getByText('CurrenciesCurrent version2.1.')).toBeVisible();
}

export async function verifyRegulatoryAPIs(page: Page): Promise<void> {
    await expect(page.getByRole('link', {name: 'Account Information Service'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Payment Initiation Service'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'PSD2 Fallback'})).toBeVisible();
}

// Verify that specific APIs are visible
export async function verifyAllAPIs(page: Page): Promise<void> {
    await verifyCorporateAPIs(page);
    await verifyRegulatoryAPIs(page);
}
