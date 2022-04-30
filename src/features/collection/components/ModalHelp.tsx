import React, { useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";

import "./ModalHelp.css";

export const ModalHelp = () => {
  const [inHover, setHover] = useState(false);

  return (
    <div className="modal-help">
      <div className="help-icon-container">
        <BsQuestionCircle
          className="help-icon"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      </div>
      {inHover && (
        <div className="help-information">
          <p>Тэг=хэш-тэг, например, #пример</p>
          <p>Ключевое понятие состоит максимум из 2х слов</p>
        </div>
      )}
    </div>
  );
};

export default ModalHelp;
