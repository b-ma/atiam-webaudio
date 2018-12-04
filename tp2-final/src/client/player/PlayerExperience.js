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
    this.audioBufferManager = this.require('audio-buffer-manager', {
      assetsDomain: assetsDomain,
      directories: { path: 'sounds', recursive: true },
    });

    this.rawSocket = this.require('raw-socket');
    this.sync = this.require('sync');
  }

  start() {
    super.start();

    this.view = new soundworks.View(template, {}, {
      'click': () => this.triggerEcho(),
    }, {
      id: this.id,
    });

    this.receive('echo', echoParams => {
      this.playSound(echoParams);
      this.forwardEcho(echoParams);
    });

    this.show();
  }

  triggerEcho() {
    const echoParams = {
      index: 0,
      source: client.index,
      gain: 1,
      time: this.sync.getSyncTime(),
    };

    this.playSound(echoParams);
    this.forwardEcho(echoParams);
  }

  playSound(echoParams) {
    const buffer = this.audioBufferManager.data.clicks[echoParams.source];

    const volume = audioContext.createGain();
    volume.connect(audioContext.destination);
    volume.gain.value = echoParams.gain;

    const src = audioContext.createBufferSource();
    src.connect(volume);
    src.buffer = buffer;
    src.playbackRate.value = 1 + echoParams.index / 10;
    const audioTime = this.sync.getAudioTime(echoParams.time);
    src.start(audioTime);
  }

  forwardEcho(echoParams) {
    echoParams.index += 1; // increment index
    echoParams.gain *= 0.9; //
    echoParams.time += 0.1;

    if (echoParams.gain > 0.001) // -60 dB
      this.send('echo', echoParams);
  }
}

export default PlayerExperience;
