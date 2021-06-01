import React, { useEffect, useRef, useState } from "react"
import mojs from "@mojs/core"

const LinkAnimation = ({ hover }) => {
  const isInitialMount = useRef(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const animDom = useRef()
  const timeline = useRef()

  /* Initiliaze mojs shapes */
  useEffect(() => {
    if (timeline.current) return

    /* Callbacks for start and end of timeline */
    timeline.current = new mojs.Timeline({
      onStart() {
        setIsAnimating(true)
      },

      onComplete() {
        setIsAnimating(false)
      },
    })

    /* Common options for both shapes */
    const opts = {
      parent: animDom.current,
      fill: "none",
      stroke: "white",
      strokeWidth: 2,
      radius: 45,
      y: "25%",
    }

    /* Circle animation that goes around link */
    const cir = new mojs.Shape({
      ...opts,
      shape: "customCircle",
      isShowOnStart: false,
      strokeDasharray: "90%, 200%",
      strokeDashoffset: { "100%": "-100%" },
      duration: 500,
      easing: "ease.inout",
    })

    /* Line animation to underline the link on hover */
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

  /* useEffect to watch for hover of link */
  useEffect(() => {
    /* Check for initial mount so animation doesn't play when page is loaded */
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    if (!timeline.current) return

    /* When link is hovered, play animationg and return; needs to reset tunes from when mouse leaves hover */
    if (hover) {
      timeline.current._timelines[0]._o.callbacksContext.tune({
        duration: 500,
      })
      timeline.current._timelines[1]._o.callbacksContext.tune({
        strokeDashoffset: { "100%": 0 },
        delay: 250,
      })
      timeline.current.replay()
      return
    }

    /* Change animation for when mouse leaves link instead of just playing again */
    timeline.current._timelines[0]._o.callbacksContext.tune({
      duration: 0,
    })
    timeline.current._timelines[1]._o.callbacksContext.tune({
      strokeDashoffset: { 0: "-100%" },
      delay: 0,
    })
    /* check for user quickly entering and then leaving hover, looks bad to play new animation so only play new animation if original animation has finished */
    if (isAnimating) return
    timeline.current.replay()
  }, [hover])

  return <div ref={animDom} />
}

/* Custom circle drawing to look more hand drawn around link */
class LinkCircle extends mojs.CustomShape {
  getShape() {
    return '<path d="M 40,4 C 12,5 -0.34399266,7.7616201 0,28.219159 0.51526392,43.547005 32.812962,49.553439 55.163208,49.845686 77.513449,50.137943 99.568965,47.506795 99.863684,26.465657 100.10929,8.9306292 81.197555,3.0856164 58.356097,3.3778631 35.514639,3.670121 4,7 3.0945058,20 2,41.078172 18.567752,43 18.567752,43"/>'
  }
  getLength() {
    return 337.18
  }
}
mojs.addShape("customCircle", LinkCircle)

/* Custom Linke animation for hand drawn look */
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
