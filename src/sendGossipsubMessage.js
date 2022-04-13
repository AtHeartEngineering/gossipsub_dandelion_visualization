import { messageInTransit } from "./Utils"

function send_gossipsub_message(peers, message, from_idx, hue = 15, stem) {
    if (peers[from_idx].messages.filter((msg) => msg.message === message).length > 0) {
        return false
    }
    let _inTransit = []
    peers[from_idx].connected_to.forEach((peer) => {
        _inTransit.push(new messageInTransit(peers[from_idx], peers[peer.id]))
    })
    peers[from_idx].messages.push({ message: message, hue: hue, sent: _inTransit.length, received: 0, inTransit: _inTransit });
}

export default send_gossipsub_message