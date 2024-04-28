import { BasePage } from "./BasePage";

export class HomeAccuweather extends BasePage{

private readonly searchInput;
private readonly searchResult;

constructor(page){
    super(page);
    this.searchInput = ('//input[@class="search-input"]');
    this.searchResult = ("//p[text()[contains(.,'Rosario, Santa Fe, AR')]]/parent::div");
}

async searchLocation(location:string) {
    this.fillInput(this.searchInput, location);
    this.clickElement(this.searchResult);
}


}