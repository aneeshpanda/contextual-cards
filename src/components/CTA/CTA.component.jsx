import PropTypes from "prop-types";

import "./CTA.styles.css";

const CTA = ({ text, bgColor, textColor, url }) => {
  return (
    <a
      href={url}
      style={{ background: bgColor, color: textColor }}
      className="cta"
    >
      {text}
    </a>
  );
};

export default CTA;

CTA.defaultProps = {
  textColor: "white",
  bgColor: "black",
  url: "#",
};

CTA.propTypes = {
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  url: PropTypes.string,
};
