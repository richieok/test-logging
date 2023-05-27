import { SSMClient, GetParametersCommand, GetParameterCommand } from "@aws-sdk/client-ssm";
import {logger} from "./logger.js"
import * as dotenv from "dotenv";
dotenv.config();

const appName = "test-logging"

let init

export const results = await initParams()

async function initParams() {
    if (!init) {
        try{
            init = {}
            if (process.env.SERVER_LOCATION === "local") {
                init.PORT = process.env.PORT;
                init.LOGTO = process.env.LOG_TO;
            } else {
                init.PORT = await accessParameter(`/${appName}/port`);
                init.LOG_TO = await accessParameter(`/${appName}/logto`);
            }
        }
        catch(err){
            logger.error(err)
            init = undefined
        }
        finally {
            return init
        }
    }
    logger.info("Parameters already loaded")
    return init
}

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

