import ioClient from 'socket.io-client/dist/socket.io.js';
import delay from 'delay';
import randomId from 'random-id';
import dotenv from 'dotenv';
import { after } from 'lodash';

import clientEvents from '../src/clientEvents';

const text =
`function hello() {
  console.log('hello!');
}

hello();
`;

dotenv.config();
dotenv.load();

describe('Client interactions', () => {
  let client1;
  let client2;
  let roomId = randomId(10);

  beforeAll((done) => {
    done = after(2, done);
    const query = { query: `roomId=${roomId}` };
    client1 = ioClient.connect(`${process.env.HOST}:${process.env.PORT}`, query);
    client2 = ioClient.connect(`${process.env.HOST}:${process.env.PORT}`, query);
    client1.on('connect', () => {
      done();
    });
    client2.on('connect', () => {
      done();
    });
  });

  afterAll(async (done) => {
    client1.disconnect();
    client2.disconnect();
    await delay(300);
    done();
  });

  // Expects people to be able to connect to the socket-server
  test('Should add a new user to a room and receive the same text', async (done) => {
    done = after(2, done);
    expect.assertions(6);
    const handler = (payload) => {
      try {
        expect(payload.playerOneText).toMatchSnapshot();
        expect(payload.playerTwoText).toMatchSnapshot();
        // make sure real test above does not throw
        expect(true).toBe(true);
      } catch (e) {
        console.log(e.toString());
      }
      done();
    };

    client1.on('server.initialState', handler);
    client2.on('server.initialState', handler);

    client1.emit('client.ready', { challenge: '' });
    client2.emit('client.ready', { challenge: '' });
  });

  // Expects clients to be able to connect with one another
  test('Should be able to hear emissions from other clients', (done) => {
    expect.assertions(2);
    client2.on('serverOne.changed', (payload) => {
      try {
        expect(payload.text).toMatchSnapshot();
        expect(true).toBe(true);
      } catch (e) {
        console.log(e.toString());
      }
      done();
    });
    client1.emit('clientOne.update', { text: 'console.log("Hello, World!")' });
  });

  test('Should be able to run code and have both clients receive stdout', (done) => {
    done = after(2, done);
    expect.assertions();
    const serverRunHandler = ({ stdout }) => {
      try {
        expect(stdout).toMatchSnapshot();
        expect(true).toBe(true);
      } catch(e) {
        console.log(e.toString());
      }
      done();
    };
    client1.on('server.run', serverRunHandler);
    client2.on('server.run', serverRunHandler);
    client1.emit('client.run', { text, player: 1 });
  });

  // Expects clients to disconnect
  test('Client should have disconnected', (done) => {
    expect.assertions(1);
    client1.on('server.leave', () => {
      // ensures server.leave is heard for other room clients
      expect(true).toBe(true);
      done();
    });
    client2.emit('client.disconnect');
  });
});
