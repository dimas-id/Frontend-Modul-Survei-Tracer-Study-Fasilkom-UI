import React from "react";
import PropTypes from "prop-types";

import { Guidelines } from "../../styles";
import homeCategory from "../../assets/homeCategory";

const styles = {
  img: {
    ...Guidelines.layouts.flexMiddle,
    width: "100%",
  }
};

export default function HomeCategory({
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
      src={homeCategory[name]}
      alt="cloud"
      style={{ ...styles.img, left, right, top, bottom, ...style }}
    />
  );
}

HomeCategory.propTypes = {
  className: PropTypes.string,
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired
};

HomeCategory.defaultProps = {
  className: ""
};
