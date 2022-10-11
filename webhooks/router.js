const router = require("express").Router();

router.get("/answer", (req, res) => {
  console.log('NCCO request:');
  console.log(`  - caller: ${req.query.from}`);
  console.log(`  - callee: ${req.query.to}`);
  console.log('---');
  var ncco = [{ "action": "talk", "text": "No destination user - hanging up" }];
  var username = "pepe";
  if (username) {
    ncco = [
      {
        "action": "talk",
        "text": "Connecting you to pepe" 
      },
      {
        "action": "connect",
        "endpoint": [
          {
            "type": "app",
            "user": "pepe"
          }
        ]
      }
    ]
  }
  res.json(ncco);
});

router.all("/event", (req, res) => {
  console.log('EVENT:');
  console.dir(req.body);
  console.log('---');
  res.sendStatus(200);
});



router.post("/inbound", (req, res) => {
  console.log(req.body);
  res.send({ status: 200 });
});

router.post("/status", (req, res) => {
  console.log(req.body);
  res.send({ status: 200 });
});

module.exports = router;
