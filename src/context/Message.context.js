/* eslint-disable no-unused-vars */

import { useState, createContext } from "react";
import PropTypes from "prop-types";

const initialState = {
  errorsArray: [],
  successArray: [],
  test: () => {},
  addError: () => {},
  addSuccess: () => {},
  removeError: () => {},
  removeSuccess: () => {},
};
export const MessageContext = createContext(initialState);

export const MessageProvider = ({ children }) => {
  const [errorsArray, setErrorsArray] = useState([]);
  const [successArray, setSuccessArray] = useState([]);

  const addSuccess = (text, isDeleted = false) => {
    const newSuccess = {
      id: String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now(),
      text,
      isDeleted,
    };
    setSuccessArray((prev) => [...prev, newSuccess]);
  };

  const removeSuccess = (id) => {
    setSuccessArray((prev) => prev.filter((success) => success.id !== id));
  };

  const addError = (text) => {
    const newError = {
      id: String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now(),
      text,
    };
    setErrorsArray((prev) => [...prev, newError]);
  };

  const removeError = (id) => {
    setErrorsArray((prev) => prev.filter((error) => error.id !== id));
  };

  const test = () => {
    console.log("Works!");
  };

  return (
    <MessageContext.Provider
      value={{
        errorsArray,
        addError,
        removeError,
        successArray,
        addSuccess,
        removeSuccess,
        test,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

MessageProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
