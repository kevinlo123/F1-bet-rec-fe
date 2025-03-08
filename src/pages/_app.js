import { AuthProvider } from '../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/style.scss';
import ColorSwitcher from '../common/elements/color-switcher/ColorSwitcher';
import { Toaster } from 'react-hot-toast';
import { ColorModeProvider } from '../contexts/ColorModeContext';
import MaintenancePage from './maintenance';  // Import the maintenance page

function MyApp({ Component, pageProps }) {
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

  if (isProduction) {
    return <MaintenancePage />;
  } else {
    return (
      <AuthProvider>
        <ColorModeProvider>
          <ColorSwitcher />
          <Component {...pageProps} />
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 1500,
              style: { animation: 'none' },
            }}
          />
        </ColorModeProvider>
      </AuthProvider>
    );
  }
}

export default MyApp;
