var express = require("express");

var router = express.Router();

// Import the model (donut.js) to use its database functions.
var donut = require("../models/donut.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  donut.selectAll(function(data) {
    var hbsObject = {
      donuts: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  donut.insertOne(
    ["name", "eaten"],[req.body.name, req.body.eaten], function() {
    res.redirect("/");
  });
});

router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  donut.updateOne({
    eaten: req.body.eaten
  }, condition, function() {
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;