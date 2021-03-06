import { centered, draw_line } from './Utils'

const render_connections = (ctx, peers, colors) => {
    peers.forEach((peer, idx) => {
      if (peer.connected_to !== undefined) {
        let connected_peers = peer.connected_to
        connected_peers.forEach((connected_peer) => {
          let connected_peer_id = connected_peer.id
          let _peer = centered(peer.x, peer.y, ctx)
          let _peer2 = centered(peers[connected_peer_id].x, peers[connected_peer_id].y, ctx)
          draw_line(ctx, _peer.x, _peer.y, _peer2.x, _peer2.y, colors)
        })
      }
    })
}

export default render_connections