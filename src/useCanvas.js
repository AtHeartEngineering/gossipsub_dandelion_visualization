import { useRef, useEffect } from 'react'

const useCanvas = (draw, props) => {

  const canvasRef = useRef(null)
  useEffect(() => {

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId
    const render = () => {
      frameCount++
      if (frameCount > 1200) {
        frameCount = 0
      }
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  return canvasRef
}
export default useCanvas