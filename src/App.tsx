import styled from 'styled-components';
import { Label } from './components/Label';
import { InputWrapper } from './components/InputWrapper';
import { Input } from './components/Input';

const MainWrapper = styled.div`
  background-color: #2ecc87;
  padding: 40px 0;
`;

const MainContent = styled.div`
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

function App() {
  return (
    <MainWrapper>
      <MainContent>
        <h1>予定作成QRコードの生成</h1>
        <InputWrapper>
          <Label required>予定タイトル</Label>
          <Input placeholder="TimeTree Day" />
        </InputWrapper>
      </MainContent>
    </MainWrapper>
  );
}

export default App;
