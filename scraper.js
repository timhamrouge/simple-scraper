const puppeteer = require('puppeteer');

async function scrapeJobTitles(url) {
    // launch the headless browser
    const browser = await puppeteer.launch();
    // open a new page in the browser
    const page = await browser.newPage();
    // naviagte to the provided url
    await page.goto(url);

    /* find all elements on the page with the class that corresponds to
    the title using the xPath*/ 
    const el = await page.$x('//*[@class="gtmJobTitleClickResponsive"]');

}


/* pass in a url with a search for development jobs within 5 miles of Manchester. Ordered by most recent. */
scrapeJobTitles(`https://www.reed.co.uk/jobs/software-developer-jobs-in-manchester?sortby=DisplayDate&proximity=5`);