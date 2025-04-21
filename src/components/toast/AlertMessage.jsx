import { memo, useEffect, useState } from "react";

const AlertMessage = ({ status, message, isDisplay, setAlert }) => {
  let title = status === 1 ? "Success" : "Warning";
  let alertType = status === 1 ? "success" : "warning";
  var [display, setDisplay] = useState(isDisplay);

  useEffect(() => {
    setDisplay(isDisplay);
    // hide alert after 5 seconds
    if (isDisplay) {
      setTimeout(() => {
        setDisplay(false);
        setAlert({ isDisplay: false });
      }, process.env.REACT_APP_DEFAULT_ALERT_TIMEOUT);
    }
  }, [isDisplay, setAlert]);

  return (
    <div className="py-2">
      <div
        className={`position-absolute top-0 end-0 custom-alert ${
          !display && "pos-index-val"
        }`}
      >
        <div
          className={`alert alert-${alertType} alert-dismissible fade ${
            display && "show"
          }`}
          role="alert"
        >
          <h6>{title}</h6>
          <p>{message}</p>
          <button
            type="button"
            className="btn-close btn-sm"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setDisplay(false)}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default memo(AlertMessage);
