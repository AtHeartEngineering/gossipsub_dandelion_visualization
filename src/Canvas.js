import React from 'react'
import useCanvas from './useCanvas'

function resizeCanvasToDisplaySize(canvas) {

    const { width, height } = canvas.getBoundingClientRect()

    if (canvas.width !== width || canvas.height !== height) {
        const { devicePixelRatio: ratio = 1 } = window
        const context = canvas.getContext('2d')
        canvas.width = width * ratio
        canvas.height = height * ratio
        context.scale(ratio, ratio)
        return true
    }

    return false
}

const _predraw = (context, canvas) => {
    context.save()
    resizeCanvasToDisplaySize(context, canvas)
    const { width, height } = context.canvas
    context.clearRect(0, 0, width, height)
}

const Canvas = props => {
    const { draw, predraw = _predraw, ...rest } = props
    const canvasRef = useCanvas(draw, { predraw })
    return <canvas ref={canvasRef} {...rest} id="canvas"/>
}

export default Canvas