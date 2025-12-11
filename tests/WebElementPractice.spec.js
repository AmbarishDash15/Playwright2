const {test, expect} = require('@playwright/test')

test.only('Interact elements on Practice Page',async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    const practicePageHeader = page.locator('h1:has-text("Practice Page")');
    //radio button
    const radioBtn1 = page.locator('[value="radio1"]');
    const radioBtn2 = page.locator('[value="radio2"]');
    await radioBtn1.click();
    await expect(radioBtn1).toBeChecked();
    await radioBtn2.check();
    const expectBool = await radioBtn2.isChecked();
    expect(expectBool).toBeTruthy();
    //auto-complete combobox
    const autoCompComboBx = page.locator('input#autocomplete');
    const countryList = page.locator('ul.ui-autocomplete li');
    await autoCompComboBx.pressSequentially('India');
    await countryList.first().waitFor();
    const countryCount = await countryList.count();
    for(var i = 0;i<=countryCount;i++){
        if(await countryList.nth(i).textContent() === 'India'){
            await countryList.nth(i).click();
            break;
        }
    }
    
})