import { ICustomWorld } from "../support/custom-world";
import { Given, Then, When } from "@cucumber/cucumber";
import { LoginPage } from "../../pages/login.page";
import { expect } from "@playwright/test";

let loginPage: LoginPage;
When("Je clique sur le bouton login", async function (this: ICustomWorld) {
  await loginPage.clickLoginButton();
});

When(
  "Je saisis {string} dans le champ Nom d utilisateur",
  async function (this: ICustomWorld, s: string) {
    await loginPage.saisirUserName(s);
  },
);

When(
  "Je saisis {string} dans le champ Mot de passe",
  async function (this: ICustomWorld, s: string) {
    await loginPage.saisirPassword(s);
  },
);

Given(
  "Je visite la page de connexion {string}",
  async function (this: ICustomWorld, s: string) {
    // Write code here that turns the phrase above into concrete actions
    this.page?.goto(s);
    loginPage = new LoginPage(this.page!);
  },
);

Then(
  "Je suis redirige vers la page d accueil",
  async function (this: ICustomWorld) {
    expect(await this.page?.locator(".colMS")).toBeTruthy();
  },
);

Then("Un message d erreur s affiche", async function (this: ICustomWorld) {
  // Write code here that turns the phrase above into concrete actions
  expect(await loginPage.elements.errorMessage()).toBeTruthy();
});
