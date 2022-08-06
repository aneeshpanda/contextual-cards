import PropTypes from "prop-types";

import "./Skeleton.styles.css";

const Skeleton = ({ className, isWhiteLoader = false }) => {
  return (
    <div
      className={`skeletonLoader ${className} ${isWhiteLoader} ? whiteLoader : darkLoader`}
    />
  );
};

export default Skeleton;

Skeleton.defaultProps = {
  className: "",
  isWhiteLoader: false,
};

Skeleton.propTypes = {
  className: PropTypes.string,
  isWhiteLoader: PropTypes.bool,
};
