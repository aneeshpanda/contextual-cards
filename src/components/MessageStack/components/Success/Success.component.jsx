import { useEffect, useRef } from "react";

import PropTypes from "prop-types";

import Close from "../../../../assets/icons/close.svg";
import PartyPopper from "../../../../assets/icons/party_popper.svg";
import RoundedTick from "../../../../assets/icons/rounded_tick.svg";

import "./Success.styles.css";

const Success = ({ success, remove }) => {
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
        {success.isDeleted ? (
          <img src={RoundedTick} alt="rounded_tick" color="#ffffff" />
        ) : (
          <img src={PartyPopper} alt="party_popper" color="#ffffff" />
        )}
        {success.text}
      </div>
    </div>
  );
};

export default Success;

Success.propTypes = {
  success: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isDeleted: PropTypes.bool,
  }).isRequired,
  remove: PropTypes.func.isRequired,
};
