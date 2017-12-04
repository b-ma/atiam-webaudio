import { Experience } from 'soundworks/server';

class PlayerExperience extends Experience {
  constructor(clientType) {
    super(clientType);

    this.sync = this.require('sync');
    this.checkin = this.require('checkin');
    this.audioBufferManager = this.require('audio-buffer-manager');
  }

  start() {}

  enter(client) {
    super.enter(client);

    // ...
  }
}

export default PlayerExperience;
