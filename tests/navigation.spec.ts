import {test, expect} from '@playwright/test';
import {
    navigateToHomepage,
    navigateToSection,
    clickButton, verifyCorporateAPIs, verifyRegulatoryAPIs, verifyAPIs
} from '../utils';

test('navigation to API explorer in the developer portal', async ({ page }) => {
    // Navigate to homepage and accept cookies
    await navigateToHomepage(page);

    // Browse APIs from homepage
    await navigateToSection(page, 'Browse APIs');
    await clickButton(page, 'All');
    await verifyAPIs(page);

    // Navigate to Corporate APIs and verify
    await clickButton(page, 'Corporate APIs');
    await verifyCorporateAPIs(page);

    // Navigate to Regulatory APIs and verify
    await clickButton(page, 'Regulatory APIs');
    await verifyRegulatoryAPIs(page);

    // Check out all our APIs button
    await navigateToHomepage(page);
    await navigateToSection(page, 'Check out all our APIs');
    await clickButton(page, 'All');
    await verifyAPIs(page);

    // Navigate to Corporate APIs and verify
    await clickButton(page, 'Corporate APIs');
    await verifyCorporateAPIs(page);

    // Navigate to Regulatory APIs and verify
    await clickButton(page, 'Regulatory APIs');
    await verifyRegulatoryAPIs(page);

    // API Explorer shortcut button
    await navigateToHomepage(page);
    await navigateToSection(page, 'API Explorer');
    await clickButton(page, 'All');
    await verifyAPIs(page);

    // Navigate to Corporate APIs and verify
    await clickButton(page, 'Corporate APIs');
    await verifyCorporateAPIs(page);

    // Navigate to Regulatory APIs and verify
    await clickButton(page, 'Regulatory APIs');
    await verifyRegulatoryAPIs(page);

    // Menu -> API Explorer
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByText('API explorer', { exact: true }).click();
    await clickButton(page, 'All');
    await verifyAPIs(page);

    // Navigate to Corporate APIs and verify
    await clickButton(page, 'Corporate APIs');
    await verifyCorporateAPIs(page);

    // Navigate to Regulatory APIs and verify
    await clickButton(page, 'Regulatory APIs');
    await verifyRegulatoryAPIs(page);

    // Menu -> More APIs
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByText('More APIs').click();
    await clickButton(page, 'All');
    await verifyAPIs(page);

    // Navigate to Corporate APIs and verify
    await clickButton(page, 'Corporate APIs');
    await verifyCorporateAPIs(page);

    // Navigate to Regulatory APIs and verify
    await clickButton(page, 'Regulatory APIs');
    await verifyRegulatoryAPIs(page);

    // Getting started guide -> Find your API
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByText('Getting started guide').click();
    await navigateToSection(page, 'Find your API');
    await clickButton(page, 'All');
    await verifyAPIs(page);

    // Navigate to Corporate APIs and verify
    await clickButton(page, 'Corporate APIs');
    await verifyCorporateAPIs(page);

    // Navigate to Regulatory APIs and verify
    await clickButton(page, 'Regulatory APIs');
    await verifyRegulatoryAPIs(page);
});

