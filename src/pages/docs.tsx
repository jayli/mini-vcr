import useScript from 'react-script-hook';
import {useState, useEffect} from 'react';

const DocsPage = () => {

  const [player, setPlayer] = useState(undefined);
  const [scriptLoading, error] = useScript({
    src: '/jsmpeg.min.js',
    onload: () => {
      initPlayerOnce();
    }
  });

  useEffect(() => {
    initPlayerOnce();
  },[]);

  const initPlayerOnce = () => {
    if(player !== undefined) return;
    if(window?.JSMpeg === undefined) return;
    var canvas = document.getElementById('canvas-1');
    if(canvas === null) return;
    console.log('initPlayerOnce');
    // 将rtsp视频流地址进行btoa处理一下
    var rtsp1 = 'http://47.51.131.147/-wvhttp-01-/GetOneShot?image_size=1280x720&frame_count=1000000000';
    var canvas = document.getElementById('canvas-1');
    var player = new JSMpeg.Player('ws://localhost:8001/rtsp?url=' + btoa(rtsp1), {
      canvas: canvas
    });
    setPlayer(player);
  };

  return (
    <>
      <div>
        <p>
          <canvas id="canvas-1" style={{
            width: '640px',
          }}></canvas>
        </p>
      </div>
    </>
  );
};

export default DocsPage;
