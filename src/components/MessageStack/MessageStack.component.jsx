import { useContext } from "react";

import { MessageContext } from "../../context/Message.context";

import Error from "./components/Error/Error.component";
import Success from "./components/Success/Success.component";

import "./MessageStack.styles.css";

const MessageStack = () => {
  const { errorsArray, removeError, successArray, removeSuccess } =
    useContext(MessageContext);

  return (
    <div className="errorStack">
      {errorsArray?.map((error) => (
        <Error
          error={error}
          remove={() => removeError(error.id)}
          key={error.id}
        />
      ))}
      {successArray?.map((success) => (
        <Success
          success={success}
          remove={() => removeSuccess(success.id)}
          key={success.id}
        />
      ))}
    </div>
  );
};

export default MessageStack;
