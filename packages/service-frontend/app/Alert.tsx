import { useEffect } from 'react'

import { Button, Icon, SecondaryButton } from '@ppoba/ui'

interface Props {
  alertPhrase: string
  closePhrase: string
  confirmPhrase: string
  onClickClose: VoidFunction
  onClickConfirm: VoidFunction
}

function Alert({
  alertPhrase,
  closePhrase,
  confirmPhrase,
  onClickClose,
  onClickConfirm,
}: Props): JSX.Element {
  useEffect(() => {
    document.body.classList.add('overflow-hidden')

    // Make sure to clean up after the component unmounts
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  return (
    <>
      <div className="absolute w-full bottom-0 left-1/2 -translate-x-1/2 z-[9999] pt-[40px] pb-[16px] px-[24px] flex flex-col text-center justify-between gap-[40px] bg-white rounded-t-[24px]">
        <div className="mx-auto">
          <Icon type="alert" width={30} height={30} className="mx-auto" />
          <div className="mt-[8px] headline-3 whitespace-pre-line text-black">
            {alertPhrase}
          </div>
        </div>
        <div className="flex gap-[10px]">
          <SecondaryButton size="medium" onClick={onClickClose}>
            {closePhrase}
          </SecondaryButton>
          <Button size="medium" onClick={onClickConfirm}>
            {confirmPhrase}
          </Button>
        </div>
        {/* DIM */}
      </div>
      <div
        role="button"
        className="absolute w-full h-full bottom-0 left-0 bg-grey-500 opacity-80 content-['']"
        onClick={onClickClose}
      ></div>
    </>
  )
}

export default Alert
