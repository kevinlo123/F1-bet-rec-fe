import { AuthProvider } from '../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/style.scss';
import ColorSwitcher from '../common/elements/color-switcher/ColorSwitcher';
import { Toaster } from 'react-hot-toast';
import { ColorModeProvider } from '../contexts/ColorModeContext';  // Import the new ColorModeProvider

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ColorModeProvider>  {/* Wrap the app with the ColorModeProvider */}
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

export default MyApp;
