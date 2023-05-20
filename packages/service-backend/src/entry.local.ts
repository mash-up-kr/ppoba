import { bootstrap } from './bootstrap';

bootstrap().then(({ app }) => {
  app.listen(3001).then(() => console.log('\nhttp://localhost:3001'));
});
