const fs = require("fs");

const scraperObject = {
  url: "https://socialclub.rockstargames.com/events?gameId=GTAV",
  async scraper(browser) {
    let page = await browser.newPage();
    await page.goto(this.url);

    // Wait for the required DOM to be rendered
    await page.waitForSelector("#event-list");

    // Getting the links to discounts and grabing the first
    let urls = await page.$$eval(
      'a[aria-label="Grand Theft Auto Online event: Discounts"]',
      (links) => {
        links = links.map((el) => el.href);
        return links;
      }
    );

    await page.goto(urls[0]); // Always go to the latest

    let date = new Date();

    let week = await page.$$eval(".date", (arr) => {
      return arr[0].innerText;
    });

    let events = await page.$$eval(".cm-content p b:only-child", (arr) => {
      // Text parse
      arr = arr.map((el) => el.innerText);

      // Keeping titles only
      // arr = arr.filter((el) => el.toUpperCase() === el);

      // We are not interested in this
      let exclusions = ["RETURNING MODES", "TEE"];
      exclusions.forEach((exclusion) => {
        arr = arr.filter((el) => !el.includes(exclusion));
      });

      // Capitalizing
      arr = arr.map((el) =>
        el
          .split(" ")
          .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
          .join(" ")
      );

      // Removing discounts and prime benefits.
      arr.splice(-2);
      return arr;
    });

    let discounts = await page.$$eval(".cm-content ul > li", (arr) => {
      // Text parse
      arr = arr.map((el) => el.innerText);

      return arr;
    });

    // let [benefits] = await page.$x(
    //   "//p[contains(text(), 'GTA Online players who successfully')]",
    //   (result) => {
    //     result = result.map((el) => el.innerText);
    //     return result;
    //   }
    // );

    // fs.writeFileSync(
    //   "./discounts.json",
    //   JSON.stringify({ week, events, discounts, date })
    // );

    // console.log(date);
    // console.log(events);
    // console.log(discounts);
    // console.log(benefits);

    await page.close();

    return { week, events, discounts, date };
  },
};

module.exports = scraperObject;
