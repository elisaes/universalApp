const axios = require("axios");


const callingNexmo = async (headers, data, method, url) => {
  const npe = null
  if (npe) {
    data = {
      "api_key": "qa_1999e8bbAUTO",
      "api_secret": "qa_1999e8bbAUTO",
      "name": "test_nvm",
      "type": "voice",
      "answer_url": "https://static.dev.nexmoinc.net/svc/ncco/ncco/auto_ncco_connect.php?destination=441234818238",
      "event_url": "https://static.dev.nexmoinc.net/svc/ncco/ncco/auto_ncco_connect.php?destination=441234818238",
      "security": {
        "token-expiration-time-millisecs": "300000",
        "request-signing": {
          "secret": "123456",
          "signature-method": "hmac-md5",
          "mandatory-signature": "true"
        },
        "auth": {
          "public-key": "123456",
          "signature-method": "hmac-sha256"
        }
      }
    }
    headers = {
      Authorization: `Basic ${Buffer.from("qa_1999e8bbAUTO" + ":" + "qa_1999e8bbAUTO").toString(
        "base64"
      )}`
    }
  }
  return await axios({
    method,
    url,
    data,
    headers,
  });
};

module.exports = callingNexmo;
