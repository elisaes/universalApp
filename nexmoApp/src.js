const callingNexmo = require("../utils/callingNexmo");
const fs = require("fs");
const constants = require("../constants");
const tunnelUrl = require("../tunnelUrl.json");
const model = require("./model");
const savedData = require("../config.json");

const sanitizeInput = (capabilitiesOptions) => {
  const capArr = [];
  const possibleCapabilies = ["voice", "rtc", "messages"];

  capabilitiesOptions
    .replace(/ /g, "")
    .split(",")
    .forEach((capability) => {
      possibleCapabilies.forEach((possibleCap) => {
        if (capability === possibleCap) {
          capArr.push(possibleCap);
        }
      });
    });
  return [...new Set(capArr)];
};

const createNewApplication = async (body) => {
  try {
    let capArr;
    if (!body.capabilitiesOptions) {
      capArr = ["voice", "rtc", "messages"]
    } else {
      capArr = sanitizeInput(body.capabilitiesOptions);
    }
    const nexmoData = model(
      body.name,
      capArr,
      tunnelUrl,
      process.env.APIKEY,
      process.env.APISECRET
    );
    console.log(nexmoData, 'nexmoData')

    const res = await callingNexmo(
      nexmoData.headers,
      nexmoData.body,
      constants.HTTP_METHODS.POST,
      constants.APP_URL().createAppUrl
    );
    const toWrite = {
      id: res.data.id,
      name: res.data.name,
      capabilities: res.data.capabilities,
    };
    if ("199" < res.status && res.status < "300") {
      fs.writeFileSync("config.json", JSON.stringify(toWrite));
    }

    return res;
  } catch (e) {
    console.log(e.response);
    throw e;
  }
};

const updateApplication = async (body, webhookUrl = tunnelUrl) => {
  try {
    let applicationId;
    if (body.capabilitiesOptions.length == 0 && savedData) {
      capabilitiesArr = Object.keys(savedData.capabilities);
      console.log("here1");
      nexmoData = model(
        savedData.name,
        capabilitiesArr,
        webhookUrl,
        body.apiKey,
        body.apiSecret
      );

      nexmoData.body.capabilities;
      nexmoData.body.id = savedData.id;
      applicationId = savedData.id;
      console.log(nexmoData, "here 1");
    } else if (
      body.capabilitiesOptions.length > 0 &&
      savedData &&
      savedData.name == body.name
    ) {
      console.log("here2");

      const capArr = sanitizeInput(body.capabilitiesOptions);
      nexmoData = model(
        body.name,
        capArr,
        webhookUrl,
        body.apiKey,
        body.apiSecret
      );
      nexmoData.body.id = savedData.id;
      applicationId = savedData.id;
      console.log(nexmoData, "here 2");
    } else if (!savedData && body.applicationId) {
      const capArr = sanitizeInput(body.capabilitiesOptions);
      nexmoData = model(
        body.name,
        capArr,
        webhookUrl,
        body.apiKey,
        body.apiSecret
      );
      nexmoData.body.id = body.applicationId;
      applicationId = body.applicationId;
    } else {
      console.log("here3");
      const result = {
        status: 404,
        data: "no previous data found, please input application id, capabilities, apiKey, apiSecret and name of the application",
      };

      return result;
    }

    console.log(nexmoData, "nexmoData at the end");

    const res = await callingNexmo(
      nexmoData.headers,
      nexmoData.body,
      constants.HTTP_METHODS.PUT,
      constants.APP_URL(applicationId).updateAppUrl
    );
    const toWrite = {
      id: res.data.id,
      name: res.data.name,
      capabilities: res.data.capabilities,
    };
    if ("199" < res.status && res.status < "300") {
      fs.writeFileSync("config.json", JSON.stringify(toWrite));
    }

    return res;
  } catch (e) {
    console.log(e.response);
    throw e;
  }
};

module.exports = { createNewApplication, updateApplication };
