const router = require("express").Router();
const tunnelUrl = require("../tunnelUrl.json");

router.get("/answer", (req, res) => {
  console.log('ANSWER')
  console.log(req.body)
  console.log('NCCO request:');
  console.log(`  - caller: ${req.query.from}`);
  console.log(`  - callee: ${req.query.to}`);
  console.log('---');
  let ncco = [{ "action": "talk", "text": "No destination user - hanging up" }];
  let username = "pepe"//req.query.to;
  console.log(tunnelUrl, "+++++++++++++++++++++++++++++")
  if (username) {
    ncco = [

      {
        "action": "talk",
        "text": "Connecting you to" + username
      },
      {
        "action": "connect",
        "endpoint": [
          {
            "type": "app",
            "user": "pepe"
          }
        ]

        // {
        //   "action": "record",
        //   "transcription":{
        //     "language": "en-US"
        //   }
        // "eventMethod": "POST",
        // "eventUrl": `${tunnelUrl}/recordings`,
      },
      // {
      //   "action": "record",
      //   "eventUrl": [`${tunnelUrl}/recordings`],
      //   "transcription": {
      //     "eventMethod": "POST",
      //     "eventUrl": [`${tunnelUrl}/transcription`],
      //     "language": "en-US"
      //   }
      // },
    ]
  }
  console.log("PRINT NCCO")
  console.log(JSON.stringify(ncco, null, "  "))
  res.json(ncco);
});

router.all("/event", (req, res) => {
  console.log('EVENT:');
  console.dir(req.body);
  console.log('---');
  res.sendStatus(200);
});



router.post("/inbound", (req, res) => {
  console.log('INBOUND WEBHOOK:');
  console.log(req.body);
  res.send({ status: 200 });
});

router.post("/status", (req, res) => {
  console.log('STATUS WEBHOOK:');
  console.log(req.body);
  res.send({ status: 200 });
});
router.post("/recordings", (req, res) => {
  console.log('RECORDINGS WEBHOOK:');
  console.log(req.body);
  res.send({ status: 200 });
})

router.post("/transcription", (req, res) => {
  console.log('TRANSCRIPTION WEBHOOK:');
  console.log(req.body);
  res.send({ status: 200 });
})

module.exports = router;
