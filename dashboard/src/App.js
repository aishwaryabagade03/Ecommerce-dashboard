import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import CssBaseline from "@mui/material/CssBaseline";
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider >
        <CssBaseline />
          <ScrollToTop />
          <StyledChart />
          <Router/>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
