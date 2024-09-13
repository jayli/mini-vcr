import useScript from 'react-script-hook';

const DocsPage = () => {
  const [loading, error] = useScript({
    src: '/jsmpeg.min.js',
    onload: () => {
      pageOnload();
    }
  });

  const pageOnload= () => {
    console.log('script ready, pageInit');
    // 将rtsp视频流地址进行btoa处理一下
    var rtsp1 = 'http://47.51.131.147/-wvhttp-01-/GetOneShot?image_size=1280x720&frame_count=1000000000';
    new JSMpeg.Player('ws://localhost:8001/rtsp?url=' + btoa(rtsp1), {
      canvas: document.getElementById('canvas-1')
    });
    // 将rtsp视频流地址进行btoa处理一下，还可以加一点参数
    // new JSMpeg.Player(
    //   'ws://localhost:9999/rtsp?url=' +
    //     btoa(rtsp1) +
    //     '&brightness=0.2&saturation=1.8',
    //   {
    //     canvas: document.getElementById('canvas-2')
    //   }
    // );
  };

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <div>
        <p>
          <canvas id="canvas-1"></canvas>
        </p>
      </div>
    </>
  );
};

export default DocsPage;
