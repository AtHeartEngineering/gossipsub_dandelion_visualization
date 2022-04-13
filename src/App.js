import React from 'react'
import Canvas from './Canvas'
import GeneratePeers from './GeneratePeers'
import RenderPeers from './RenderPeers'
import RenderConnections from './RenderConnections'
import RenderMessages from './RenderMessages'
import { clear_and_setup, render_framecount } from './Utils'
import colors from './colors'
import ToggleButton from './toggleButton'

window.peers = GeneratePeers()

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
  rec.onstop = e => exportVid(new Blob(chunks, {type: 'video/webm'}));

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
  const [darkTheme, setDarkTheme] = React.useState(false)
  const [playback, setPlayback] = React.useState(true)
  const [networkType, setnetworkType] = React.useState(false)

  let theme = darkTheme ? 'dark' : 'light'
  let network = networkType ? 'gossipsub' : 'dandelion'
  document.body.style.backgroundColor = colors[theme].background

  const random_peer_hue = false

  const height = window.innerHeight - 5;
  const width = window.innerWidth - 50;

  let seeded_messages = false

  React.useEffect(() => {
    startRecording()
   })


  function reset() {
    window.peers = GeneratePeers()
    seeded_messages = false
  }

  // MAIN DRAW FUNCTION THAT IS PASSED TO THE CANVAS
  const draw = (ctx, frameCount) => {
    if (playback) {
      if (frameCount === 0) {
        reset()
      }
      clear_and_setup(ctx, colors[theme])
      render_framecount(ctx, frameCount, colors[theme])
      RenderConnections(ctx, window.peers, colors[theme])
      RenderPeers(ctx, window.peers, colors[theme], random_peer_hue)
      RenderMessages(ctx, frameCount, window.peers, network, seeded_messages)
      seeded_messages = true
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
      <h1 style={{ color: colors[theme].stroke, }}>{network}</h1>
      <button onClick={()=> reset()}>Reset</button>
      <ToggleButton onChange={(state) => setPlayback(state)} icons={{ checked: <Play />, unchecked: <Pause /> }} defaultChecked={playback}/>
      <ToggleButton onChange={(state) => setDarkTheme(state)} defaultChecked={darkTheme}/>
      <ToggleButton onChange={(state) => { setnetworkType(state); reset() }} icons={{ checked: <Dandelion />, unchecked: <Gossipsub /> }} defaultChecked={!networkType}/>
    </div>)
  }

  return (
    <>
      <TopBar></TopBar>
      <Canvas draw={draw} width={width + "px"} height={height + "px"} />
      <div id="video"></div>
    </>)
}

export default App