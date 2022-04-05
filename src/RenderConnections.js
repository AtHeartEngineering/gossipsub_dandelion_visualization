import { centered, draw_line } from './Utils'

const render_connections = (ctx, peers) => {
    peers.forEach((peer, idx) => {
      if (peer.connected_to !== undefined) {
        let connected_peers = peer.connected_to
        connected_peers.forEach((connected_peer_id) => {
          let _peer = centered(peer.x, peer.y, ctx)
          let _peer2 = centered(peers[connected_peer_id].x, peers[connected_peer_id].y, ctx)
          draw_line(ctx, _peer.x, _peer.y, _peer2.x, _peer2.y)
        })
      }
    })
}

export default render_connections