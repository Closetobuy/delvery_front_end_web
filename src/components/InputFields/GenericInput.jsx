import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

const GenericInput = ({
  type,
  className,
  id,
  autoComplete,
  onChange,
  value,
  placeHolder,
  isRequired = false,
  ariaDescribedBy,
  onFocus,
  onBlur,
  isFocused,
  isValid,
  invalidText,
}) => {
  return (
    <div>
      <div className="form-group mb-6">
        <input
          type={type}
          className={className}
          id={id}
          autoComplete={autoComplete}
          onChange={onChange}
          value={value}
          placeholder={placeHolder}
          required={isRequired}
          aria-describedby={ariaDescribedBy}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      {isFocused && !isValid ? (
        <div id="confirmnote" className={"flex flex-row gap-2 -mt-4 mb-3"}>
          <ExclamationCircleIcon
            className={
              "flex-none w-5 text-gray-500 items-center justify-center"
            }
          ></ExclamationCircleIcon>
          <p className={"flex-grow text-black text-sm items-center"}>
            {invalidText}
          </p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default GenericInput;
