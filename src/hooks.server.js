// import {logger} from "$lib/logger.js"

export async function handle({event, resolve}){
    const response = await resolve(event)
    console.log(event.request.socket);
    console.log('Client IP address:', getClientIPAddress(event));
    return response
}

function getClientIPAddress(event) {
    // Check if IP address is available in the request object
    if (event.request.connection && event.request.connection.remoteAddress) {
      return event.request.connection.remoteAddress;
    }
    
    // Check if IP address is available in the headers
    if (event.request.headers && event.request.headers['x-forwarded-for']) {
      return event.request.headers['x-forwarded-for'];
    }
    
    // IP address not found
    return 'Unknown';
}