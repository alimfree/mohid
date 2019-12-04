var express = require('express');
var router = express.Router();
const getResults = require('../prayerScrapper');

/* GET home page. */
router.get("/", async function(req, res, next) {
  //const result = await getResults();
  title = "Prayer Schedule"
  result = await getResults();
  console.log("restu");
  console.log(result);
  res.render("index");
});

module.exports = router;
