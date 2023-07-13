import type { JSX } from 'react';

import Icon from './Icon';
import { XOR } from '../utils';

type TextProps = {
  text: string;
};

type Props = XOR<
  TextProps,
  {
    iconType: Parameters<typeof Icon>[0]['type'];
    iconWidth: Parameters<typeof Icon>[0]['width'];
    iconHeight: Parameters<typeof Icon>[0]['height'];
  } & TextProps
>;

function AlertMessage({ text, iconType, iconWidth, iconHeight }: Props): JSX.Element {
  return (
    <div
      className={`w-fit box-border py-[10px] flex items-center gap-0.5 rounded-[18px] bg-[#101010]/60 backdrop-blur-sm ${
        iconType ? 'pl-4 pr-6' : 'px-5'
      }`}
    >
      {iconType && <Icon type={iconType} width={iconWidth} height={iconHeight} />}
      <span className="subtitle-3 text-white">{text}</span>
    </div>
  );
}

export default AlertMessage;
