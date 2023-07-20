import { createLogger, format, transports } from "winston";
import { getParams } from "./load-params.js";

const {LOG_DIR} = await getParams()
// console.log(LOG_DIR)

export const logger = createLogger({
  transports: [
    new transports.File({
      filename: `${LOG_DIR}/server.log`,
      level: "info",
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
  ],
});