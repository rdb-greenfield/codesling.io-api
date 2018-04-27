const startingText = `function hello() {
  console.log('hello!');
}

hello();
`;

/**
 *
 *  Rooms store
 *
 */
export default class Rooms {
  constructor(io) {
    this.io = io;
    this.store = new Map();
  }

  findOrCreate(roomId) {
    let room = this.store.get(roomId);

    if (!room) {
      room = new Map();
      room.set('id', roomId);
      room.set('playerOne.text', startingText);
      room.set('playerTwo.text', startingText);
      room.set('player1Id', null);
      room.set('player2Id', null);
      this.store.set(roomId, room);
    }
    return room;
  }
}
