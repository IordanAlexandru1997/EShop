
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const Signin = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        createUserDocumentFromAuth(user)
    }
    return (
        <div>
            <h1>Here is the sign in component</h1>
            <button onClick={logGoogleUser}>Log in</button>
        </div>
    )
}

export default Signin;