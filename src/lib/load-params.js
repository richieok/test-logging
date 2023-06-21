import { SSMClient, GetParametersCommand, GetParameterCommand } from "@aws-sdk/client-ssm";
// import {logger} from "./logger.js"
import * as dotenv from "dotenv";
dotenv.config();

const appName = "test-logging"

async function accessParameter(paraName) {
    const client = new SSMClient({ region: "us-east-1" });
    const input = {
        Name: paraName,
        WithDecryption: true
    }
    const command = new GetParameterCommand(input);
    const response = await client.send(command);
    return response.Parameter.Value
}

export const getParams = ( ()=>{
    let params
    async function init(){
        if (!params){
            console.log('Initializing parameters');
            params = {}
            if (process.env.SERVER_LOCATION === "local"){
                params.PORT = process.env.PORT;
                params.LOGTO = process.env.LOG_TO;
            } else {
                params.PORT = await accessParameter(`/${appName}/port`);
                params.LOG_TO = await accessParameter(`/${appName}/logto`);
            }
            return
        }
        console.log('Parameters already initialized');
    }
    return async ()=>{
        await init()
        return params
    }
})()
