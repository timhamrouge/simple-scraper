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

    //async function to return all title properties in an array
    const titles = async (el) => {
        return Promise.all(el.map((item) => item.getProperty('title')))
    }

    //async function to return all the string values of the titles
    const titlesTxt = async (titles) => {
        return Promise.all(titles.map((title) => title.jsonValue()))
    }

    // await the above async calls, finally logging the array of job titles
    await titles(el)
    .then(titlesArr => {
        return titlesTxt(titlesArr);
    })
    .then(data => {
        console.log('This is an Array of Job Titles', data)
    })

    //finally, close the browser
    browser.close();
}


/* pass in a url with a search for development jobs within 5 miles of Manchester. Ordered by most recent. */
scrapeJobTitles(`https://www.reed.co.uk/jobs/software-developer-jobs-in-manchester?sortby=DisplayDate&proximity=5`);