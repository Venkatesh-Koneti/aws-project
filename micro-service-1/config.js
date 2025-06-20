let DotEnv = require("dotenv");

DotEnv.config();

module.exports = {
    SERVER_CONFIG: {
        LISTEN_PORT: process.env.LISTEN_PORT,
        LISTEN_HOST: "0.0.0.0"
    }
};