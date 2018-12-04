import './full-example';


// for (let i = 0; i < 100; i++) {
//   const audioContext = new window.AudioContext();
//   const depth = 0.5;

//   const tremolo = audioContext.createGain();
//   tremolo.connect(audioContext.destination);
//   tremolo.gain.value = depth;

//   const modDepth = audioContext.createGain();
//   modDepth.connect(tremolo.gain);
//   modDepth.gain.value = 1 - depth;

//   const mod = audioContext.createOscillator();
//   mod.connect(modDepth);
//   mod.frequency.value = Math.random() * 30 + 1;

//   const sine = audioContext.createOscillator();
//   sine.connect(tremolo);
//   sine.frequency.value = Math.random() * 1000 + 300;

//   sine.start();
//   mod.start();
// }
