const cors = require("cors");

// CORS CONFIG
const whitelist = ["http://localhost:3000", "http://localhost:8000"];
const corsOptions = {
  origin: (origin, cb) => {
    const originIsWhitelisted = whitelist.includes(origin);
    cb(null, originIsWhitelisted);
  },
  credentials: true // RUTAS PERSISTENTES
};

module.exports = app => {
  // CORS EXPORT
  app.use(cors(corsOptions));
};