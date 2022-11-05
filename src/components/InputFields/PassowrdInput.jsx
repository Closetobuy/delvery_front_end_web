import React from "react";
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";

const PasswordInput = ({
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
  showPassword,
  setShowPassword,
}) => {
  return (
    <div>
      <div className="relative flex block form-group mb-6">
        {showPassword ? (
          <EyeIcon
            height={10}
            width={10}
            className="wpointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 right-3 text-blue-400"
            onClick={setShowPassword}
          />
        ) : (
          <EyeSlashIcon
            height={12}
            width={12}
            className="wpointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400"
            onClick={setShowPassword}
          />
        )}
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

export default PasswordInput;
