import * as controllers from '@ircam/basic-controllers';

// 1. create audio context
// --------------------------------------------------------------

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// 2. define some defaults
// --------------------------------------------------------------

let frequency = 300;
let modFrequency = 4;
const defaultDepth = 0.2;

// global variables to hold the sources
let carrier;
let modOsc;

// 3. create audio nodes
// --------------------------------------------------------------

const depth = audioContext.createGain();
depth.gain.value = defaultDepth;

const amplitude = audioContext.createGain();
amplitude.gain.value = 1 - defaultDepth;

// 4. connect audio chain
// --------------------------------------------------------------

// modulation
depth.connect(amplitude.gain);
// output to speaker
amplitude.connect(audioContext.destination);

// 5. create controllers
// --------------------------------------------------------------

const startStopController = new controllers.SelectButtons({
  label: 'start / stop',
  options: ['start', 'stop'],
  default: 'stop',
  container: '#controllers',
  callback: value => {
    if (value === 'start') {
      carrier = audioContext.createOscillator();
      carrier.type = 'sine';
      carrier.frequency.value = frequency;

      modOsc = audioContext.createOscillator();
      modOsc.type = 'sine';
      modOsc.frequency.value = modFrequency;

      carrier.connect(amplitude);
      modOsc.connect(depth);

      const now = audioContext.currentTime;
      carrier.start(now);
      modOsc.start(now);
    } else {
      const now = audioContext.currentTime;
      carrier.stop(now);
      modOsc.stop(now);
    }
  }
});

const frequencyController = new controllers.Slider({
  label: 'frequency',
  min: 50,
  max: 1000,
  step: 1,
  default: frequency,
  container: '#controllers',
  size: 'large',
  callback: value => {
    if (carrier) {
      frequency = value; // store value for later creation of `carrier`
      carrier.frequency.value = frequency;
    }
  }
});

const modFrequencyController = new controllers.Slider({
  label: 'modFrequency',
  min: 0,
  max: 500,
  step: 0.01,
  default: modFrequency,
  container: '#controllers',
  size: 'large',
  callback: value => {
    if (modOsc) {
      modFrequency = value; // store value for later creation of `modOsc`
      modOsc.frequency.value = modFrequency;
    }
  }
});

const depthController = new controllers.Slider({
  label: 'depth',
  min: 0,
  max: 0.5,
  step: 0.001,
  default: defaultDepth,
  container: '#controllers',
  size: 'large',
  callback: value => {
    // ramp of 5ms to avoid clicks
    const targetTime = audioContext.currentTime + 0.005;
    depth.gain.linearRampToValueAtTime(value, targetTime);
    amplitude.gain.linearRampToValueAtTime(1 - value, targetTime);
  }
});
