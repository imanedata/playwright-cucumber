import { Page } from "playwright";
class LoginPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  elements = {
    userName: () => this.page.locator('input[name="username"]'),
    password: () => this.page.locator('input[name="password"]'),
    loginButton: () => this.page.locator('input[type="submit"]'),
    errorMessage: () => this.page.locator(".errornote"),
  };

  async saisirUserName(userName: string) {
    await this.elements.userName().fill(userName);
  }

  async saisirPassword(password: string) {
    await this.elements.password().fill(password);
  }
  async clickLoginButton() {
    await this.elements.loginButton().click();
  }
  async getErrorMessage() {
    return await this.elements.errorMessage();
  }
}

export { LoginPage };
