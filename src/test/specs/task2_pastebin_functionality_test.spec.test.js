import {pages} from "../../po/page/index.js";


describe('PasteBin create a new paste functionality tests from task 2', () => {
    let pastePageUrl;
    let textToCode;

    before(async ()=>{
        textToCode = "git config --global user.name  \"New Sheriff in Town\"\n" +
            "\n" +
            "git reset $(git commit-tree HEAD^{tree} -m \"Legacy code\")\n" +
            "\n" +
            "git push origin master --force";

        await pages("home").open();
        await pages("home").postformText.writeInTextArea(textToCode);
        await pages("home").scrollDown();
        await pages("home").postformLeft.setSyntaxHighlighting("bash");
        await pages("home").postformLeft.setPasteExpiration("10minutes");
        await pages("home").postformLeft.setPasteNameTitle("how to gain dominance among developers");
        await pages("home").postformLeft.clickCreateNewPaste();
        await pages("pastePage").waitToOpenPage();
        pastePageUrl = await browser.getUrl();
        await console.log(pastePageUrl);
    })

    it('should open PasteBin page', async () => {
        await pages("home").open();
        await expect(browser).toHaveTitle("Pastebin.com - #1 paste tool since 2002!");
    });

    it('should have the correct title for the paste', async () => {
        await pages("pastePage",pastePageUrl).open();
        await expect(browser).toHaveTitle("how to gain dominance among developers - Pastebin.com");
    });

    it('should have the correct syntax set in suspended for bash', async () => {
        await pages("pastePage",pastePageUrl).open();
        const syntax = await pages("pastePage").codeSection.syntaxText();
        await expect(syntax).toEqual("Bash");
    });

    it('should have the correct content in the code section', async () => {
        await pages("pastePage",pastePageUrl).open();
        const codeText = await pages("pastePage").codeSection.codeText();
        await expect(codeText).toEqual(textToCode);
    });

});