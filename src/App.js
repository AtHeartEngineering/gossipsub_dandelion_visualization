import React from 'react'
import Canvas from './Canvas'
import GeneratePeers from './GeneratePeers'
import render_peers from './RenderPeers'
import render_connections from './RenderConnections'
import { clear_and_setup, render_frameCount } from './Utils'


function App() {
  const peers = GeneratePeers()
  const draw = (ctx, frameCount) => {
    clear_and_setup(ctx)
    render_frameCount(ctx, frameCount)
    render_connections(ctx, peers)
    render_peers(ctx, peers)
  }
  let height = window.innerHeight;
  let width = window.innerWidth;
  return <Canvas draw={draw} width={width + "px"} height={height + "px"}/>
}

export default App