import { Page, chromium } from 'playwright';

export class loginPage {
  private page: Page;

  constructor() {
    (async () => {
      const browser = await chromium.launch();
      const context = await browser.newContext();
      this.page = await context.newPage();
    })();
  }

  async navigateToLoginPage() {
    await this.page.goto('https://app.spendflo.com');
  }

  async login(email: string, pwd: string) {
    const emailField = this.page.locator('//input[@name="identifier"]');
    await emailField.click();
    await emailField.fill(email);
    await emailField.press('Enter');

    const pwdField = this.page.locator('//input[@name="password"]');
    await pwdField.click();
    await pwdField.fill(pwd);

    await this.page.locator('button:has-text("Sign in")').click();
    await this.page.waitForLoadState();

    // Wait for the Skip button
    await this.page.waitForTimeout(8000);
  }

  async skipButtonIfPresent() {
    const skipButton = this.page.locator('text="Skip for now"');
    if (await skipButton.count() > 0 && await skipButton.isEnabled()) {
      await skipButton.click();
      console.log('Skip for now button clicked');
    } else {
      console.log('Skip for now button not present or not enabled');
    }
  }

  async closePendoPopupIfPresent() {
    const pendoPopup = this.page.locator('//div[@id="pendo-base"]//button[@aria-label="Close"]');
    if (await pendoPopup.count() > 0 && await pendoPopup.isEnabled()) {
      await pendoPopup.click();
      console.log('Pendo popup closed');
    } else {
      console.log('Pendo popup not present or not enabled');
    }
  }

  async selectOrganizationIfNecessary() {
    const rocketLocator = this.page.locator('//img[@alt="Rocket"]/ancestor::div[2]/preceding-sibling::div[1]//span');
    if (await rocketLocator.count() > 0) {
      let orgNameLocator = this.page.locator('//img[@alt="Rocket"]/ancestor::div[2]/preceding-sibling::div[1]//span');
      let orgNameNavbar = await orgNameLocator.textContent();

      if (orgNameNavbar === 'spendflo') {
        await this.page.locator("(//span[text()='spendflo'])[1]/ancestor::button").click();
        await this.page.locator("//input[@name='orgsearch']").fill('SpendfloOne');
        await this.page.locator("//button/p[text()='SpendfloOne']").click();
        await this.page.waitForTimeout(3000);
      }

      orgNameLocator = this.page.locator('//img[@alt="Rocket"]/ancestor::div[2]/preceding-sibling::div[1]//span');
      orgNameNavbar = await orgNameLocator.textContent();

      if (orgNameNavbar !== 'SpendfloOne') {
        process.exit(0);
      }
    }
  }

  async isOnHomePage(): Promise<boolean> {
    return this.page.url() === 'https://app.spendflo.com/';
  }
}
