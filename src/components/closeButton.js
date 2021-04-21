import React, { useEffect, useRef } from 'react'
import mojs from '@mojs/core'

const CloseButton = ({duration}) => {
  const animDom = useRef();
  const close = useRef();

  useEffect(() => {
    if (close.current) return;

    close.current = new mojs.Shape({
      parent: animDom.current,
      shape: 'cross',
      stroke: 'white',
      strokeWidth: 7,
      radius: 20,
      isShowStart: true,
      duration: duration,
      rotate: {0 : 135}
    })
    close.current.play();
  })

  return <div ref={animDom} />
}

export default CloseButton;