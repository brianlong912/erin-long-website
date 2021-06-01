import React, { useEffect, useRef } from "react"
import mojs from "@mojs/core"

const CloseButton = ({ duration, visible, focus }) => {
  const animDom = useRef()
  const close = useRef()
  const cir = useRef()

  useEffect(() => {
    if (close.current) return

    close.current = new mojs.Shape({
      parent: animDom.current,
      shape: "cross",
      stroke: focus?"blue":"white",
      strokeWidth: 7,
      radius: 15,
      isShowStart: true,
      duration: duration,
      rotate: { 45: 135 },
      scale: { 0: 1 },
    })
  })

  useEffect(() => {
    if (cir.current) return

    cir.current = new mojs.Shape({
      parent: animDom.current,
      shape: "circle",
      fill: "none",
      stroke: "white",
      strokeWidth: 3,
      radius: 30,
      isShowStart: true,
      duration: duration,
      scale: { 0: 1 },
      opacity: { 1: 0 },
      ease: "quad.out",
    })
  })

  useEffect(() => {
    if (!close.current || !cir.current) return
    close.current.tune({stroke: "white"})
    visible ? close.current.play() : close.current.playBackward()
    if (visible) cir.current.play()
  }, [visible])

  useEffect(()=>{
    if (focus) {
      close.current.tune({stroke: "grey"})
      close.current.play()
      cir.current.play()
    }else {
      close.current.tune({stroke: "white"})
      close.current.play()
      cir.current.play()
    }
  },[focus])

  return <div ref={animDom} />
}

export default CloseButton
