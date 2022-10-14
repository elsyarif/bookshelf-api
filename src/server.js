const Hapi = require("@hapi/hapi");


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

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();