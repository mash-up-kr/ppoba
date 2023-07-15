import type { JSX, MouseEventHandler } from 'react';

import { ReactComponent as Add } from '../assets/icons/Add.svg';
import { ReactComponent as Alert } from '../assets/icons/Alert.svg';
import { ReactComponent as Arrow } from '../assets/icons/Arrow.svg';
import { ReactComponent as Back } from '../assets/icons/Back.svg';
import { ReactComponent as BirdColor } from '../assets/icons/BirdColor.svg';
import { ReactComponent as BirdDot } from '../assets/icons/BirdDot.svg';
import { ReactComponent as BirdDotColor } from '../assets/icons/BirdDotColor.svg';
import { ReactComponent as BirdNormal } from '../assets/icons/BirdNormal.svg';
import { ReactComponent as BirdPoint } from '../assets/icons/BirdPoint.svg';
import { ReactComponent as Bookmark } from '../assets/icons/Bookmark.svg';
import { ReactComponent as Cardcount } from '../assets/icons/Cardcount.svg';
import { ReactComponent as Check } from '../assets/icons/Check.svg';
import { ReactComponent as CheckMarkWhite } from '../assets/icons/Checkmark-White.svg';
import { ReactComponent as Close } from '../assets/icons/Close.svg';
import { ReactComponent as CloverColor } from '../assets/icons/CloverColor.svg';
import { ReactComponent as CloverDot } from '../assets/icons/CloverDot.svg';
import { ReactComponent as CloverDotColor } from '../assets/icons/CloverDotColor.svg';
import { ReactComponent as CloverNormal } from '../assets/icons/CloverNormal.svg';
import { ReactComponent as CloverPoint } from '../assets/icons/CloverPoint.svg';
import { ReactComponent as DeckAddLight } from '../assets/icons/DeckAdd-Light.svg';
import { ReactComponent as DeckAdd } from '../assets/icons/DeckAdd.svg';
import { ReactComponent as DuckColor } from '../assets/icons/DuckColor.svg';
import { ReactComponent as DuckDot } from '../assets/icons/DuckDot.svg';
import { ReactComponent as DuckDotColor } from '../assets/icons/DuckDotColor.svg';
import { ReactComponent as DuckNormal } from '../assets/icons/DuckNormal.svg';
import { ReactComponent as DuckPoint } from '../assets/icons/DuckPoint.svg';
import { ReactComponent as ExclamationWhite } from '../assets/icons/Exclamation-White.svg';
import { ReactComponent as FlowerColor } from '../assets/icons/FlowerColor.svg';
import { ReactComponent as FlowerDot } from '../assets/icons/FlowerDot.svg';
import { ReactComponent as FlowerDotColor } from '../assets/icons/FlowerDotColor.svg';
import { ReactComponent as FlowerNormal } from '../assets/icons/FlowerNormal.svg';
import { ReactComponent as FlowerPoint } from '../assets/icons/FlowerPoint.svg';
import { ReactComponent as GoLight } from '../assets/icons/Go-light.svg';
import { ReactComponent as Go } from '../assets/icons/Go.svg';
import { ReactComponent as House } from '../assets/icons/House.svg';
import { ReactComponent as kakao } from '../assets/icons/kakao.svg';
import { ReactComponent as LeafColor } from '../assets/icons/LeafColor.svg';
import { ReactComponent as LeafDot } from '../assets/icons/LeafDot.svg';
import { ReactComponent as LeafDotColor } from '../assets/icons/LeafDotColor.svg';
import { ReactComponent as LeafNormal } from '../assets/icons/LeafNormal.svg';
import { ReactComponent as LeafPoint } from '../assets/icons/LeafPoint.svg';
import { ReactComponent as LeftDown } from '../assets/icons/LeftDown.svg';
import { ReactComponent as LeftDownBlue } from '../assets/icons/LeftDownBlue.svg';
import { ReactComponent as LeftDownGreen } from '../assets/icons/LeftDownGreen.svg';
import { ReactComponent as LeftDownOrange } from '../assets/icons/LeftDownOrange.svg';
import { ReactComponent as LeftDownPink } from '../assets/icons/LeftDownPink.svg';
import { ReactComponent as LeftDownPurple } from '../assets/icons/LeftDownPurple.svg';
import { ReactComponent as LeftDownRed } from '../assets/icons/LeftDownRed.svg';
import { ReactComponent as LeftDownTeal } from '../assets/icons/LeftDownTeal.svg';
import { ReactComponent as LeftDownYellow } from '../assets/icons/LeftDownYellow.svg';
import { ReactComponent as NailColor } from '../assets/icons/NailColor.svg';
import { ReactComponent as NailDot } from '../assets/icons/NailDot.svg';
import { ReactComponent as NailDotColor } from '../assets/icons/NailDotColor.svg';
import { ReactComponent as NailNormal } from '../assets/icons/NailNormal.svg';
import { ReactComponent as NailPoint } from '../assets/icons/NailPoint.svg';
import { ReactComponent as Order } from '../assets/icons/Order.svg';
import { ReactComponent as Pen } from '../assets/icons/Pen.svg';
import { ReactComponent as PlugColor } from '../assets/icons/PlugColor.svg';
import { ReactComponent as PlugDot } from '../assets/icons/PlugDot.svg';
import { ReactComponent as PlugDotColor } from '../assets/icons/PlugDotColor.svg';
import { ReactComponent as PlugNormal } from '../assets/icons/PlugNormal.svg';
import { ReactComponent as PlugPoint } from '../assets/icons/PlugPoint.svg';
import { ReactComponent as Question } from '../assets/icons/Question.svg';
import { ReactComponent as RightUp } from '../assets/icons/RightUp.svg';
import { ReactComponent as RightUpBlue } from '../assets/icons/RightUpBlue.svg';
import { ReactComponent as RightUpGreen } from '../assets/icons/RightUpGreen.svg';
import { ReactComponent as RightUpOrange } from '../assets/icons/RightUpOrange.svg';
import { ReactComponent as RightUpPink } from '../assets/icons/RightUpPink.svg';
import { ReactComponent as RightUpPurple } from '../assets/icons/RightUpPurple.svg';
import { ReactComponent as RightUpRed } from '../assets/icons/RightUpRed.svg';
import { ReactComponent as RightUpTeal } from '../assets/icons/RightUpTeal.svg';
import { ReactComponent as RightUpYellow } from '../assets/icons/RightUpYellow.svg';
import { ReactComponent as Share } from '../assets/icons/Share.svg';
import { ReactComponent as Shuffle } from '../assets/icons/Shuffle.svg';
import { ReactComponent as SproutColor } from '../assets/icons/SproutColor.svg';
import { ReactComponent as SproutDot } from '../assets/icons/SproutDot.svg';
import { ReactComponent as SproutDotColor } from '../assets/icons/SproutDotColor.svg';
import { ReactComponent as SproutNormal } from '../assets/icons/SproutNormal.svg';
import { ReactComponent as SproutPoint } from '../assets/icons/SproutPoint.svg';
import { ReactComponent as Top } from '../assets/icons/Top.svg';
import { ReactComponent as Touch } from '../assets/icons/Touch.svg';
import { ReactComponent as Trash } from '../assets/icons/Trash.svg';
import { ReactComponent as Welcome } from '../assets/icons/Welcome.svg';

