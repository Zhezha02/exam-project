import React from "react";
import styles from "./Error.module.sass";

const Error = (props) => {
  const { status, data, clearError } = props;
  const getMessage = () => {
    switch (status) {
      case 400:
        return "Check the input data";
      case 401:
        return "Unauthorized";
      case 403:
        return "Bank decline transaction";
      case 404:
      case 406:
      case 409:
        return data;
      default:
        return "Server Error";
    }
  };

  return (
    <div className={styles.errorContainer}>
      <span>{getMessage()}</span>
      <i className="far fa-times-circle" onClick={() => clearError()} />
    </div>
  );
};

export default Error;
