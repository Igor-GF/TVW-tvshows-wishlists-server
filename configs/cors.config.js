const cors = require("cors");

const { FRONTEND_ENDPOINT } = process.env;

module.exports = (app) => {
  app.use(
    cors({
      credentials: true,
      origin: [FRONTEND_ENDPOINT],
    })
  );
}