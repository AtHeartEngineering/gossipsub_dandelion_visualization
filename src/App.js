import React from 'react'
import Canvas from './Canvas'
import GeneratePeers from './GeneratePeers'
import render_peers from './RenderPeers'
import render_connections from './RenderConnections'
import { clear_and_setup, render_framecount } from './Utils'
import colors from './colors'
import ToggleButton from './toggleButton'

const peers = GeneratePeers()

function App() {
  const [darkTheme, setDarkTheme] = React.useState(false)
  let theme = darkTheme ? 'dark' : 'light'
  document.body.style.backgroundColor = colors[theme].background
  const draw = (ctx, frameCount) => {
    clear_and_setup(ctx, colors[theme])
    render_framecount(ctx, frameCount, colors[theme])
    render_connections(ctx, peers, colors[theme])
    render_peers(ctx, peers, colors[theme])
  }
  let height = window.innerHeight;
  let width = window.innerWidth;
  return (
    <>
      <ToggleButton onChange={() => setDarkTheme(prevTheme => !prevTheme)}/>
      <Canvas draw={draw} width={width + "px"} height={height + "px"} />
    </>)
}

export default App