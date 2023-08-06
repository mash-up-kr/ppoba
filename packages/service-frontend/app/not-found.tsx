'use client'

import Lottie from 'lottie-react'
import { useRouter } from 'next/navigation'
import { Button, Icon } from '@ppoba/ui'

import { ContentWrapper } from '@/app/components'

// TODO: Change loading animation
export default function NotFound(): JSX.Element {
  const router = useRouter();
  return (
    <ContentWrapper>
      <div className="min-h-screen flex flex-col">
        <h2 className='headline-1 mt-[80px]'>아무래도<br />뭔가 잘못된 것 같아..</h2>
        <div className='flex justify-center items-center w-[120px] h-[160px] mt-[120px] rounded-2xl bg-grey-100 mx-auto'>
          <Icon type="alert" width={60} height={60} className='opacity-[0.7]' />
        </div>
        <Button
          size="large"
          className="headline-4 text-white mt-[120px]"
          rightIcon="goLight"
          onClick={() => router.back()}
        >
          이전 화면으로 돌아가기
        </Button>
      </div>
    </ContentWrapper>
  )
}
