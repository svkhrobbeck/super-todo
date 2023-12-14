const FormInput = ({
  type = "text",
  name,
  labelText,
  required,
  autoFill = true,
  defaultValue = "",
}) => {
  return (
    <div className="flex flex-col [&:not(:last-child)]:mb-[15px]">
      <label className="select-none capitalize" htmlFor={name}>
        {labelText || name}
      </label>
      <input
        className="border border-1 border-black rounded"
        id={name}
        type={type}
        name={name}
        autoComplete={autoFill ? "on" : "off"}
        required={required}
        defaultValue={defaultValue}
      />
    </div>
  );
};
export default FormInput;
