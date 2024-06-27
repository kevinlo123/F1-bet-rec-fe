import { AuthProvider } from '../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/style.scss';
import ColorSwitcher from '../common/elements/color-switcher/ColorSwitcher';
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <AuthProvider>
                <ColorSwitcher />
                <Component {...pageProps} />
                <Toaster position="top-center" />
            </AuthProvider>
        </>
    )
}

export default MyApp
