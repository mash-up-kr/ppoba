import { bootstrap } from './bootstrap';

bootstrap().then(({ app }) => {
  app.listen(3000).then(() => console.log('\nhttp://localhost:3000'));
});
