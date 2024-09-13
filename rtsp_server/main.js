
const RTSP2Web = require('rtsp2web');

let port = 8001;

new RTSP2Web({
  port,
  path: 'ffmpeg',
  transportType: 'tcp',
  webplayer: ['jsmpeg'],
});
