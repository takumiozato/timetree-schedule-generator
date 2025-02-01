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

const StyledMainWrapper = styled.div`
  background-color: #2ecc87;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
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
`;

const StyledRow = styled.div`
  width: 100%;
`;

const StyledDateTimeRow = styled.div`
  display: flex;
  column-gap: 16px;
  margin-bottom: 12px;
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
  // 予定タイトル
  const [title, setTitle] = useState('');

  // 開始日時
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState('');
  // 終了日時
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState('');
  // 終日チェックボックス
  const [allDay, setAllDay] = useState(false);

  // メモ
  const [memo, setMemo] = useState('');

  // 場所
  const [location, setLocation] = useState('');

  // 添付URL
  const [url, setUrl] = useState('');

  // QRコードURL
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  // QRコード生成処理
  const onClickGenerateQRCode = async () => {
    const timetrUrl = generateURL(startDate, startTime, endDate, endTime, title, memo, allDay, location, url);

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

  return (
    <StyledMainWrapper>
      <StyledMainContent>
        <h1>予定作成QRコードの生成</h1>
        <StyledRow>
          <InputWrapper>
            <Label required>予定タイトル</Label>
            <Input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder="TimeTree Day" />
          </InputWrapper>
        </StyledRow>
        <StyledRow>
          <StyledDateTimeRow>
            <InputWrapper>
              <Label required>開始日時</Label>
              <StyledDateTimeWrapper>
                <DateInput value={startDate} onChange={(date) => setStartDate(date)} />
                <TimeSelect value={startTime} onChange={(value) => setStartTime(value)} />
              </StyledDateTimeWrapper>
            </InputWrapper>
            <InputWrapper>
              <Label required>終了日時</Label>
              <StyledDateTimeWrapper>
                <DateInput value={endDate} onChange={(date) => setEndDate(date)} />
                <TimeSelect value={endTime} onChange={(value) => setEndTime(value)} />
              </StyledDateTimeWrapper>
            </InputWrapper>
          </StyledDateTimeRow>
          <StyledAllDayCheckboxLabel>
            <Checkbox checked={allDay} onChange={() => setAllDay(!allDay)} />
            終日
          </StyledAllDayCheckboxLabel>
        </StyledRow>
        <StyledRow>
          <InputWrapper>
            <Label>メモ</Label>
            <TextArea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="本イベントは「普段からTimeTreeを愛用くださっているみなさまに、サービスやわたしたちのことをいろいろ知っていただき、TimeTreeをもっと好きになってもらいたい！」という思いで企画しています。"
              rows={4}
            />
          </InputWrapper>
        </StyledRow>
        <StyledRow>
          <InputWrapper>
            <Label>場所</Label>
            <Input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="東京都新宿区西新宿6-6-3 新宿国際ビルディング新館503" />
          </InputWrapper>
        </StyledRow>
        <StyledRow>
          <InputWrapper>
            <Label>添付URL</Label>
            <Input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://timetreeapp.com/" />
          </InputWrapper>
        </StyledRow>
        <StyledButtonWrapper>
          <Button onClick={onClickGenerateQRCode}>QRコード生成</Button>
        </StyledButtonWrapper>
        {/* QRコードが生成された場合に表示 */}
      </StyledMainContent>
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
