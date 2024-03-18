import { signInWithGoogle } from "../config/Auth";

export default function SignInForm({ setShowSignIn }) {

    return (
        <div className="sign-in">
            <div className="sign-in-form">
                <div className="sign-in-form__close"
                    onClick={() => setShowSignIn(false)}>
                    <ion-icon name="close-outline"></ion-icon>
                </div>
                <h2>Sign In</h2>

                <button className="sign-in-form__button"
                    onClick={signInWithGoogle(setShowSignIn)}>
                    <ion-icon name="logo-google"></ion-icon>

                </button>
            </div>

        </div>

    )
}