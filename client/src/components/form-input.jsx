const FormInput = ({
  type = "text",
  name,
  labelText,
  required,
  disableLabel = false,
  autoFill = true,
  defaultValue = "",
  onChange = null,
}) => {
  return (
    <div className="flex w-full flex-col [&:not(:last-child)]:mb-[15px]">
      {!disableLabel && (
        <label className="select-none capitalize" htmlFor={name}>
          {labelText || name}
        </label>
      )}
      <input
        className="py-[8px] px-[10px] placeholder:capitalize border border-1 border-black rounded"
        id={name}
        type={type}
        name={name}
        autoComplete={autoFill ? "on" : "off"}
        required={required}
        placeholder={labelText || name}
        defaultValue={defaultValue}
        onChange={e => onChange(e)}
      />
    </div>
  );
};
export default FormInput;
