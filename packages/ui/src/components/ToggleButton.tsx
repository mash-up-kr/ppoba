import type { JSX, MouseEventHandler } from 'react';

interface Props {
  id?: string;
  value: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function ToggleButton({ id = 'switch', value, onClick }: Props): JSX.Element {
  return (
    <button type="button" onClick={onClick} className="w-[54px] h-[30]px cursor-pointer">
      <label
        htmlFor={id}
        className={`block w-[54px] h-[30px] ${
          value ? 'bg-[#E65C5C]' : 'bg-[#DFDFDF]'
        } relative rounded-[200px] cursor-pointer`}
      >
        <span
          className={`w-6 h-6 bg-[#ffffff] absolute top-[3px] -translate-x-full rounded-full cursor-pointer transition-all duration-700 ease-in-out ${
            value ? 'animate-slide-right-toggle left-[calc(100%-3px)]' : 'left-1/2'
          }`}
        />
      </label>
    </button>
  );
}

export default ToggleButton;
