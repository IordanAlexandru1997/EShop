import './sign-in.styles.scss'
import FormInput from '../form-input/form-input.component'
import { useState } from 'react'
import { signInWithGooglePopup, createUserDocumentFromAuth, signInUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'
import Button from '../button/button.component'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields
    const inputHandler = (event) => {
        const { name, value } = event.target
        // name of the field, not a field called name
        // [name]: 'email':'blabla'
        setFormFields({ ...formFields, [name]: value })
        console.log(formFields)
    }
    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }
    const handleSubmit = async () => {
        try {
            let response = await signInUserWithEmailAndPassword(email, password)
            console.log(response)
            resetFormFields()
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for given email');
                    break;
                case 'auth/user-not-found':
                    alert('user not found');
                    break;
                default:
                    console.log(error)
            }
        }
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = createUserDocumentFromAuth(user)
        console.log(userDocRef)
    }
    return (
        <div className='sign-in-container'>
            <span>Sign in with your email and password</span>
            <form>
                <FormInput type='email' label='Email' onChange={inputHandler} name='email' value={email} required />
                <FormInput type='password' label='Password' onChange={inputHandler} name='password' minLength="6" value={password} required />
                <div className='buttons-container'>
                    <Button onClick={handleSubmit} type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign in</Button>
                </div>
            </form>
        </div>
    )
}





export default SignIn;




























