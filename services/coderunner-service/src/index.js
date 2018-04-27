import Sandbox from 'sandbox';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { success } from './lib/log';

const app = express();
const s = new Sandbox();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.post('/submit-code', (req, res) => {
  const { code } = req.body;
  s.run(code, (output) => {
    res.status(200).send(output);
  });
});

app.listen(PORT, success(`coderunner-service is listening on port ${PORT}`));
