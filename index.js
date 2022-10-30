const db = require('./db/connection')
const { promptRequest } = require('./utils/prompts')



function startApp () {
    console.log("************************************");
    console.log("************************************");
    console.log("**                                **");
    console.log("**         Welcome to the         **");
    console.log("**         myBusiness App         **");
    console.log("**                                **");
    console.log("**                                **");
    console.log("************************************");
    console.log("************************************");
    promptRequest()
}

startApp()
