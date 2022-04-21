const clear_and_setup = (ctx, colors) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.lineWidth = 5;
    ctx.strokeStyle = colors.stroke;
    ctx.font = '20px sans-serif';
    ctx.textAlign = "center";
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

const reset_styles = (ctx, colors) => {
    ctx.lineWidth = 5;
    ctx.strokeStyle = colors.stroke;
    ctx.font = '20px sans-serif';
    ctx.textAlign = "center";
    ctx.fillStyle = colors.background;
}

const render_framecount = (ctx, frameCount, colors) => {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
    ctx.font = '20px sans';
    ctx.textAlign = "center";
    ctx.fillText("frame: " + frameCount, ctx.canvas.width/2, 25);
}

function rand_int_range(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function centered(x, y, ctx) {
    let width = ctx.canvas.width
    let height = ctx.canvas.height
    let x_center = width / 2
    let y_center = height / 2
    let centered_x = x + x_center
    let centered_y = y + y_center
    return { x: centered_x, y: centered_y }
}

function draw_line(ctx, x1, y1, x2, y2, colors) {
    ctx.beginPath();
    ctx.strokeStyle = colors.stroke;
    ctx.fillStyle = colors.stroke;
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function draw_circle(ctx, x, y, radius, hue) {
    ctx.beginPath();
    ctx.strokeStyle = `HSLA(${hue},50,50,50)`;
    ctx.fillStyle = `HSLA(${hue},50,50,50)`;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function draw_circle_center_coords(ctx, x, y, radius, hue=15) {
    let c_coordinates = centered(x, y, ctx)
    ctx.lineWidth = 5;
    ctx.strokeStyle = hslToHex(hue, 100, 50);
    ctx.fillStyle = hslToHex(hue, 100, 50);
    ctx.beginPath();
    ctx.arc(c_coordinates.x, c_coordinates.y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}

class messageInTransit {
    constructor(start_peer, stop_peer, start_frame = 0) {
        this.start_peer_idx = start_peer.id;
        this.stop_peer_idx = stop_peer.id;
        this.start_peer_pos = {x:start_peer.x, y:start_peer.y};
        this.stop_peer_pos = {x:stop_peer.x, y:stop_peer.y};
        this.start_frame = start_frame
        this.distance = Math.sqrt(Math.pow(start_peer.x - stop_peer.x, 2) + Math.pow(start_peer.y - stop_peer.y, 2))
        this.angle = Math.atan2(this.stop_peer_pos.y - this.start_peer_pos.y, this.stop_peer_pos.x - this.start_peer_pos.x);
        this.current_position = {x:start_peer.x, y:start_peer.y};
        this.complete = false
    }

    update(frameCount) {
        if (this.complete === false && frameCount > this.start_frame) {
            let y_shift = Math.sin(this.angle);
            let x_shift = Math.cos(this.angle);

            if (this.distance < 1) {
                this.complete = true
                return this.stop_peer_idx
            }
            this.distance -= 1
            this.current_position.y = this.current_position.y + y_shift;
            this.current_position.x = this.current_position.x + x_shift;
            return false
        }
        return false
    }
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

export {
    clear_and_setup,
    reset_styles,
    render_framecount,
    rand_int_range,
    centered,
    draw_line,
    draw_circle,
    draw_circle_center_coords,
    messageInTransit
};