import styled from 'styled-components'
import { Label } from './components/Label'
import { InputWrapper } from './components/InputWrapper'
import { Input } from './components/Input'
import { DateInput } from './components/DateInput'
import { TimeSelect } from './components/TimeSelect'
import { Checkbox } from './components/Checkbox'
import { TextArea } from './components/TextArea'
import { Button } from './components/Button'
import { useForm, Controller } from 'react-hook-form'
import { Tooltip } from './components/Tooltip'
import { useQRCode } from './hooks/useQRCode'
import { isValidEndTimeForTimedDay, isValidEndTimeForAllDay } from './helpers/validation'
import { colors } from './consts/colors'

const StyledMainWrapper = styled.div`
  background-color: ${colors.brand};
  padding: 40px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  row-gap: 40px;

  @media (max-width: 767px) {
    padding: 8px;
    row-gap: 8px;
  }
`

const StyledMainContent = styled.div`
  width: 100%;
  max-width: 608px;
  margin: 0 auto;
  padding: 24px 32px;
  border-radius: 8px;
  background-color: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 24px;

  > h1 {
    font-size: 24px;
    font-weight: 700;
    line-height: 1.3;
  }

  @media (max-width: 767px) {
    padding: 16px;
  }
`

const StyledRow = styled.div`
  width: 100%;
`

const StyledDateTimeRow = styled.div`
  display: flex;
  column-gap: 16px;
  margin-bottom: 12px;

  @media (max-width: 767px) {
    flex-direction: column;
    column-gap: 0;
    row-gap: 24px;
    margin-bottom: 16px;
  }
`

const StyledDateTimeWrapper = styled.div`
  display: flex;
  column-gap: 8px;
`

const StyledAllDayCheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  column-gap: 8px;
  cursor: pointer;
`

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
`

const StyledGeneratedArea = styled.div`
  > p {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 12px;
  }

  > img {
    display: block;
    margin: 0 auto;
  }
`

export type FormData = {
  title: string
  startDate: Date
  startTime: string
  endDate: Date
  endTime: string
  allDay: boolean
  memo: string
  location: string
  url: string
}

