const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const ngrok = require('ngrok');
const cors = require("cors");
const config = null//require("./application.json");
const callingNexmo = require("./utils/callingNexmo");
const http_method = require("./constants");
const NexmoData = require("./utils/NexmoData")


dotenv.config();

//nexmoApplication
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", require("./nexmoApp/router")); //applications

//webhooks
app.use("/webhooks", require("./webhooks/router"));



const updateApplication = async (tunnelUrl) => {
  try {
   const nexmoData = NexmoData(config.name, tunnelUrl)
      const {data, status} = await callingNexmo(nexmoData.headers, nexmoData.data, http_method.HTTP_METHODS.PUT, http_method.APP_URL(config.id).updateAppUrl)
    fs.writeFileSync("config.json", JSON.stringify(data))
    console.log(data, status, "+++++++++++++++++++++++++++");
  } catch (e) {
    console.log(e)
    throw e
  }
}


const tunnelUrlCall = async () => {
  try {
    console.log("called")
    const tunnelUrl = await ngrok.connect(process.env.PORT);
    if(config){
      await updateApplication(tunnelUrl)
    }
    fs.writeFileSync("tunnelUrl.json", JSON.stringify(tunnelUrl));
    console.log(tunnelUrl, "tunnel url================")

  } catch (e) {
    console.log(e)
    throw (e)
  }

};

tunnelUrlCall()





//Listen from server
app.listen(process.env.PORT, async () => {
  console.log("listening in port:" + process.env.PORT);
});
