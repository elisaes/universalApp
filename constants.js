const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE:"DELETE"
};

const APP_URL = (id = undefined, baseURL = undefined) => {
  let domain = "api.nexmo.com"
  if (baseURL) {
    domain = baseURL
  }
  return {
    createAppUrl: `https://${domain}/v2/applications`,
    updateAppUrl: `https://${domain}/v2/applications/${id}`,
    createUserUrl: `https://${domain}/v0.1/users`,
    createConversationUrl: `https://${domain}/v0.1/conversations`,
    getUsersUrl: `https://${domain}/v0.2/users`,
    listConversationsUrl:`https://${domain}/v0.2/conversations`,
    listUsersUrl: `https://${domain}/v0.2/users`,
    deleteUserUrl:`https://${domain}/v0.1/users/${id}`,
    joinConversationUrl: `https://${domain}/v0.1/conversations/${id}/members`,
  };
};

module.exports = {
  HTTP_METHODS,
  APP_URL,
};