function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>()
  const { qrCodeUrl, generateQRCode } = useQRCode()

  const allDay = watch('allDay')

  const onSubmit = (data: FormData) => {
    // フォームデータを渡してQRコード生成
    generateQRCode(data)
  }

  return (
    <StyledMainWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledMainContent>
          <h1>予定作成QRコードの生成</h1>
          <StyledRow>
            <InputWrapper>
              <Label required>予定タイトル</Label>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                rules={{
                  required: '予定タイトルは必須です',
                  maxLength: { value: 50, message: '最大文字数を超えています' },
                }}
                render={({ field: { ref: _, ...rest } }) => (
                  <Input
                    {...rest}
                    id="title"
                    type="text"
                    placeholder="TimeTree Day"
                    hasError={!!errors.title?.message}
                  />
                )}
              />
              {errors.title?.message &&
                typeof errors.title.message === 'string' && (
                  <Tooltip
                    message={errors.title.message || ''}
                    targetElement={document.getElementById('title')}
                  />
                )}
            </InputWrapper>
          </StyledRow>
          <StyledRow>
            <StyledDateTimeRow>
              <InputWrapper>
                <Label required>開始日時</Label>
                <StyledDateTimeWrapper>
                  <Controller
                    name="startDate"
                    control={control}
                    defaultValue={new Date()}
                    rules={{ required: '開始日時は必須です' }}
                    render={({ field: { ref: _, ...rest } }) => (
                      <DateInput
                        {...rest}
                        id="startDate"
                        hasError={!!errors.startDate?.message}
                      />
                    )}
                  />
                  {errors.startDate?.message &&
                    typeof errors.startDate.message === 'string' && (
                      <Tooltip
                        message={errors.startDate.message || ''}
                        targetElement={document.getElementById('startDate')}
                      />
                    )}
                  {!allDay && (
                    <Controller
                      name="startTime"
                      control={control}
                      defaultValue="00:00"
                      render={({ field: { ref: _, ...rest } }) => (
                        <TimeSelect {...rest} />
                      )}
                    />
                  )}
                </StyledDateTimeWrapper>
              </InputWrapper>
              <InputWrapper>
                <Label required>終了日時</Label>
                <StyledDateTimeWrapper>
                  <Controller
                    name="endDate"
                    control={control}
                    defaultValue={new Date()}
                    rules={{
                      required: '終了日時は必須です',
                      validate: () => {
                        if (allDay) {
                          return isValidEndTimeForAllDay(watch("startDate"), watch("endDate")) || "終了日時が開始日時を超えています";
                        }
                        return isValidEndTimeForTimedDay(watch("startDate"), watch("endDate"), watch("startTime"), watch("endTime")) || "終了日時が開始日時を超えています";
                      }

                    }}
                    render={({ field: { ref: _, ...rest } }) => (
                      <DateInput
                        {...rest}
                        id="endDate"
                        hasError={!!errors.endDate?.message}
                      />
                    )}
                  />
                  {errors.endDate?.message &&
                    typeof errors.endDate.message === 'string' && (
                      <Tooltip
                        message={errors.endDate.message || ''}
                        targetElement={document.getElementById('endDate')}
                      />
                    )}
                  {!allDay && (
                    <Controller
                      name="endTime"
                      control={control}
                      defaultValue="00:00"
                      render={({ field: { ref: _, ...rest } }) => (
                        <TimeSelect {...rest} />
                      )}
                    />
                  )}
                </StyledDateTimeWrapper>
              </InputWrapper>
            </StyledDateTimeRow>
            <StyledAllDayCheckboxLabel>
              <Controller
                name="allDay"
                control={control}
                defaultValue={false}
                render={({ field: { ref: _, ...rest } }) => (
                  <StyledAllDayCheckboxLabel>
                    <Checkbox {...rest} checked={rest.value} />
                    終日
                  </StyledAllDayCheckboxLabel>
                )}
              />
            </StyledAllDayCheckboxLabel>
          </StyledRow>
          <StyledRow>
            <InputWrapper>
              <Label>メモ</Label>
              <Controller
                name="memo"
                control={control}
                defaultValue=""
                rules={{
                  maxLength: {
                    value: 2000,
                    message: '最大文字数を超えています',
                  },
                }}
                render={({ field: { ref: _, ...rest } }) => (
                  <TextArea
                    {...rest}
                    id="memo"
                    placeholder="メモ内容"
                    rows={4}
                    hasError={!!errors.memo?.message}
                  />
                )}
              />
              {errors.memo?.message &&
                typeof errors.memo.message === 'string' && (
                  <Tooltip
                    message={errors.memo.message || ''}
                    targetElement={document.getElementById('memo')}
                  />
                )}
            </InputWrapper>
          </StyledRow>
          <StyledRow>
            <InputWrapper>
              <Label>場所</Label>
              <Controller
                name="location"
                control={control}
                defaultValue=""
                rules={{
                  maxLength: {
                    value: 100,
                    message: '最大文字数を超えています',
                  },
                }}
                render={({ field: { ref: _, ...rest } }) => (
                  <Input
                    {...rest}
                    id="location"
                    type="text"
                    placeholder="東京都新宿区西新宿6-6-3 新宿国際ビルディング新館503"
                    hasError={!!errors.location?.message}
                  />
                )}
              />
              {errors.location?.message &&
                typeof errors.location.message === 'string' && (
                  <Tooltip
                    message={errors.location.message || ''}
                    targetElement={document.getElementById('location')}
                  />
                )}
            </InputWrapper>
          </StyledRow>
          <StyledRow>
            <InputWrapper>
              <Label>添付URL</Label>
              <Controller
                name="url"
                control={control}
                defaultValue=""
                rules={{
                  pattern: {
                    value:
                      /^(https?|ftp):\/\/(?:[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+)(?::\d{1,5})?(?:\/[^\s]*)?$/,
                    message: 'URLの形式が正しくありません',
                  },
                  maxLength: {
                    value: 2048,
                    message: '最大文字数を超えています',
                  },
                }}
                render={({ field: { ref: _, ...rest } }) => (
                  <Input
                    {...rest}
                    id="url"
                    type="url"
                    placeholder="https://example.com"
                    hasError={!!errors.url?.message}
                  />
                )}
              />
              {errors.url?.message &&
                typeof errors.url.message === 'string' && (
                  <Tooltip
                    message={errors.url.message || ''}
                    targetElement={document.getElementById('url')}
                  />
                )}
            </InputWrapper>
          </StyledRow>
          <StyledButtonWrapper>
            <Button type="submit">QRコード生成</Button>
          </StyledButtonWrapper>
        </StyledMainContent>
      </form>
      {/* QRコードが生成された場合に表示 */}
      {qrCodeUrl && (
        <StyledMainContent>
          <StyledRow>
            <StyledGeneratedArea>
              <p>生成結果</p>
              <img src={qrCodeUrl} alt="Generated QR Code" />
            </StyledGeneratedArea>
          </StyledRow>
        </StyledMainContent>
      )}
    </StyledMainWrapper>
  )
}

export default App
