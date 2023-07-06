import type { JSX } from 'react';
import Icon from './Icon';

interface Props<T extends string> {
  value: T;
  options: [T, T];
  onClickItem: (item: T) => void;
}

function TwoOptionRadioButton<T extends string>({ value, options, onClickItem }: Props<T>): JSX.Element {
  if (options.length !== 2) {
    throw new Error('invalid size error, Please put two values in options');
  }

  const isLeftActive = value === options[0];
  const isRightActive = value === options[1];

  return (
    <div className="flex w-full text-center">
      <button
        type="button"
        onClick={() => onClickItem(options[0])}
        className={`flex gap-1 justify-center items-center flex-1 py-[18px] border-l border-y rounded-l-[20px] headline-4 transition-all bg-white ${
          isLeftActive ? 'border-r border-grey-500 text-grey-800' : 'border-grey-200 text-grey-200'
        }`}
      >
        {options[0]}
        {isLeftActive && <Icon type={'check'} width={20} height={20} />}
      </button>
      <button
        type="button"
        onClick={() => onClickItem(options[1])}
        className={`flex gap-1 justify-center items-center flex-1 relative py-[18px] border-r border-y rounded-r-[20px] bg-white transition-all ${
          isRightActive ? 'border-l border-grey-500 text-grey-800' : 'border-grey-200 text-grey-200'
        }`}
      >
        {options[1]}
        {isRightActive && <Icon type={'check'} width={20} height={20} />}
      </button>
    </div>
  );
}

export default TwoOptionRadioButton;
