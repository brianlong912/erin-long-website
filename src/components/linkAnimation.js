import React, { useEffect, useRef, useState } from "react"
import mojs from "@mojs/core"

const LinkAnimation = ({ hover }) => {
  const isInitialMount = useRef(true)
  const [isAnimating, setIsAnimating] = useState(false);
  const animDom = useRef()
  const timeline = useRef()

  useEffect(() => {
    if (timeline.current) return
    // if (cir.current) return

    timeline.current = new mojs.Timeline({
      onStart() {
        setIsAnimating(true)
      },
      
      onComplete() {
        setIsAnimating(false)
      }
    })

    const opts = {
      parent: animDom.current,
      fill: "none",
      stroke: "white",
      strokeWidth: 2,
      radius: 45,
      y: "25%",
    }

    const cir = new mojs.Shape({
      ...opts,
      shape: "customCircle",
      isShowOnStart: false,
      strokeDasharray: "90%, 200%",
      strokeDashoffset: { "100%": "-100%" },
      duration: 500,
      easing: "ease.inout",
    })

    console.log(cir)

    const line = new mojs.Shape({
      ...opts,
      shape: "linkLine",
      strokeDasharray: "100%",
      strokeDashoffset: { "100%": 0 },
      isShowOnStart: true,
      duration: 200,
      delay: 250,
      easing: "ease.out",
    })

    timeline.current.add(cir, line)
  })

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    if (!timeline.current) return
    // if (!cir.current) return

    if (hover) {
      timeline.current._timelines[0]._o.callbacksContext.tune({
        duration: 500
      })
      timeline.current._timelines[1]._o.callbacksContext.tune({
        strokeDashoffset: { "100%": 0 },
        delay: 250,
      })
      timeline.current.replay()
      return
    }


    timeline.current._timelines[0]._o.callbacksContext.tune({
      duration: 0
    })
    timeline.current._timelines[1]._o.callbacksContext.tune({
      strokeDashoffset: { 0: "-100%" },
      delay: 0,
    })
    if(isAnimating) return
    timeline.current.replay()
  }, [hover])

  // function mouseEnter() {
  //   cir.current.play()
  //   console.log("entered")
  // }

  // function mouseLeave() {
  //   cir.current.playBackward()
  // }

  return <div ref={animDom} />
}

class LinkCircle extends mojs.CustomShape {
  getShape() {
    return '<path d="M 40,4 C 12,5 -0.34399266,7.7616201 0,28.219159 0.51526392,43.547005 32.812962,49.553439 55.163208,49.845686 77.513449,50.137943 99.568965,47.506795 99.863684,26.465657 100.10929,8.9306292 81.197555,3.0856164 58.356097,3.3778631 35.514639,3.670121 4,7 3.0945058,20 2,41.078172 18.567752,43 18.567752,43"/>'
  }
  getLength() {
    return 337.18
  }
}
mojs.addShape("customCircle", LinkCircle)

class LinkLine extends mojs.CustomShape {
  getShape() {
    return '<path d="m 18.567752,43 c 15,2 30,-1 70,0"/>'
  }
  getLength() {
    return 70.59
  }
}
mojs.addShape("linkLine", LinkLine)

export default LinkAnimation
