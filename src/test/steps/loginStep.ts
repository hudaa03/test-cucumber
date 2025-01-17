import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { loginPage } from '../../src/pages/loginPage';

let loginPage: loginPage;

Given('the user navigates to the Spendflo login page', async () => {
  loginPage = new loginPage();
  await loginPage.navigateToLoginPage();
});

When('the user logs in with email {string} and password {string}', async (email: string, pwd: string) => {
  await loginPage.login(email, pwd);
});

When('the user skips the "Skip for now" button if it appears', async () => {
  await loginPage.skipButtonIfPresent();
});

When('the user handles the Pendo popup if it appears', async () => {
  await loginPage.closePendoPopupIfPresent();
});

When('the user selects the "SpendfloOne" organization if necessary', async () => {
  await loginPage.selectOrganizationIfNecessary();
});

Then('the user should be on the Spendflo homepage', async () => {
  await expect(loginPage.isOnHomePage()).toBeTruthy();
});
