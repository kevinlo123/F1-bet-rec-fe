import { AuthProvider } from '../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/style.scss';
import ColorSwitcher from '../common/elements/color-switcher/ColorSwitcher';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <AuthProvider>
                <ColorSwitcher />
                <Component {...pageProps} />
            </AuthProvider>
        </>
    )
}

export default MyApp
