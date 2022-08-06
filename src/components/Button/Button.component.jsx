import PropTypes from "prop-types";

import "./Button.styles.css";

const Button = ({ icon, text, action }) => {
  return (
    <button
      type="button"
      onClick={(e) => action(e)}
      onTouchStart={(e) => action(e)}
      className="button"
    >
      <img src={icon} alt={text} />
      <span>{text}</span>
    </button>
  );
};

export default Button;

Button.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};
