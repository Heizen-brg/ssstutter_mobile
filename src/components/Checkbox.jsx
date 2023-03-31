import React, {forwardRef} from "react";

const Checkbox = forwardRef(({ value, label, checked, id, onChange,onClick, hidden,labelClass, style },ref) => {
  return (
    <div>
      <label htmlFor={id} className="flex justify-start items-center gap-4 p-1">
        <input id={id} hidden={hidden}  className="w-4 h-4 rounded-md focus:ring-2 peer" onClick={onClick} onChange={onChange} type="checkbox" checked={checked}   defaultValue={value} />
        <p ref={ref} className={labelClass} style={style}>{label}</p>
      </label>
    </div>
  );
})
export default Checkbox;
