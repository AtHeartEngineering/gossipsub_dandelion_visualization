function GeneratePeers(num_peers, peers = [], min_dst = 50, connection_distance= 110) {

    function circle_points(radius, angle, center_x = 0, center_y = 0) {
        let x = radius * Math.sin(Math.PI * 2 * angle / 360);
        let y = radius * Math.cos(Math.PI * 2 * angle / 360);
        return { x: x + center_x, y: y + center_y };
    }

    function create_peers_around_point(radius,
        number,
        center_x = 0,
        center_y = 0,
        start_degree = 0,
        stop_degree = 360) {
        for (let i = 0; i < number; i++) {
            let angle = 360 / number * i;
            if (angle >= start_degree && angle <= stop_degree) {
                let point = circle_points(radius, angle, center_x, center_y);
                peers.push(point);
            }
        }
        return peers;
    }

    const connect_peers = () => {
        peers.forEach((peer, idx) => {
            if (peer.connected_to === undefined) {
                peer.connected_to = [];
            }
            peers.forEach((peer2, idx2) => {
                if (peer2.connected_to === undefined) {
                    peer2.connected_to = [];
                }
                if (idx !== idx2) {
                    let distance = Math.sqrt(Math.pow(peer.x - peer2.x, 2) + Math.pow(peer.y - peer2.y, 2))
                    if (distance < connection_distance) {
                        let chance_bias = (peer.connected_to.length + peer2.connected_to.length) / 4
                        if (Math.floor(Math.random() * chance_bias) === 0) {
                            peer.connected_to.push(idx2)
                            peer2.connected_to.push(idx)
                        }
                    }
                }
            })
        })
    }

    if (peers.length === 0) {
        peers.push({ x: 0, y: 0 });
    }
    create_peers_around_point(100, 8);
    create_peers_around_point(100, 6, peers[3].x, peers[3].y, 10, 170);
    create_peers_around_point(100, 6, peers[5].x, peers[5].y, 120, 260);
    create_peers_around_point(100, 6, peers[7].x, peers[7].y, 200, 360);
    create_peers_around_point(100, 6, peers[1].x, peers[1].y, 0, 90);
    create_peers_around_point(100, 6, peers[1].x, peers[1].y, 270, 360);
    connect_peers()
    console.log(peers)
    return peers
}


export default GeneratePeers;