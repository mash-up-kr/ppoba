import { useRouter } from 'next/navigation'
import { Icon } from '@ppoba/ui'

interface Props {
  onClickClose: () => void
}

export default function OnboardingOverlay({
  onClickClose,
}: Props): JSX.Element {
  const router = useRouter()
  return (
    <div className="flex flex-col justify-center items-center h-full gap-[10px]">
      {/* <button
        onClick={() => router.push('/create-title')}
        className="flex justify-center items-center w-[240px] px-[24px] py-[16px] subtitle-2 text-white text-center rounded-[32px] bg-black gap-[10px]"
      >
        <div className="p-[6px] bg-orange-01 rounded-full">
          <Icon type="crop" width={20} height={20} />
        </div>
        <div className="flex-1">처음부터 만들기</div>
      </button>
      <button
        onClick={() => router.push('/create-template')}
        className="flex justify-center items-center w-[240px] px-[24px] py-[16px] subtitle-2 text-white text-center rounded-[32px] bg-black gap-[10px]"
      >
        <div className="p-[6px] bg-blue-01 rounded-full">
          <Icon type="note" width={20} height={20} />
        </div>
        <div className="flex-1">템플릿으로 만들기</div>
      </button>
      <button
        onClick={onClickClose}
        className="mt-[10px] p-[14px] bg-white bg-opacity-[0.1] rounded-full"
      >
        <Icon type="closeLight" width={24} height={24} />
      </button> */}
    </div>
  )
}
