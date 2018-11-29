// 1. create audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// 2. define constants
const defaultFrequency = 300;
const defaultModFrequency = 4; // 150
const defaultDepth = 0.3;

// 3. create audio nodes
const osc = audioContext.createOscillator();
osc.frequency.value = defaultFrequency;

const modOsc = audioContext.createOscillator();
modOsc.frequency.value = defaultModFrequency;

const depth = audioContext.createGain();
depth.gain.value = defaultDepth;

const amplitude = audioContext.createGain();
amplitude.gain.value = 1 - defaultDepth;

// 4. connect the graph
osc.connect(amplitude);

modOsc.connect(depth);
depth.connect(amplitude.gain);

amplitude.connect(audioContext.destination);

// 5. start audio sources
const now = audioContext.currentTime; // in seconds
osc.start(now);
modOsc.start(now);

// stop 5 seconds later
osc.stop(now + 5);
modOsc.stop(now + 5);

// note: from this point `osc` and `modOsc` are no longer usable
// then in order to restart the new oscillator should be instanciated.
