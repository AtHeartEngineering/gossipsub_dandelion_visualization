import { draw_circle_center_coords } from "./Utils";
import send_gossipsub_message from "./sendGossipsubMessage";
import send_dandelion_message from "./sendDandelionMessage"

function send_message(network, peers, message, from_idx, hue = 15, stem = undefined) {
    if (network !== "dandelion") {
        send_gossipsub_message(peers, message, from_idx, hue, stem)
    } else {
        send_dandelion_message(peers, message, from_idx, hue, stem)
    }
}

function RenderMessages(ctx, frameCount, peers, network, initialized, packet_radius = 8) {
    if (initialized === false) {
        send_message(network, peers, "Hello World!", 0, 15);
        let max = peers.length
        let min = 1
        let rando = Math.floor(Math.random() * (max - min + 1) + min)
        send_message(network, peers, "Hello Ethereum!", rando, 200);
    }
    peers.forEach((peer) => {
        if (peer.messages.length > 0) {
            let hue = peer.messages.reduce((msg_total, next_msg) => msg_total + next_msg.hue, 0) / peer.messages.length;
            peer.hue = hue;
            peer.saturation = 100;
        }
        peer.messages.forEach((message) => {
            if (message.sent > message.received) {
                message.inTransit.forEach((inTransit) => {
                    let just_received = inTransit.update(frameCount);
                    if (inTransit.complete === false) {
                        draw_circle_center_coords(ctx, inTransit.current_position.x, inTransit.current_position.y, packet_radius, message.hue)
                    }
                    if (just_received !== false) {
                        //console.log(`message received by peer ${just_received}`)
                        send_message(network, peers, message.message, just_received, message.hue, message.stem)
                        message.received += 1
                    }

                })
            }
        })
    })
}

export default RenderMessages