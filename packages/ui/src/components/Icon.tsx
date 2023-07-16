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
import { ReactComponent as CloverColor } from '../assets/icons/CloverColor.svg';
import { ReactComponent as CloverDot } from '../assets/icons/CloverDot.svg';
import { ReactComponent as CloverNormal } from '../assets/icons/CloverNormal.svg';
import { ReactComponent as DeckAddLight } from '../assets/icons/DeckAdd-Light.svg';
import { ReactComponent as DeckAdd } from '../assets/icons/DeckAdd.svg';
import { ReactComponent as ExclamationWhite } from '../assets/icons/Exclamation-White.svg';
import { ReactComponent as FlowerColor } from '../assets/icons/FlowerColor.svg';
import { ReactComponent as FlowerDot } from '../assets/icons/FlowerDot.svg';
import { ReactComponent as FlowerNormal } from '../assets/icons/FlowerNormal.svg';
import { ReactComponent as FeatherColor } from '../assets/icons/FeatherColor.svg';
import { ReactComponent as FeatherNormal } from '../assets/icons/FeatherNormal.svg';
import { ReactComponent as FeatherDot } from '../assets/icons/FeatherDot.svg';
import { ReactComponent as GoLight } from '../assets/icons/Go-light.svg';
import { ReactComponent as GoWhite } from '../assets/icons/Go-White.svg';
import { ReactComponent as Go } from '../assets/icons/Go.svg';
import { ReactComponent as Home } from '../assets/icons/Home.svg';
import { ReactComponent as House } from '../assets/icons/House.svg';
import { ReactComponent as kakao } from '../assets/icons/kakao.svg';
import { ReactComponent as NailColor } from '../assets/icons/NailColor.svg';
import { ReactComponent as NailNormal } from '../assets/icons/NailNormal.svg';
import { ReactComponent as NailDot } from '../assets/icons/NailDot.svg';
import { ReactComponent as Order } from '../assets/icons/Order.svg';
import { ReactComponent as Pen } from '../assets/icons/Pen.svg';
import { ReactComponent as PlugColor } from '../assets/icons/PlugColor.svg';
import { ReactComponent as PlugDot } from '../assets/icons/PlugDot.svg';
import { ReactComponent as PlugNormal } from '../assets/icons/PlugNormal.svg';
import { ReactComponent as Question } from '../assets/icons/Question.svg';
import { ReactComponent as Share } from '../assets/icons/Share.svg';
import { ReactComponent as Shuffle } from '../assets/icons/Shuffle.svg';
import { ReactComponent as SproutColor } from '../assets/icons/SproutColor.svg';
import { ReactComponent as SproutNormal } from '../assets/icons/SproutNormal.svg';
import { ReactComponent as SproutDot } from '../assets/icons/SproutDot.svg';
import { ReactComponent as SwallowColor } from '../assets/icons/SwallowColor.svg';
import { ReactComponent as SwallowDot } from '../assets/icons/SwallowDot.svg';
import { ReactComponent as SwallowNormal } from '../assets/icons/SwallowNormal.svg';
import { ReactComponent as Top } from '../assets/icons/Top.svg';
import { ReactComponent as Touch } from '../assets/icons/Touch.svg';
import { ReactComponent as Trash } from '../assets/icons/Trash.svg';
import { ReactComponent as TurnipColor } from '../assets/icons/TurnipColor.svg';
import { ReactComponent as TurnipDot } from '../assets/icons/TurnipDot.svg';
import { ReactComponent as TurnipNormal } from '../assets/icons/TurnipNormal.svg';
import { ReactComponent as Welcome } from '../assets/icons/Welcome.svg';

const CARD_ICONS = {
  cloverColor: CloverColor,
  cloverNormal: CloverNormal,
  cloverDot: CloverDot,
  flowerColor: FlowerColor,
  flowerNormal: FlowerNormal,
  flowerDot: FlowerDot,
  featherColor: FeatherColor,
  featherNormal: FeatherNormal,
  featherDot: FeatherDot,
  nailColor: NailColor,
  nailNormal: NailNormal,
  nailDot: NailDot,
  plugColor: PlugColor,
  plugNormal: PlugNormal,
  plugDot: PlugDot,
  sproutColor: SproutColor,
  sproutNormal: SproutNormal,
  sproutDot: SproutDot,
  swallowColor: SwallowColor,
  swallowNormal: SwallowNormal,
  swallowDot: SwallowDot,
  turnipColor: TurnipColor,
  turnipNormal: TurnipNormal,
  turnipDot: TurnipDot,
};

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
  home: Home,
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
  ...CARD_ICONS,
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
