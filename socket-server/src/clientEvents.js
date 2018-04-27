import axios from 'axios';

import { success } from './lib/log';
import {
  serverInitialState,
  clientOneServerChanged,
  clientTwoServerChanged,
  serverLeave,
  serverRun,
  serverMessage,
} from './serverEvents';
import _ from 'lodash';

/**
 *
 *  Client emissions (server listeners)
 *
 *  more on socket emissions:
 *  @url {https://socket.io/docs/emit-cheatsheet/}
 *
 *  @param room is an ES6 Map, containing { id, state }
 *  @url {https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map}
 *
 */
const clientReady = ({ io, client, room }, payload) => {
  // payload contains the challenge object
  success('client ready heard');
  serverInitialState({ io, client, room }, payload);
};

const clientOneUpdate = ({ io, client, room }, payload) => {
  const { text, player } = payload;
  success('client update heard. payload.text = ', payload);
  room.set('playerOne.text', text);
  clientOneServerChanged({
    io,
    client,
    room,
    player,
  });
};

const clientTwoUpdate = ({ io, client, room }, payload) => {
  const { text, player } = payload;
  success('client update heard. payload.text = ', payload);
  room.set('playerTwo.text', text);
  clientTwoServerChanged({
    io,
    client,
    room,
    player,
  });
};

const clientDisconnect = ({ io, room }) => {
  success('client disconnected');
  serverLeave({ io, room });
};

const clientRun = async ({ io, room }, payload) => {
  success('running code from client. room.get("text") = ', room.get('text'));
  const {
    text, player, tests, fnName,
  } = payload;
  const url = process.env.CODERUNNER_SERVICE_URL;
  const cases = tests.split('\n');
  const tuples = [];
  for (let i = 0; i < cases.length; i += 2) {
    tuples.push([cases[i], cases[i + 1]]);
  }
  try {
    const { data } = await axios.post(`${url}/submit-code`, { code: text });
    let stdout = data;
    if (fnName) {
      let allPass = true;
      for (let i = 0; i < tuples.length; i++) {
        const testCase = `${text}\n${fnName}(${tuples[i][0]});`;
        const result = await axios.post(`${url}/submit-code`, { code: testCase });
        if (allPass) {
          allPass = _.isEqual(JSON.parse(result.data.result), JSON.parse(tuples[i][1]));
        }
      }
      if (allPass) {
        stdout = { result: 'WINNER!' };
      }
    }
    serverRun({ io, room }, { stdout, player });
  } catch (e) {
    success('error posting to coderunner service from socket server. e = ', e);
  }
};

const clientMessage = async ({ io, room }, payload) => {
  success('client message heard');
  const url = process.env.REST_SERVER_URL;
  try {
    const { data } = await axios.post(`${url}/messages/`, payload);
    serverMessage({ io, room }, data);
  } catch (e) {
    success('error saving message to the database. e = ', e);
  }
};

const clientEmitters = {
  'client.ready': clientReady,
  'clientOne.update': clientOneUpdate,
  'clientTwo.update': clientTwoUpdate,
  'client.disconnect': clientDisconnect,
  'client.run': clientRun,
  'client.message': clientMessage,
};

export default clientEmitters;
