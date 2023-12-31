import React from "react";
import PropTypes from "prop-types";

import { Guidelines } from "../../styles";
import Particles from "../../assets/particles";

const styles = {
  img: {
    ...Guidelines.layouts.posAbs,
    zIndex: -10
  }
};

export default function Particle({
  left,
  right,
  top,
  bottom,
  name,
  className,
  style
}) {
  return (
    <img
      className={className}
      src={Particles[name]}
      alt="cloud"
      style={{ ...styles.img, left, right, top, bottom, ...style }}
    />
  );
}

Particle.propTypes = {
  className: PropTypes.string,
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired
};

Particle.defaultProps = {
  className: ""
};
