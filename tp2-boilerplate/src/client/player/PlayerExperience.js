import * as soundworks from 'soundworks/client';

const audioContext = soundworks.audioContext;
const client = soundworks.client;

const template = `
  <div class="fit-container flex-middle">
    <p>Click !</p>
  </div>
`;

class PlayerExperience extends soundworks.Experience {
  constructor(assetsDomain) {
    super();

    this.platform = this.require('platform', { features: ['web-audio'] });
    this.checkin = this.require('checkin', { showDialog: false });
    this.sync = this.require('sync');
    this.audioBufferManager = this.require('audio-buffer-manager', {
      assetsDomain: assetsDomain,
      directories: { path: 'sounds', recursive: true },
    });
  }

  start() {
    super.start();

    this.view = new soundworks.View(template, {}, {
      'click': () => this.triggerEcho(),
    }, {
      id: this.id,
    });


    // ...

    this.show();
  }

  triggerEcho() {
    const echoParams = {
      index: 0,
      // source: client.index,
      // gain: 1,
      time: this.sync.getSyncTime(),
    };

    this.playSound(echoParams);
    // this.forwardEcho(echoParams);
  }

  playSound(echoParams) {
    // ...
  }

  forwardEcho(echoParams) {
    // ...
  }
}

export default PlayerExperience;
