import {test, expect} from '@playwright/test';
import {
    attachAPI, clickCreateApplication,
    clickNext,
    deleteApp, fillApplicationInformation, gotoApplication,
    login,
    verifyAppDetails,
    verifyDetails, verifyFullAccessToApi
} from "../utils";

test.beforeEach(async ({page}) => {
    await login(page);
})

test('create app, add api and delete the app', async ({page}) => {
    const applicationName = "NehaTestApp-" + Date.now().toString();
    const applicationDesc = "Application for testing purpose";
    const apiName = "Currencies";
    const ownerName = "Neha Sinha";

    await fillApplicationInformation(page, applicationName, applicationDesc);
    await clickNext(page);
    await attachAPI(page, apiName);
    await clickNext(page);
    await verifyFullAccessToApi(page);
    await clickNext(page);

    await verifyDetails(page, applicationName, applicationDesc);
    const appCreated = await clickCreateApplication(page);
    expect(appCreated).toBe(true)

    await gotoApplication(page)
    await verifyAppDetails(page, applicationName, applicationDesc, ownerName, apiName);
    const appDeleted = await deleteApp(page);
    expect(appDeleted).toBe(true);
});
