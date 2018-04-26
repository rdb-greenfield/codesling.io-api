import Sandbox from 'sandbox';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import _ from 'lodash';

import { success } from './lib/log';

const app = express();
const s = new Sandbox();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.post('/submit-code', (req, res) => {
  const { code, tests, fnName } = req.body;
  const answer = `${code}\n${fnName}(${tests.split('\n')[0]});`;
  s.run(answer, (output) => {
    if (_.isEqual(JSON.parse(output.result), JSON.parse(tests.split('\n')[1]))) {
      console.log('you won');
      output.result = 'WINNER!';
      res.status(200).send(output);
    } else {
      s.run(code, (output) => {
        console.log(output);
        res.status(200).send(output);
      });
    }
  });
});

app.listen(PORT, success(`coderunner-service is listening on port ${PORT}`));
