import { SSMClient, GetParametersCommand, GetParameterCommand } from "@aws-sdk/client-ssm";
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
            // console.log('Initializing parameters');
            params = {}
            if (process.env.SERVER_LOCATION === "local"){
                params.PORT = process.env.PORT;
                params.LOG_DIR = process.env.LOG_DIR;
                params.NODE_ENV = process.env.NODE_ENV;
            } else {
                params.PORT = await accessParameter(`/${appName}/port`);
                params.LOG_DIR = await accessParameter(`/${appName}/log_dir`);
                params.NODE_ENV = await accessParameter(`/${appName}/node_env`);
            }
            return
        }
        // console.log('Parameters already initialized');
    }
    return async ()=>{
        await init()
        return params
    }
})()
