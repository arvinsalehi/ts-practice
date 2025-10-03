import { connectToDB } from './config/mongoose';
import app from './src/app';

connectToDB();
const port = process.env.PORT || 3001;

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  console.log(`${app.routes} - API`);
  /* eslint-enable no-console */
});