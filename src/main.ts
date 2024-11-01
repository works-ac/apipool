import { bootstrap } from './app';

(async function () {
  const app = await bootstrap();

  const host = process.env.HOST || '127.0.0.1';
  const port = process.env.PORT || 8080;

  await app.listen(port, host);

  console.clear();
  console.log(`Backend service is live at http://${host}:${port}/api`);
})();
