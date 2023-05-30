const npe = process.env.NPE_NAME

const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE:"DELETE"
};

const APP_URL = (id = undefined, baseURL = undefined) => {
 let domain = "api.nexmo.com"
 
 // let domain = "api-ap.vonage.com"
  //let domain = "api-eu.dev.v1.vonagenetworks.net" for dev
  let createAppDomain = `https://${domain}/v2/applications`
  console.log("HERERERE")
  console.log(npe)
  if (npe) {
    console.log("ELISA2")
    domain = `${npe}-api.npe.nexmo.io`
   // createAppDomain = `http://core1.${npe}.npe:8280/beta/account/applications`
  }
  console.log("===========================")
  console.log(domain)
  return {
    createAppUrl: createAppDomain,
    updateAppUrl: `https://${domain}/v2/applications/${id}`,
    createUserUrl: `https://${domain}/v0.2/users`,
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
