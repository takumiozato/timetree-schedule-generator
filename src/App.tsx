import styled from 'styled-components';
import { Label } from './components/Label';
import { InputWrapper } from './components/InputWrapper';
import { Input } from './components/Input';
import { DateInput } from './components/DateInput';
import { TimeSelect } from './components/TimeSelect';
import { Checkbox } from './components/Checkbox';
import { TextArea } from './components/TextArea';
import { useState } from 'react';
import { Button } from './components/Button';
import QRCode from 'qrcode';
import { generateURL } from './generateURL';
import { useForm, Controller } from 'react-hook-form';


const StyledMainWrapper = styled.div`
  background-color: #2ecc87;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  row-gap: 40px;

  @media (max-width: 767px) {
    padding: 8px;
    row-gap: 8px;
  }
`;

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
`;

const StyledRow = styled.div`
  width: 100%;
`;

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
`;

const StyledDateTimeWrapper = styled.div`
  display: flex;
  column-gap: 8px;
`;

const StyledAllDayCheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  column-gap: 8px;
  cursor: pointer;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
`;

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
`;

function App() {
  const { control, handleSubmit, formState: { errors }, watch } = useForm();

  // QRコードURL
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  // QRコード生成処理
  const onClickGenerateQRCode = (data: any) => {
    const timetrUrl = generateURL(
      data.startDate,
      data.startTime,
      data.endDate,
      data.endTime,
      data.title,
      data.memo,
      data.allDay,
      data.location,
      data.url
    );

    // QRコード生成
    QRCode.toDataURL(timetrUrl, (err, url) => {
      if (err) {
        console.error('QRコード生成エラー:', err);
      } else {
        // QRコードのURLをステートにセット
        setQrCodeUrl(url);
      }
    });
  };

  const allDay = watch("allDay");

  const onSubmit = (data: any) => {
    // フォームデータを渡してQRコード生成
    onClickGenerateQRCode(data);
  };

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
                rules={{ required: "予定タイトルは必須です", maxLength: { value: 50, message: "最大文字数を超えています" } }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="TimeTree Day"
                    hasError={!!errors.title?.message}
                  />
                )}
              />
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
                    rules={{ required: "開始日時は必須です" }}
                    render={({ field }) => <DateInput {...field} hasError={!!errors.startDate?.message} />}
                  />
                  {!allDay && (
                    <Controller
                      name="startTime"
                      control={control}
                      render={({ field }) => (
                        <TimeSelect {...field} />
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
                    rules={{ required: "終了日時は必須です" }}
                    render={({ field }) => <DateInput {...field} hasError={!!errors.endDate?.message} />}
                  />
                  {!allDay && (
                    <Controller
                      name="endTime"
                      control={control}
                      render={({ field }) => (
                        <TimeSelect {...field} />
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
                render={({ field }) => (
                  <StyledAllDayCheckboxLabel>
                    <Checkbox {...field} checked={field.value} />
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
                rules={{ maxLength: { value: 2000, message: "最大文字数を超えています" } }}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    placeholder="メモ内容"
                    rows={4}
                    hasError={!!errors.memo?.message}
                  />
                )}
              />
            </InputWrapper>
          </StyledRow>
          <StyledRow>
            <InputWrapper>
              <Label>場所</Label>
              <Controller
                name="location"
                control={control}
                rules={{ maxLength: { value: 100, message: "最大文字数を超えています" } }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="東京都新宿区西新宿6-6-3 新宿国際ビルディング新館503"
                    hasError={!!errors.location?.message}
                  />
                )}
              />
            </InputWrapper>
          </StyledRow>
          <StyledRow>
            <InputWrapper>
              <Label>添付URL</Label>
              <Controller
                name="url"
                control={control}
                rules={{
                  pattern: { value: /^(https?|ftp)(:\/\/[-_.!~*'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/, message: "URLの形式が正しくありません" },
                  maxLength: { value: 2048, message: "最大文字数を超えています" }
                }}
                render={({ field }) => (
                  <Input {...field} type="url" placeholder="https://example.com" hasError={!!errors.url?.message} />
                )}
              />
            </InputWrapper>
          </StyledRow>
          <StyledButtonWrapper>
            <Button type="submit">QRコード生成</Button>
          </StyledButtonWrapper>
          {/* QRコードが生成された場合に表示 */}
        </StyledMainContent>
      </form>
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
  );
}

export default App;
