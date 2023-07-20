import { logger } from "$lib/logger.js"

export async function handle({ event, resolve }) {
  const response = await resolve(event)
  // console.log(event.request.socket);
  const {ip, from } =  getClientIPAddress(event)
  let str = `Client IP address: ${ip}`
  str = from ? str + `. from: ${from}` : str
  console.log(str);
  return response
}

function getClientIPAddress(event) {
  // Check if IP address is available in the request object
  if (event.request.connection && event.request.connection.remoteAddress) {
    return { ip: event.request.connection.remoteAddress, from: "connection.remoteAddress" }
  }

  // Check if IP address is available in the headers
  if (event.request.headers && event.request.headers['x-forwarded-for']) {
    return { ip: event.request.headers['x-forwarded-for'], from: "headers['x-forwarded-for']" };
  }

  // IP address not found
  return { ip: 'Unknown', from: null };
}