import Icon from './Icon';

type Props = {
  text: string;
  selected: boolean;
  onClick: VoidFunction;
};

function TextCheckBox({ text, selected, onClick }: Props): JSX.Element {
  return (
    <button
      type="button"
      className={`w-fit flex gap-1 items-center px-3 py-2 rounded-[14px] transition-all cursor-pointer headline-4 ${
        selected ? 'bg-grey-700 text-white' : 'bg-light text-grey-300'
      }`}
      onClick={onClick}
    >
      {text}
      {selected ? (
        <Icon type="checkMarkWhite" width={20} height={20} />
      ) : (
        <Icon type="deckAddLight" width={20} height={20} />
      )}
    </button>
  );
}

export default TextCheckBox;
