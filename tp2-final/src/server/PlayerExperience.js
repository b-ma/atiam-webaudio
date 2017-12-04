import { Experience } from 'soundworks/server';

class PlayerExperience extends Experience {
  constructor(clientType) {
    super(clientType);

    this.checkin = this.require('checkin');
    this.sharedConfig = this.require('shared-config');
    this.audioBufferManager = this.require('audio-buffer-manager');

    this.rawSocket = this.require('raw-socket');
    this.sync = this.require('sync');
  }

  start() {}

  enter(client) {
    super.enter(client);

    this.receive(client, 'echo', echoParams => {
      this.broadcast('player', client, 'echo', echoParams);
    });
  }
}

export default PlayerExperience;
