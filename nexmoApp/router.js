const router = require("express").Router();
const { createNewApplication, updateApplication } = require("./src");
const fs = require("fs");
const { generateToken } = require("../utils/token");
const application = require("../application.json");
const appUrl = require("../constants");
const callingNexmo = require("../utils/callingNexmo");
let NPE;
let baseURL;

//APPLICATION
router.post("/create", async (req, res) => {
  try {
    const { status, data } = await createNewApplication(req.body);
    fs.writeFileSync("application.json", JSON.stringify(data));
    if (NPE) {
      baseURL = `${process.env.REACT_APP_NPE_NAME}-api.npe.nexmo.io`
    }
    res.status(status).send(data);
  } catch (e) {
    console.log(e.response);
    throw e;
  }
});

router.post("/update", async (req, res) => {
  try {
    console.log("here update");
    const { status, data } = await updateApplication(req.body);
    console.log(status, data, "status,data");
    res.status(status).send(data);
  } catch (e) {
    console.log(e.response);
    throw e;
  }
});

router.get("/", async (req, res) => {
  const url = await tunnelUrl();
  console.log(url, "url");
  const data = model("name", "rtc", "test.com");
  console.log(data, "data object");
  res.send(data);
});

//USER

router.post("/user/create", async (req, res, next) => {
  try {
    let token;
    if (req.body.private_key) {
      token = generateToken(req.body.privateKey, req.body.applicationId)
    } else {
      token = generateToken(application.keys.private_key, application.id)
    }
    const nexmoData = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        name: req.body.name,
        display_name: req.body.display_name,
        image_url: req.body.image_url
      }
    }
    const { status, data } = await callingNexmo(nexmoData.headers, nexmoData.body, appUrl.HTTP_METHODS.POST, appUrl.APP_URL().createUserUrl)
    res.status(status).json(data)
  } catch (e) {
    console.log(e)
    throw e
  }
})

router.post("/user/login", async (req, res, next) => {
  let token;
  let userToken
  if (req.body.private_key) {
    token = generateToken(req.body.privateKey, req.body.applicationId)
  } else {
    token = generateToken(application.keys.private_key, application.id)
  }
  const nexmoData = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: undefined
  }
  const { data } = await callingNexmo(nexmoData.headers, nexmoData.body, appUrl.HTTP_METHODS.GET, appUrl.APP_URL().getUsersUrl)

  const users = data._embedded.data.users
  console.log(users, "users")
  const currentUser = users.filter(user => {
    return user.name === req.body.name
  })
  let payload;
  if (!currentUser || currentUser.length === 0) {
    payload = 'no user found, please create user'
  } else {
    if (req.body.private_key) {
      userToken = generateToken(req.body.privateKey, req.body.applicationId, req.body.name)
    } else {
      userToken = generateToken(application.keys.private_key, application.id, req.body.name)
    }
    payload = {
      currentUser,
      token: userToken
    }
    console.log(currentUser, 'currentUser**************************')
    console.log(payload, 'pauload@')
  }
  res.send(payload)
})


router.get("/users/list", async (req, res, next) => {

  try {
    let token;
    if (req.body.private_key) {
      token = generateToken(req.body.privateKey, req.body.applicationId)
    } else {
      token = generateToken(application.keys.private_key, application.id)
    }
    const nexmoData = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: undefined
    }
    const { status, data } = await callingNexmo(nexmoData.headers, nexmoData.body, appUrl.HTTP_METHODS.GET, appUrl.APP_URL().listUsersUrl)
    res.status(status).json(data)
  } catch (e) {
    console.log(e)
    throw e
  }
})

router.delete("/user/delete/:userid", async (req, res, next) => {
  try {
    let token;
    if (req.body.private_key) {
      token = generateToken(req.body.privateKey, req.body.applicationId)
    } else {
      token = generateToken(application.keys.private_key, application.id)
    }
    const nexmoData = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: undefined
    }
    const { status, data } = await callingNexmo(nexmoData.headers, nexmoData.body, appUrl.HTTP_METHODS.DELETE, appUrl.APP_URL(id = req.params.userid).deleteUserUrl)
    res.status(status).json(data)
  } catch (e) {
    console.log(e)
    throw e
  }

})

//CONVERSATION

router.post("/conversation/create", async (req, res, next) => {
  try {
    let token;
    if (req.body.private_key) {
      token = generateToken(req.body.privateKey, req.body.applicationId)
    } else {
      token = generateToken(application.keys.private_key, application.id)
    }
    const nexmoData = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        name: req.body.name,
        display_name: req.body.display_name,
        image_url: req.body.image_url,
        properties: {
          ttl: req.body.ttl
        }
      }
    }
    const { status, data } = await callingNexmo(nexmoData.headers, nexmoData.body, appUrl.HTTP_METHODS.POST, appUrl.APP_URL().createConversationUrl)
    res.status(status).json(data)
  } catch (e) {
    console.log(e)
    throw e
  }
})

router.get("/conversations/list", async (req, res, next) => {
  let token;
  if (req.body.private_key) {
    token = generateToken(req.body.privateKey, req.body.applicationId)
  } else {
    token = generateToken(application.keys.private_key, application.id)
  }
  const nexmoData = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: undefined
  }

  const { status, data } = await callingNexmo(nexmoData.headers, nexmoData.body, appUrl.HTTP_METHODS.GET, appUrl.APP_URL().listConversationsUrl)
  console.log(data, "data")
  res.status(status).json(data)

})
router.post("/join/conversation/:conversationid", async (req, res, next) => {

  let token;
  if (req.body.private_key) {
    token = generateToken(req.body.privateKey, req.body.applicationId)
  } else {
    token = generateToken(application.keys.private_key, application.id)
  }
  const nexmoData = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      action: 'join',
      user_id: req.body.id,
      channel: {
        type: 'app'
      }
    }
  }
  console.log(appUrl.APP_URL(id = req.params.conversationid).joinConversationUrl, "HERE!")

  const { status, data } = await callingNexmo(nexmoData.headers, nexmoData.body, appUrl.HTTP_METHODS.POST, appUrl.APP_URL(id = req.params.conversationid).joinConversationUrl)
  console.log(data, "data")
  res.status(status).json(data)
})

router.get("/token", async (req, res, next) => {

  token = generateToken(application.keys.private_key, application.id)

  res.json(token)
})
router.get("/token/:user", async (req, res, next) => {

  token = generateToken(application.keys.private_key, application.id, req.params.user)

  res.json(token)
})

module.exports = router;
