// modules
import { forwardRef, ChangeEvent, FormEvent, useEffect, useState, useImperativeHandle } from "react";
// styles
import './textbox.css';

interface ITextbox {
  onChange: (value: string) => void;
  onClear: () => void;
  onAdd: (value: string) => void;
  addDisabled: boolean;
}

/** the gap to reduce table re-renders */
const WAIT = 400;
let timeout: string | number | NodeJS.Timeout | undefined;

function Textbox(props: ITextbox, ref: any) {
  const { onChange, onAdd, addDisabled, onClear } = props;
  const [value, setValue] = useState('');

  useImperativeHandle(ref, () => ({
    clear: () => {
      setValue('');
    }
  }), [])

  useEffect(() => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      onChange(value);
    }, WAIT);
  }, [onChange, value]);

  const handleClear = () => {
    setValue('');
    onClear();
  }

  const handleChange = (e?: ChangeEvent<HTMLInputElement>) => {
    setValue(e?.target?.value || '');
  };

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onAdd(value);
  };

  return (
    <div className="textbox">
      <form onSubmit={handleAdd}>
        <input ref={ref} onChange={handleChange} value={value} placeholder="Search a poke..." />
        <button type='submit' disabled={addDisabled}>add</button>
      </form>
      <button type='button' onClick={handleClear}>clear data</button>
    </div>
  )
}

export default forwardRef(Textbox);