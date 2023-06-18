import type { JSX, MouseEventHandler } from 'react';

interface Props {
  id?: string;
  value: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function ToggleButton({ id = 'switch', value, onClick }: Props): JSX.Element {
  return (
    <button type="button" onClick={onClick}>
      <label
        id={id}
        htmlFor={id}
        className={`block w-[54px] h-[30px] ${
          value ? 'bg-[#E65C5C]' : 'bg-[#DFDFDF]'
        } relative rounded-[200px] cursor-pointer`}
      >
        <span
          className={`w-6 h-6 bg-[#ffffff] absolute top-[3px] -translate-x-full rounded-full transition-all ${
            value ? 'animate-slide-right-toggle left-[calc(100%-3px)]' : 'animate-slide-left-toggle '
          }`}
        />
      </label>
    </button>
  );
}

export default ToggleButton;
