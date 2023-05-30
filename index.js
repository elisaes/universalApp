const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const fs = require("fs");
const tunnel = require('localtunnel');
const cors = require("cors");
const config = require("./application.json");
const callingNexmo = require("./utils/callingNexmo");
const http_method = require("./constants");
const NexmoData = require("./utils/NexmoData")



console.log(process.env.NPE_NAME)
console.log(process.env.APP_ENVIRONMENT)

//nexmoApplication
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", require("./nexmoApp/router")); //applications

//webhooks
app.use("/webhooks", require("./webhooks/router"));



const updateTunnelUrlForApplication = async (tunnelUrl) => {
  try {
    console.log("Updating tunnel Url for application")
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
    const localtunnel = await tunnel({ port: process.env.PORT });
    const tunnelUrl = localtunnel.url
    console.log(tunnelUrl, "tunnel URL")
 
    if(config){
     await updateTunnelUrlForApplication(tunnelUrl)
    }
    fs.writeFileSync("tunnelUrl.json", JSON.stringify(tunnelUrl));
    console.log(tunnelUrl, "tunnel url================")

  } catch (e) {
    throw (e)
  }

};

tunnelUrlCall()





//Listen from server
app.listen(process.env.PORT, async () => {
  console.log("listening in port:" + process.env.PORT);
});
