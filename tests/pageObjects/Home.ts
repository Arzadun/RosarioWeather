import { BasePage } from "./BasePage";

export class Home extends BasePage{

    private readonly postButton: string;
    private readonly inputPost: string;
    private readonly confirmationToast: string;
    private readonly kebabMenu: string;
    private readonly deleteButtonMenu: string;
    private readonly deleteButtonConfirmation: string;
    private readonly deletedToast: string;
    
    constructor(page){
         super(page);
         this.postButton = ('//div[@data-testid=\'tweetButtonInline\']');
         this.inputPost = ('//div[@class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"]');
         this.confirmationToast = ("//*[@data-testid='toast']");
         this.kebabMenu = ('(//span[text()="@rosario_weather"])/ancestor::div[8]//div[@aria-label="More"]');
         this.deleteButtonMenu = ('//span[text()[contains(.,\'Delete\')]]/ancestor::div[1]');
         this.deleteButtonConfirmation = ("//div[@data-testid='confirmationSheetConfirm']");
         this.deletedToast = ('//span[text()="Your post was deleted"]/ancestor::div[@role="alert"]');
    }
//div[@data-testid="caret"]
    /*
<div role="alert" class="css-175oi2r r-1awozwy r-l5o3uw r-18u37iz r-1wtj0ep r-xyw6el r-105ug2t r-yz1j6i r-1kihuf0 r-z2wwpe r-zd98yo" data-testid="toast" style="transition-property: opacity; transition-duration: 170ms; transition-timing-function: cubic-bezier(0, 0, 1, 1); opacity: 1;"><div dir="ltr" class="css-1rynq56 r-bcqeeo r-qvutc0 r-37j5jr r-a023e6 r-rjixqe r-16dba41 r-1wbh5a2 r-1e081e0" style="text-overflow: unset; color: rgb(255, 255, 255);"><span class="css-1qaijid r-bcqeeo r-qvutc0 r-poiln3" style="text-overflow: unset;">Your post was sent.</span></div><div aria-hidden="true" class="css-175oi2r r-18u37iz"><a href="/rosario_weather/status/1785136482820243725" dir="ltr" role="link" class="css-1rynq56 r-bcqeeo r-qvutc0 r-37j5jr r-a023e6 r-rjixqe r-b88u0q r-1kihuf0 r-1b7u577 r-3s2u2q r-1loqt21" style="text-overflow: unset; color: rgb(255, 255, 255);"><span class="css-1qaijid r-bcqeeo r-qvutc0 r-poiln3" style="text-overflow: unset;">View</span></a></div></div>
    */
    async createPost(text: string){
        await  this.fillInput(this.inputPost, text);
        await  this.clickElement(this.postButton);
    }

    async validatePostIsCreated(){
        await this.validateElementIsVisible(this.confirmationToast);
    }

    async deletePost(){
        await this.clickElement(this.kebabMenu);
        await this.clickElement(this.deleteButtonMenu);
        await this.clickElement(this.deleteButtonConfirmation);
    }

    async validatePostIsDeleted(){
        await this.validateElementIsVisible(this.deletedToast);
    }

}