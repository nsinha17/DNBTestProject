import {test, expect} from '@playwright/test';
import {
    navigateToHomepage,
    navigateToSection,
    clickButton,
    verifyCorporateAPIs,
    verifyRegulatoryAPIs,
    verifyAllAPIs,
    selectCategoryAll,
    selectCategoryRegulatoryAPI,
    selectCategoryCorporateAPI
} from '../utils';

test('navigation to API explorer in the developer portal', async ({ page }) => {
    // Browse APIs from homepage
    await navigateToHomepage(page);
    await navigateToSection(page, 'Browse APIs');
    await verifyAPIs(page);

    // Check out all our APIs button
    await navigateToHomepage(page);
    await navigateToSection(page, 'Check out all our APIs');
    await verifyAPIs(page);

    // API Explorer shortcut button
    await navigateToHomepage(page);
    await navigateToSection(page, 'API Explorer');
    await verifyAPIs(page);

    // Menu -> API Explorer
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByText('API explorer', { exact: true }).click();
    await verifyAPIs(page);

    // Menu -> More APIs
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByText('More APIs').click();
    await verifyAPIs(page);

    // Getting started guide -> Find your API
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByText('Getting started guide').click();
    await navigateToSection(page, 'Find your API');
    await verifyAPIs(page);
});

async function verifyAPIs(page:Page){
    await selectCategoryAll(page);
    await verifyAllAPIs(page);

    // Navigate to Corporate APIs and verify
    await selectCategoryCorporateAPI(page);
    await verifyCorporateAPIs(page);

    // Navigate to Regulatory APIs and verify
    await selectCategoryRegulatoryAPI(page);
    await verifyRegulatoryAPIs(page);
}



