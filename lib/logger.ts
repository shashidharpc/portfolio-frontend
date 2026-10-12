import pino from "pino";

export const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  redact: {
    paths: [
      "password",
      "passwordHash",
      "req.headers.authorization",
      "req.headers.cookie",
      "token",
      "secret",
      "*.password",
      "*.token",
    ],
    remove: true,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => ({ level: label }),
  },
});
