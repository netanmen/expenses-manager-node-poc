const { CompanyTypes, createScraper } = require('israeli-bank-scrapers');

const creds = {
    "username": "your-username",
    "password": "your-pass"
};

(async function() {
    try {
      // read documentation below for available options
      const options = {
        companyId: CompanyTypes.max, 
        startDate: new Date('2020-05-01'),
        combineInstallments: false,
        showBrowser: false
      };
  
      // read documentation below for information about credentials
      const credentials = {
        username: creds.username,
        password: creds.password
      };
  
      const scraper = createScraper(options);
      const scrapeResult = await scraper.scrape(credentials);
  
      if (scrapeResult.success) {
        const account = scrapeResult.accounts[0];
        
        account
        .txns
        .slice(-10)
        .forEach((transaction) => {
          console.log(`
          Transaction details: 
          date=${transaction.date}
          category=${transaction.category}
          type=${transaction.type}
          chargedAmount=${transaction.chargedAmount}
          description=${transaction.description}
          `);
        });
      }
      else {
        throw new Error(scrapeResult.errorType);
      }
    } catch(e) {
      console.error(`scraping failed for the following reason: ${e.message}`);
    }
  })();