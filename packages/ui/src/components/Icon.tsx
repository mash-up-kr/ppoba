import type { JSX, MouseEventHandler } from 'react';

import { ReactComponent as Add } from '../assets/icons/Add.svg';
import { ReactComponent as Alert } from '../assets/icons/Alert.svg';
import { ReactComponent as Arrow } from '../assets/icons/Arrow.svg';
import { ReactComponent as BackWhite } from '../assets/icons/Back-White.svg';
import { ReactComponent as Back } from '../assets/icons/Back.svg';
import { ReactComponent as Bookmark } from '../assets/icons/Bookmark.svg';
import { ReactComponent as CardcountWhite } from '../assets/icons/Cardcount-White.svg';
import { ReactComponent as Cardcount } from '../assets/icons/Cardcount.svg';
import { ReactComponent as Check } from '../assets/icons/Check.svg';
import { ReactComponent as CheckMarkWhite } from '../assets/icons/Checkmark-White.svg';
import { ReactComponent as Close } from '../assets/icons/Close.svg';
import { ReactComponent as DeckAddLight } from '../assets/icons/DeckAdd-Light.svg';
import { ReactComponent as DeckAdd } from '../assets/icons/DeckAdd.svg';
import { ReactComponent as ExclamationWhite } from '../assets/icons/Exclamation-White.svg';
import { ReactComponent as GoLight } from '../assets/icons/Go-light.svg';
import { ReactComponent as GoWhite } from '../assets/icons/Go-White.svg';
import { ReactComponent as Go } from '../assets/icons/Go.svg';
import { ReactComponent as House } from '../assets/icons/House.svg';
import { ReactComponent as kakao } from '../assets/icons/kakao.svg';
import { ReactComponent as Order } from '../assets/icons/Order.svg';
import { ReactComponent as Pen } from '../assets/icons/Pen.svg';
import { ReactComponent as Question } from '../assets/icons/Question.svg';
import { ReactComponent as Share } from '../assets/icons/Share.svg';
import { ReactComponent as Shuffle } from '../assets/icons/Shuffle.svg';
import { ReactComponent as Top } from '../assets/icons/Top.svg';
import { ReactComponent as Touch } from '../assets/icons/Touch.svg';
import { ReactComponent as Trash } from '../assets/icons/Trash.svg';
import { ReactComponent as Welcome } from '../assets/icons/Welcome.svg';

const ICONS = {
  add: Add,
  arrow: Arrow,
  alert: Alert,
  back: Back,
  backWhite: BackWhite,
  bookmark: Bookmark,
  cardcount: Cardcount,
  cardcountWhite: CardcountWhite,
  check: Check,
  checkMarkWhite: CheckMarkWhite,
  close: Close,
  deckAdd: DeckAdd,
  deckAddLight: DeckAddLight,
  exclamationWhite: ExclamationWhite,
  go: Go,
  goWhite: GoWhite,
  goLight: GoLight,
  house: House,
  kakao: kakao,
  order: Order,
  pen: Pen,
  question: Question,
  share: Share,
  shuffle: Shuffle,
  top: Top,
  touch: Touch,
  trash: Trash,
  welcome: Welcome,
};

export type IconType = keyof typeof ICONS;

type IconProps = {
  type: IconType;
  width?: number | string;
  height?: number | string;
  className?: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
};

function Icon({ type, width, height, className, onClick }: IconProps): JSX.Element {
  const SVGIcon = ICONS[type];

  return (
    <SVGIcon
      width={typeof width === 'number' ? `${width}px` : width}
      height={typeof height === 'number' ? `${height}px` : height}
      className={`${className} ${onClick ? 'cursor' : 'default'}`}
      role={onClick ? 'button' : 'img'}
      onClick={onClick}
    />
  );
}

export default Icon;
