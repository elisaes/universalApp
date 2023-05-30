to create an application:
1. create a .env file, put the variables PORT, APIKEY, APISECRET
2. comment out the import and put null the vals of config.json and application.json in nexmoApp/src.js, index.js, nexmoApp/router.js and put null in those variables
3. create the request, POST create application, only need the application name {"name":"yourAppName"} in the body, but can input capabilities too
4. once successfull, uncomment the imports of config and application.json in nexmoApp/src.js, index.js, nexmoApp/router.js

To work with npe:

1. update the var npe with the npe name in constants.js and utils/callingNexmo.js
3. comment out the import of config.json and application.json in nexmoApp/src.js, index.js, nexmoApp/router.js and put null in those variables
4. create the request, POST create application, no need authorization or name 
5. once successfull, uncomment the imports of config and application.json