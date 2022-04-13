import { rand_int_range, centered, } from './Utils'

const render_peers = (ctx, peers, colors, random_hue=false) => {
    peers.forEach((peer, idx) => {
      peer.id = idx;
      if (peer.hue === undefined && random_hue) {
        peer.hue = rand_int_range(0, 360);
        peer.saturation = rand_int_range(50, 100);
        peer.lightness = rand_int_range(40, 80);
      } else if (peer.hue === undefined && !random_hue) {
        peer.hue = 0;
        peer.saturation = 0;
        peer.lightness = 50;
      }
      let c_coordinates = centered(peer.x, peer.y, ctx)
      ctx.fillStyle = 'hsl(' + peer.hue + ', ' + peer.saturation + '%, ' + peer.lightness + '%)';
      ctx.beginPath()
      ctx.arc(c_coordinates.x, c_coordinates.y, 15, 0, 2 * Math.PI)

      ctx.stroke();
      ctx.fill()
      peer.fontColor = peer.lightness > 50 ? 0 : 100;
      ctx.fillStyle = 'hsl(' + (peer.hue - 90 % 360) + ', 100%, ' + peer.fontColor + '%)';
      ctx.fillText(idx, c_coordinates.x, c_coordinates.y + 5);
    })
}

export default render_peers;