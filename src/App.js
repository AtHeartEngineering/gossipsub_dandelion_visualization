import React from 'react'
import { Graphviz } from 'graphviz-react';

function App() {
  let graph = `graph {
                "Source Peer" -- "Peer 1";
                "Source Peer" -- "Peer 2";
                "Source Peer" -- "Peer 3";
                "Source Peer" -- "Peer 4";
                "Peer 1" -- "Peer 2";
                "Peer 3" -- "Peer 4";
                "Peer 1" -- "Peer 5";
                "Peer 1" -- "Peer 6";
                "Peer 2" -- "Peer 5";
                "Peer 2" -- "Peer 6";
                "Peer 3" -- "Peer 7";
                "Peer 3" -- "Peer 8";
                "Peer 4" -- "Peer 8";
                "Peer 4" -- "Peer 9";
                "Peer 5" -- "Peer 6";
                "Peer 6" -- "Peer 7";
                "Peer 7" -- "Peer 8";
                "Peer 8" -- "Peer 9";
              }`
  let options = {fit: true, width: '100%'}
  return <Graphviz dot={graph} options={options} />
}

export default App