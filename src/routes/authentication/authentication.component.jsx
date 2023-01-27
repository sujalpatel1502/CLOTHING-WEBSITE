// import { signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
// import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
//import { signInWithGoogleRedircet } from '../../utils/firebase/firebase.utils';
import SingUpForm from '../../component/sign-up-form/sign-up-form.component';
import SingInForm from '../../component/sign-in-form/sign-in-form.component';
import './authentication.styles.scss';
const Authentication = () => {
    
    
    return(
        <div className='authentication-container'>
            
            {/* <button onClick={logGoogleUser}>
                Sign in With Google Popup 
            </button> */}
            <SingInForm />
            
            <SingUpForm />
            
        </div>
    );
};

export default Authentication;