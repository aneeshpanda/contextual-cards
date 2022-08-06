import { useEffect, useRef } from "react";

import PropTypes from "prop-types";

import Close from "../../../../assets/icons/close.svg";
import Caution from "../../../../assets/icons/caution.svg";

import "./Error.styles.css";

const Error = ({ error, remove }) => {
  const timeoutId = useRef();

  useEffect(() => {
    timeoutId.current = setTimeout(() => {
      remove();
    }, 10000);
  });

  const handleClose = (e) => {
    e.preventDefault();
    clearTimeout(timeoutId.current);
    setTimeout(() => remove(), 100);
  };
  const handleKeydownClose = (e) => {
    e.preventDefault();
    if (e.key === "Escape") {
      clearTimeout(timeoutId.current);
      setTimeout(() => remove(), 100);
    }
  };

  return (
    <div className="errorBox isActive">
      <span
        role="button"
        tabIndex="0"
        className="closeIcon"
        onClick={(e) => {
          handleClose(e);
        }}
        onKeyDown={(e) => {
          handleKeydownClose(e);
        }}
      >
        <img src={Close} alt="close" />
      </span>
      <div className="errorText">
        <img src={Caution} alt="caution" color="#ffffff" />
        {error.text}
      </div>
    </div>
  );
};

export default Error;

Error.propTypes = {
  error: PropTypes.shape({ text: PropTypes.string.isRequired }).isRequired,
  remove: PropTypes.func.isRequired,
};
