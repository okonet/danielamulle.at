import * as PropTypes from "prop-types"
import styled from "@emotion/styled"

export const ParallaxGroup = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
  transform-style: preserve-3d;
`

export const ParallaxContainer = styled.div`
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  perspective: ${(props) => (props.debug ? "300px" : "1px")};
  & ${ParallaxGroup} {
    transform: ${(props) =>
      props.debug ? "translate3d(700px, 0, -800px) rotateY(30deg)" : ""};
  }
`

ParallaxContainer.propTypes = {
  debug: PropTypes.bool,
}

ParallaxContainer.defaultProps = {
  debug: false,
}

export const ParallaxLayer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: ${(props) =>
    `translateZ(${props.depth * -1}px) scale(${props.depth + 1})`};
`

ParallaxLayer.propTypes = {
  depth: PropTypes.number,
}
ParallaxLayer.defaultProps = {
  depth: 0,
}
