const axios = require("axios");


const callingNexmo = async (headers, data, method, url) => {
  return await axios({
    method,
    url,
    data: data,
    headers,
  });
};

module.exports = callingNexmo;
