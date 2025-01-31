import styled from 'styled-components';
import { Label } from './components/Label';
import { InputWrapper } from './components/InputWrapper';
import { Input } from './components/Input';
import { DateInput } from './components/DateInput';
import { TimeSelect } from './components/TimeSelect';
import { Checkbox } from './components/Checkbox';

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
`

const StyledRow = styled.div`
  width: 100%;
`

const StyledDateTimeRow = styled.div`
    display: flex;
    column-gap: 16px;
    margin-bottom: 12px;
`

const StyledDateTimeWrapper = styled.div`
    display: flex;
    column-gap: 8px;
`

const StyledAllDayCheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    column-gap: 8px;
`

function App() {
  return (
    <StyledMainWrapper>
      <StyledMainContent>
        <h1>予定作成QRコードの生成</h1>
        <StyledRow>
          <InputWrapper>
            <Label required>予定タイトル</Label>
            <Input placeholder="TimeTree Day" />
          </InputWrapper>
        </StyledRow>
        <StyledRow>
          <StyledDateTimeRow>
            <InputWrapper>
              <Label required>開始日時</Label>
              <StyledDateTimeWrapper>
                <DateInput />
                <TimeSelect value="00:00" onChange={() => { }} />
              </StyledDateTimeWrapper>
            </InputWrapper>
            <InputWrapper>
              <Label required>終了日時</Label>
              <StyledDateTimeWrapper>
                <DateInput />
                <TimeSelect value="00:00" onChange={() => { }} />
              </StyledDateTimeWrapper>
            </InputWrapper>
          </StyledDateTimeRow>
          <StyledAllDayCheckboxLabel>
            <Checkbox checked={false} onChange={() => { }} />
            終日
          </StyledAllDayCheckboxLabel>
        </StyledRow>
      </StyledMainContent>
    </StyledMainWrapper>
  );
}

export default App;
