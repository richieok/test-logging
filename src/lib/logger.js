import { createLogger, format, transports } from "winston";

const logDir = "/Users/adolphusokoro/Documents/projects/sveltekit/test-logging"

export const logger = createLogger({
  transports: [
    new transports.File({
      filename: `${logDir}/logs/server.log`,
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