import { Locator, Page, expect } from "@playwright/test";
export class BasePage{

    private readonly page;
    constructor(page){
        this.page = page;
    }

    async fillInput(locator: string,text: any){
        await this.page.fill(locator, text);
    }
   
    async goto(url: string){
        await this.page.goto(url);
    }

    async clickElement(locator: string) {
        await this.page.click(locator);
      }
    
    async waitForNavigation() {
        await this.page.waitForNavigation();
    }

    async findElement(locator: string): Promise<Locator> {
        const element = await this.page.locator(locator);
        return element;
    }

    async validateElementIsVisible(locator: string): Promise<boolean> {
        try {
            await this.page.waitForSelector(locator, { timeout: 5000 }); // Timeout after 5 seconds
            const element = await this.page.locator(locator);
            const isVisible = await element.isVisible();
            if (isVisible){
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Element not visible within timeout period");
            return false;
        }
    }
    

}