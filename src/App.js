import React from 'react'
import Canvas from './Canvas'
import GeneratePeers from './GeneratePeers'
import RenderPeers from './RenderPeers'
import RenderTitle from './RenderTitle'
import RenderConnections from './RenderConnections'
import RenderMessages from './RenderMessages'
import { clear_and_setup, render_framecount, reset_styles } from './Utils'
import colors from './colors'
import ToggleButton from './toggleButton'

window.peers_g = GeneratePeers()
window.peers_d = GeneratePeers()

const Dandelion = () => <div style={{ color: "white" }}>D</div>;
const Gossipsub = () => <div style={{ color: "white" }}>G</div>;
const Play = () => <div style={{ color: "white" }}>▶</div>;
const Pause = () => <div style={{ color: "white" }}>⏸</div>;
window.stem = 0

function startRecording() {
  const canvas = document.getElementById('canvas')
  const chunks = []; // here we will store our recorded media chunks (Blobs)
  const stream = canvas.captureStream(); // grab our canvas MediaStream
  const rec = new MediaRecorder(stream); // init the recorder
  // every time the recorder has new data, we will store it in our array
  rec.ondataavailable = e => chunks.push(e.data);
  // only when the recorder stops, we construct a complete Blob from all the chunks
  rec.onstop = e => exportVid(new Blob(chunks, { type: 'video/webm' }));

  rec.start();
  setTimeout(() => { rec.stop() }, 30000);
}

function exportVid(blob) {
  const vid = document.getElementById('video');
  vid.src = URL.createObjectURL(blob);
  vid.controls = true;
  document.body.appendChild(vid);
  const a = document.createElement('a');
  a.download = 'myvid.webm';
  a.href = vid.src;
  a.textContent = 'download the video';
  document.body.appendChild(a);
}


function App() {
  const [darkTheme, setDarkTheme] = React.useState(true)
  const [playback, setPlayback] = React.useState(true)
  const [networkType, setnetworkType] = React.useState(false)

  let theme = darkTheme ? 'dark' : 'light'
  let network = networkType ? 'gossipsub' : 'dandelion'
  document.body.style.backgroundColor = colors[theme].background

  const random_peer_hue = false

  const height = window.innerHeight - 5;
  const width = window.innerWidth / 2 - 50;

  let seeded_messages_g = false
  let seeded_messages_d = false

  React.useEffect(() => {
    //startRecording()
  })


  function reset() {
    window.peers_g = GeneratePeers()
    window.peers_d = GeneratePeers()
    seeded_messages_g = false
    seeded_messages_d = false
  }

  // MAIN DRAW FUNCTION THAT IS PASSED TO THE CANVAS
  const draw_gossipsub = (ctx, frameCount) => {
    if (playback) {
      if (frameCount === 0) {
        reset()
      }
      clear_and_setup(ctx, colors[theme])
      //render_framecount(ctx, frameCount, colors[theme])
      RenderTitle(ctx, frameCount, colors[theme], "Gossipsub")
      reset_styles(ctx,colors[theme])
      RenderConnections(ctx, window.peers_g, colors[theme])
      RenderPeers(ctx, window.peers_g, colors[theme], random_peer_hue)
      RenderMessages(ctx, frameCount, window.peers_g, 'gossipsub', seeded_messages_g)
      seeded_messages_g = true
    }
  }
  const draw_dandelion = (ctx, frameCount) => {
    if (playback) {
      if (frameCount === 0) {
        reset()
      }
      clear_and_setup(ctx, colors[theme])
      //render_framecount(ctx, frameCount, colors[theme])
      RenderTitle(ctx, frameCount, colors[theme], "Gossipsub + Dandelion++")
      reset_styles(ctx,colors[theme])
      RenderConnections(ctx, window.peers_d, colors[theme])
      RenderPeers(ctx, window.peers_d, colors[theme], random_peer_hue)
      RenderMessages(ctx, frameCount, window.peers_d, 'dandelion', seeded_messages_d)
      seeded_messages_d = true
    }
  }


  const TopBar = () => {
    let network = ""
    if (networkType) {
      network = "Gossipsub"
    }
    else {
      network = "Gossipsub with Dandelion"
    }
    React.useEffect(() => {
      //console.log(network)
      document.title = network
    }, [network]);
    return (<div className="topbar">
      <h1 style={{ color: colors[theme].stroke, }}>Gossipsub & Gossipsub w/ Dandelion ++</h1>
      <button onClick={() => reset()}>Reset</button>
      <ToggleButton onChange={(state) => setPlayback(state)} icons={{ checked: <Play />, unchecked: <Pause /> }} defaultChecked={playback} />
      <ToggleButton onChange={(state) => setDarkTheme(state)} defaultChecked={darkTheme} />
    </div>)
  }

  return (
    <>
      {/* <TopBar></TopBar> */}
      <Canvas draw={draw_gossipsub} width={width + "px"} height={height + "px"} />
      <Canvas draw={draw_dandelion} width={width + "px"} height={height + "px"} />
      <div id="video"></div>
    </>)
}

export default App