const CARD_ICONS = {
  birdColor: BirdColor,
  birdNormal: BirdNormal,
  birdPoint: BirdPoint,
  birdDot: BirdDot,
  birdDotColor: BirdDotColor,
  cloverColor: CloverColor,
  cloverNormal: CloverNormal,
  cloverPoint: CloverPoint,
  cloverDot: CloverDot,
  cloverDotColor: CloverDotColor,
  duckColor: DuckColor,
  duckNormal: DuckNormal,
  duckPoint: DuckPoint,
  duckDot: DuckDot,
  duckDotColor: DuckDotColor,
  flowerColor: FlowerColor,
  flowerNormal: FlowerNormal,
  flowerPoint: FlowerPoint,
  flowerDot: FlowerDot,
  flowerDotColor: FlowerDotColor,
  leafColor: LeafColor,
  leafNormal: LeafNormal,
  leafPoint: LeafPoint,
  leafDot: LeafDot,
  leafDotColor: LeafDotColor,
  nailColor: NailColor,
  nailNormal: NailNormal,
  nailPoint: NailPoint,
  nailDot: NailDot,
  nailDotColor: NailDotColor,
  plugColor: PlugColor,
  plugNormal: PlugNormal,
  plugPoint: PlugPoint,
  plugDot: PlugDot,
  plugDotColor: PlugDotColor,
  sproutColor: SproutColor,
  sproutNormal: SproutNormal,
  sproutPoint: SproutPoint,
  sproutDot: SproutDot,
  sproutDotColor: SproutDotColor,

  // arrow
  leftDown: LeftDown,
  leftDownBlue: LeftDownBlue,
  leftDownGreen: LeftDownGreen,
  leftDownOrange: LeftDownOrange,
  leftDownPink: LeftDownPink,
  leftDownPurple: LeftDownPurple,
  leftDownRed: LeftDownRed,
  leftDownTeal: LeftDownTeal,
  leftDownYellow: LeftDownYellow,
  rightUp: RightUp,
  rightUpBlue: RightUpBlue,
  rightUpGreen: RightUpGreen,
  rightUpOrange: RightUpOrange,
  rightUpPink: RightUpPink,
  rightUpPurple: RightUpPurple,
  rightUpRed: RightUpRed,
  rightUpTeal: RightUpTeal,
  rightUpYellow: RightUpYellow,
};

const ICONS = {
  add: Add,
  arrow: Arrow,
  alert: Alert,
  back: Back,
  bookmark: Bookmark,
  cardcount: Cardcount,
  check: Check,
  checkMarkWhite: CheckMarkWhite,
  close: Close,
  deckAdd: DeckAdd,
  deckAddLight: DeckAddLight,
  exclamationWhite: ExclamationWhite,
  go: Go,
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
