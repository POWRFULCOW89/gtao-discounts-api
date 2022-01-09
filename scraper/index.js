const browserObject = require("./browser");
const scraperController = require("./pageController");

//Start the browser and create a browser instance
// Pass the browser instance to the scraper controller

const getData = async () => {
  let browserInstance = browserObject.startBrowser();
  let data = await scraperController(browserInstance);
  return data;
};

module.exports = { getData };
