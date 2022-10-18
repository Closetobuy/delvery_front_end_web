const fixedInputClass = "rounded-md apperance-none relative block w-full px-3 py02 border border-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";


 const Input  = ({
    handleChange,
    value,
    labelText,
    labelFor,
    id,
    name,
    type,
    isRequired=false,
    useRef,
    placeholder,
    customClass
})  => {
    return (
        <div className="my-5">
        <label htmlFor={labelFor} className="sr-only">
          {labelText}
        </label>
        <input
          onChange={handleChange}
          value={value}
          id={id}
          name={name}
          type={type}
          useRef={useRef}
          required={isRequired}
          className={customClass}
          placeholder={placeholder}
        />
      </div>
    );
};

export default Input;