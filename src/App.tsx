import { Header } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { setConfiguration, ScreenClassProvider } from 'react-grid-system';
import { Home, Lottery } from './pages';
import styled from 'styled-components';

const StyledApp = styled.div`
  position: relative;
`;

setConfiguration({
  breakpoints: [576, 1280],
  containerWidths: [850, 1064],
  defaultScreenClass: 'sm',
  gridColumns: 12,
  gutterWidth: 54,
  maxScreenClass: 'md'
});

function App() {
  return (
    <StyledApp role={'app'}>
      <ScreenClassProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="lottery" element={<Lottery />} />
          </Routes>
        </BrowserRouter>
      </ScreenClassProvider>
    </StyledApp>
  );
}

export default App;
