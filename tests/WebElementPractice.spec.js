const {test, expect} = require('@playwright/test')

test('Interact elements on Practice Page',async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    //radio button
    const radioBtn1 = page.locator('[value="radio1"]');
    const radioBtn2 = page.locator('[value="radio2"]');
    await radioBtn1.click();
    await expect(radioBtn1).toBeChecked();
    await radioBtn2.check();
    const expectBool = await radioBtn2.isChecked();
    expect(expectBool).toBeTruthy();
    //auto-complete combobox
    const countryToSelect = 'India'
    const autoCompComboBx = page.locator('input#autocomplete');
    const countryList = page.locator('ul.ui-autocomplete li');
    await autoCompComboBx.pressSequentially(countryToSelect, {delay: 100});
    await countryList.first().waitFor();
    const countryCount = await countryList.count();
    for(var i = 0;i<=countryCount;i++){
        if(await countryList.nth(i).textContent() === countryToSelect){
            await countryList.nth(i).click();
            break;
        }
    }
    expect(await autoCompComboBx.inputValue()).toBe(countryToSelect)
    //dropdown
    const dropDown = await page.locator('select#dropdown-class-example');
    await dropDown.selectOption('Option1');
    expect(await dropDown.inputValue()).toBe('option1');
    await dropDown.selectOption('Option2');
    const drpDnVal = await dropDown.inputValue();
    expect(await dropDown.inputValue()).toBe(('Option2').toLowerCase());
    //Checkbox
    const chkBxOpn1 = await page.locator('input#checkBoxOption1');
    const chkBxOpn2 = await page.locator('input#checkBoxOption2');
    await chkBxOpn1.check();
    await chkBxOpn2.click();
    expect(await chkBxOpn1.isChecked()).toBeTruthy();
    await expect(chkBxOpn2).toBeChecked();
    //switch window
    const openWindBtn = await page.locator('button#openwindow');
    const [newWinPage] = await Promise.all([
        context.waitForEvent('page'),
        openWindBtn.click()
    ])
    await newWinPage.waitForLoadState('networkidle');
    expect(await newWinPage.locator('div.logo a[href="https://www.qaclickacademy.com"]')).toBeVisible();
    //await newWinPage.close();
    //switch tab
    const openTabLink = await page.locator('fieldset a#opentab');
    const [newTabPage] = await Promise.all([
        context.waitForEvent('page'),
        openTabLink.click()
    ])
    await newTabPage.waitForLoadState('networkidle');
    expect(await newTabPage.locator('div.logo a[href="https://www.qaclickacademy.com"]')).toBeVisible();
    //await newTabPage.close();
    //Alert handling
    const nameEditBox = await page.locator('input#name');
    const btnAlert = await page.locator('input#alertbtn');
    await nameEditBox.fill('Tester');
    await btnAlert.click();
    //to be continued
})

test('Handle Date selection',async({page})=>{
    const dateToPick = '18';
    const monthNumberToPick = '6';
    const yearToPick = '2031';
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    const datePickerIcon = page.locator('svg.react-date-picker__calendar-button__icon');
    const calendarFull = page.locator('div.react-calendar');
    const calendarNavigationLabel = page.locator('button.react-calendar__navigation__label');
    const calendarDecadeView = page.locator('button.react-calendar__decade-view__years__year');
    const calNavNextBtn = page.locator('button.react-calendar__navigation__next-button');
    const calMonths = page.locator('button.react-calendar__year-view__months__month');
    const calDays = page.locator('button.react-calendar__month-view__days__day');
    const selectedFullDate = page.locator('input.react-date-picker__inputGroup__input');

    await datePickerIcon.click();
    await calendarFull.waitFor();
    await calendarNavigationLabel.click();
    await calendarNavigationLabel.click();
    var yearFoundBool = false;
    while(!yearFoundBool){
        var decadeYears = await calendarDecadeView.allInnerTexts();
        if((await decadeYears).includes(yearToPick)){
            yearFoundBool = true;
            for(var i=0;i<=10;i++){
                if(await calendarDecadeView.nth(i).textContent() === yearToPick){
                    calendarDecadeView.nth(i).click();
                    break;
                }
            }
        }
        else{
            await calNavNextBtn.click();
        }
    }

    await calMonths.nth(Number(monthNumberToPick)-1).click();
    const dateCount = await calDays.count();
    for(var i=0;i<dateCount;i++){
        if(await calDays.nth(i).textContent() === dateToPick){
            calDays.nth(i).click();
            break;
        }
    }
    await calendarFull.waitFor({state: 'hidden'});
    expect(await selectedFullDate.nth(0).inputValue()).toBe(monthNumberToPick);
    expect(await selectedFullDate.nth(1).getAttribute('value')).toBe(dateToPick);
    expect(await selectedFullDate.nth(2).getAttribute('value')).toBe(yearToPick);
})