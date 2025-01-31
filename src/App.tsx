import styled from 'styled-components';
import { Label } from './components/Label';
import { InputWrapper } from './components/InputWrapper';
import { Input } from './components/Input';
import { DateInput } from './components/DateInput';
import { TimeSelect } from './components/TimeSelect';
import { Checkbox } from './components/Checkbox';
import { TextArea } from './components/Textarea';
import { useState } from 'react';
import { Button } from './components/Button';

const StyledMainWrapper = styled.div`
  background-color: #2ecc87;
  padding: 40px 0;
`;

const StyledMainContent = styled.div`
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

function App() {
  // 開始日時
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState('');
  // 終了日時
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState('');
  // 終日チェックボックス
  const [allDay, setAllDay] = useState(false);

  return (
    <StyledMainWrapper>
      <StyledMainContent>
        <h1>予定作成QRコードの生成</h1>
        <StyledRow>
          <InputWrapper>
            <Label required>予定タイトル</Label>
            <Input type='text' placeholder="TimeTree Day" />
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
              placeholder="本イベントは「普段からTimeTreeを愛用くださっているみなさまに、サービスやわたしたちのことをいろいろ知っていただき、TimeTreeをもっと好きになってもらいたい！」という思いで企画しています。"
              rows={4}
            />
          </InputWrapper>
        </StyledRow>
        <StyledRow>
          <InputWrapper>
            <Label>場所</Label>
            <Input type="text" placeholder="東京都新宿区西新宿6-6-3 新宿国際ビルディング新館503" />
          </InputWrapper>
        </StyledRow>
        <StyledRow>
          <InputWrapper>
            <Label>添付URL</Label>
            <Input type="url" placeholder="https://timetreeapp.com/" />
          </InputWrapper>
        </StyledRow>
        <StyledButtonWrapper>
          <Button onClick={() => { }}>QRコード生成</Button>
        </StyledButtonWrapper>
      </StyledMainContent>
    </StyledMainWrapper>
  );
}

export default App;
