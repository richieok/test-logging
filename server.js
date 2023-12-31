#!/usr/bin/env node
import { handler } from './build/handler.js';
// import {logger} from "./src/lib/logger.js";
import express from 'express';
// import {results} from "./src/lib/load-params.js";

// console.log(results);
const app = express();
const PORT = 3000;

try{
    app.use((req, res, next)=>{
        console.log(req.socket.remoteAddress);
        // logger.info(`client address: ${req.socket.remoteAddress}`);
        next();
    })
    app.use(handler);
    
    app.listen(PORT, ()=> {
        console.log(`listening on port: ${PORT}`);
        // logger.info(`listening on port: ${PORT}`)
    });

}
catch(e){
    console.log(e.message);
    // logger.error(e.message);
}