const axios = require("axios");

const callingNexmo = async (headers, data, method, url) => {

  return await axios({
    method,
    url,
    data,
    headers,
  });
};

module.exports = callingNexmo;
