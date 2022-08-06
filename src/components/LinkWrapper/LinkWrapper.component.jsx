import PropTypes from "prop-types";

const LinkWrapper = ({ display, url, children, className, style }) => {
  if (display)
    return (
      <a className={className} href={url} style={style}>
        {children}
      </a>
    );
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default LinkWrapper;

LinkWrapper.defaultProps = {
  style: {},
};
LinkWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  display: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
};
