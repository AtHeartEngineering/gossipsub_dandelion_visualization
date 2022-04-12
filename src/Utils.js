const clear_and_setup = (ctx, colors) => {
    ctx.darkmode = true;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.lineWidth = 5;
    ctx.strokeStyle = colors.stroke;
    ctx.font = '18px sans';
    ctx.textAlign = "center";
}

const render_framecount = (ctx, frameCount, colors) => {
    ctx.lineWidth = 5;
    ctx.strokeStyle = colors.stroke;
    ctx.font = '18px sans';
    ctx.textAlign = "center";
    ctx.fillText(frameCount, ctx.canvas.width/2, 25);
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
    ctx.fillStyle = colors.stroke;
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2);
    ctx.stroke();
 }

export {
    clear_and_setup,
    render_framecount,
    rand_int_range,
    centered,
    draw_line
};