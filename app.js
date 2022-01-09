const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.PORT || 3000;

const { getData } = require("./scraper");

let cache = null;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    `
    <h1>Welcome to the GTAO Discount API!</h1>

    <p>You can consume the service at <a href='/discounts'>/discounts</a>.</p>

    <p>Discounts are refreshed at 9AM GMT. </p>
  `
  );
});

app.get("/discounts", async (req, res) => {
  if (cache) {
    let week = cache.week;

    let [weekStart, weekEnd] = week.split(" - ");
    let updates = new Date(weekEnd);

    // console.log(updates.getTime());
    // console.log(Date.now());

    // let test = new Date("January 8, 2022 22:50:00");

    // updates: 10AM GMT every Thursday
    // if the date is bigger than the week end date, refresh the data
    if (updates.getTime() <= Date.now()) {
      console.log("Refreshing data");

      let data = await getData();
      cache = data;
      res.send(data);
    } else {
      console.log("Cache hit");
      res.send(cache);
    }
  } else {
    let data = await getData();
    cache = data;
    res.send(data);
  }
});

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
