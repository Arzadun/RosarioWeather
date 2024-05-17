import { BasePage } from "./BasePage";
import credentials from '../../credentials.json'
import { expect } from "@playwright/test";


export class Login extends BasePage{

    private readonly loginButton: string;
    private readonly signInButton: string;
    private readonly inputUsername: string;
    private readonly inputPassword: string;
    private readonly nextButton: string;
    private readonly sidePostButton: string;
    private readonly inputCheckEmail: string;
    private readonly email: string;
    private readonly inputCheckCode: string;

    private username = process.env.USERNAME;
    private password = process.env.PASSWORD;


constructor(page){
    super(page);
    this.loginButton = ('//span[text()[contains(.,\'Log in\')]]/ancestor::div[1]');
    this.inputUsername = ('//input[@class="r-30o5oe r-1dz5y72 r-13qz1uu r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-t60dpp r-fdjqy7"]') //"#login-username"
    this.inputPassword = ('//input[@type=\'password\']') 
    this.signInButton = ('//span[text()[contains(.,\'Sign in\')]]/ancestor::div[1]') 
    this.nextButton = ('//span[text()[contains(.,\'Next\')]]/ancestor::div[1]') 
    this.sidePostButton = ("//a[@data-testid='SideNav_NewTweet_Button']");
    this.inputCheckEmail =('//input[@type=\'email\']')
    this.email = "weatherrosario@mailinator.com";
    this.inputCheckCode =("//input[@data-testid='ocfEnterTextTextInput']")
    
}
/*
async searchLocation(location:string) {
    this.fillInput(this.searchInput, location);
    this.clickElement(this.searchResult);
}

async openLoginModal(){
    this.clickElement(this.loginButton);
} */

async loginIntoAccount(){
    
    await this.clickElement(this.signInButton);
    await this.fillInput(this.inputUsername, this.username);
    await this.clickElement(this.nextButton);
    await this.fillInput(this.inputPassword, this.password);
    await this.clickElement(this.loginButton);
}

async validateUserIsLoggedIn(){
    await this.validateElementIsVisible(this.sidePostButton);
}

async bypassCheck(){
    if (await this.validateElementIsVisible(this.inputCheckEmail)) {
        await this.fillInput(this.inputCheckEmail, this.email);
    } else if (await this.validateElementIsVisible(this.inputCheckCode)) {
        await this.fillInput(this.inputCheckCode, this.email);
    }
    await this.clickElement(this.nextButton);
}

async securityCheckIsDisplayed(): Promise<boolean> {
    if (await this.validateElementIsVisible(this.inputCheckEmail) || await this.validateElementIsVisible(this.inputCheckCode)) {
        return true;
    }
    return false;
}

}



