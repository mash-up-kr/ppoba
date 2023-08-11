/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const getDummyTextarea = () => {
  const textarea = document.createElement('textarea') as HTMLTextAreaElement
  textarea.style.top = '0'
  textarea.style.left = '0'
  textarea.style.display = 'fixed'

  return textarea
}

export const isClipboardSupported = () => navigator?.clipboard != null
export const isClipboardCommandSupported = () =>
  document.queryCommandSupported?.('copy') ?? false

/**
 * 인자로 받은 텍스트를 클립보드에 복사합니다.
 * @param text 복사할 텍스트
 *
 * @example
 * ```ts
 * const result = await copyToClipboard('하이');
 * if (result) {
 *   console.log('클립보드에 복사 성공');
 * } else {
 *   console.log('클립보드에 복사 실패');
 * }
 * ```
 */
export const copyToClipboard = (text: string) => {
  return new Promise<boolean>(resolve => {
    const rootElement = document.body

    if (isClipboardCommandSupported()) {
      const textarea = getDummyTextarea()
      textarea.value = text

      rootElement.appendChild(textarea)

      textarea.focus()
      textarea.select()

      document.execCommand('copy')
      rootElement.removeChild(textarea)
      resolve(true)
      return
    }

    resolve(false)
    return
  })
}

export const isShareSupported = () => navigator.share ?? false

/**
 * 인자로 받은 data를 OS 기본옵션으로 공유합니다.
 * 기본 공유옵션이 지원되지 않을 경우, url만을 클립보드에 링크를 복사하는 기능으로 대체됩니다.
 *
 * @param data 공유할 data 객체
 * @param data.url 공유될 또는 클립복드에 복사될 url
 * @param data.text 공유시 해당 메신저에 추가적인 텍스트로 전달되는 문구
 * @param data.title 공유시 썸네일에 제공되는 타이틀 문구
 * @param data.files 공유할 file 리스트
 *
 * @example
 * ```ts
 * const result = await share('data');
 * if (result === 'share') {
 *   console.log('공유 성공');
 * } else if (result === 'clipboard') {
 *   console.log('클립보드 복사 성공');
 * } else {
 *   console.log('공유 실패');
 * }
 * ```
 */

export const share = (data: ShareData) => {
  return new Promise<'shared' | 'copiedToClipboard' | 'failed'>(
    async resolve => {
      if (isShareSupported()) {
        await navigator.share(data)
        resolve('shared')
        return 'shared'
      }

      if (data.url) {
        const result = await copyToClipboard(data.url)

        if (result) {
          resolve('copiedToClipboard')
          return 'copiedToClipboard'
        }
      }
      resolve('failed')
      return 'failed'
    },
  )
}
