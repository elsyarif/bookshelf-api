import Hapi from "@hapi/hapi";
import Routes from "./routes/index.js";

const init = async() => {
    const server = Hapi.Server({
        port: 5000,
        host: process.env.NODE_ENV !== 'production' ? "localhost" : "0.0.0.0",
        routes: {
            cors: {
                origin : ["*"]
            }
        }
    });

    server.route(Routes);
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();