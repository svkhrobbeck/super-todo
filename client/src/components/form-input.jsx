const FormInput = props => {
  return (
    <div className="flex w-full flex-col [&:not(:last-child)]:mb-[15px]">
      {!props.disableLabel && (
        <label className="select-none capitalize" htmlFor={props.name}>
          {props.labelText || props.name}
        </label>
      )}
      <input
        className="py-[8px] w-full px-[10px] placeholder:capitalize border border-1 border-black rounded"
        id={props.name}
        type={props.type}
        name={props.name}
        autoComplete={props.autoFill ? "on" : "off"}
        required={props.required}
        disabled={props.disabled}
        readOnly={props.readOnly}
        placeholder={props.labelText || props.name}
        defaultValue={props.defaultValue}
        onChange={e => props.onChange(e)}
      />
    </div>
  );
};
export default FormInput;
