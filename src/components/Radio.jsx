import React from 'react'

const Radio = ({ value,name,label, checked, id, onChange, hidden, labelClass }) => {
  return (
    <div>
    <label htmlFor={id} className="flex justify-start items-center gap-4 p-1">
      <input id={id} hidden={hidden} name={name} className="w-4 h-4 rounded-full peer  focus:ring-2" onChange={onChange} type="radio"  defaultChecked={checked}   defaultValue={value} />
      <p className={labelClass}>{label}</p>
    </label>
  </div>
  )
}

export default Radio