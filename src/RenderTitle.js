function RenderTitle(ctx, frameCount, color, title) {
    ctx.strokeStyle = color.stroke;
    ctx.font = '24px sans-serif';
    ctx.textAlign = "center";
    ctx.fillStyle = color.stroke;
    ctx.fillText(title, ctx.canvas.width/2, 50);
}

export default RenderTitle