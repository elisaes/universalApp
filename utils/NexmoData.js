const NexmoData = (name, url) => {
    return {
        data: {
            name,
            capabilities: {
                voice: {
                    webhooks: {
                        answer_url: {
                            address: `${url}/webhooks/answer`,
                            http_method: "GET",
                        },
                        event_url: {
                            address: `${url}/webhooks/event`,
                            http_method: "POST",
                        },
                    },
                },
            },
        },
        headers: {
            Authorization: `Basic ${Buffer.from(
                process.env.APIKEY + ":" + process.env.APISECRET
            ).toString("base64")}`,
        },
    };
};
module.exports = NexmoData