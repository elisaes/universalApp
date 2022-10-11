const constants = require("../constants");

class CapabilityBuilder {
  static voice(webHookUrl) {
    return {
      webhooks: {
        answer_url: {
          address: `${webHookUrl}/answer`,
          http_method: constants.HTTP_METHODS.GET,
        },
        event_url: {
          address: `${webHookUrl}/event`,
          http_method: constants.HTTP_METHODS.POST,
        },
      },
    };
  }

  static rtc(webHookUrl) {
    return {
      webhooks: {
        event_url: {
          address: `${webHookUrl}/event`,
          http_method: constants.HTTP_METHODS.POST,
        },
      },
    };
  }
  static messages(webHookUrl) {
    return {
      webhooks: {
        inbound_url: {
          address: `${webHookUrl}/inbound`,
          http_method: constants.HTTP_METHODS.POST,
        },
        status_url: {
          address: `${webHookUrl}/status`,
          http_method: constants.HTTP_METHODS.POST,
        },
      },
    };
  }
}

const model = (
  name,
  capabilitiesArr = undefined,
  webhookUrl,
  apiKey,
  apiSecret
) => {
  const data = {
    headers: {
      Authorization: `Basic ${Buffer.from(apiKey + ":" + apiSecret).toString(
        "base64"
      )}`,
    },
    body: {
      name,
      capabilities: {},
    },
  };

  if (capabilitiesArr) {
    capabilitiesArr.forEach((cap) => {
      data.body.capabilities[cap.toLowerCase()] =
        CapabilityBuilder[cap](webhookUrl);
    });
  }

  return data;
};

module.exports = model;
