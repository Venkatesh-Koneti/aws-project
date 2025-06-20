import Hapi from '@hapi/hapi';
import config from "../config"

const init = async () => {
  const server = Hapi.server({
    port: config.SERVER_CONFIG.LISTEN_PORT,
    host: config.SERVER_CONFIG.LISTEN_HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  // server.route({
  //   method: 'GET',
  //   path: '/api/micro-service-1',
  //   handler: (request, h) => {
  //     return { message: 'Hello from /micro-service-1' };
  //   }
  // });
  server.route([
    {
      method: 'GET',
      path: '/api/micro-service-1',
      handler: () => ({ message: 'GET from Microservice 1' }),
    },
    {
      method: 'POST',
      path: '/api/micro-service-1',
      handler: () => ({ message: 'POST from Microservice 1' }),
    },
    {
      method: 'PUT',
      path: '/api/micro-service-1',
      handler: () => ({ message: 'PUT from Microservice 1' }),
    },
    {
      method: 'PATCH',
      path: '/api/micro-service-1',
      handler: () => ({ message: 'PATCH from Microservice 1' }),
    },
    {
      method: 'DELETE',
      path: '/api/micro-service-1',
      handler: () => ({ message: 'DELETE from Microservice 1' }),
    },
  ]);

  await server.start();
  console.log('Microservice 1 running at:', server.info.uri);
};

// init();

// await server.start();
// console.log(`Server running on ${server.info.uri}`);
// };

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
