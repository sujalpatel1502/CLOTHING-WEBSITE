//import { async } from "@firebase/util";
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { signInWithGooglePopup,createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import './sign-in-form.styles.scss'
import Button from "../button/button.component"; 
//import { UserContext } from '../../context/user.sontext';

const defaultFormFields ={
   
    email: '',
    password: '',
    
}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {  email, password } = formFields;
    //const{ setCurrentUser} = useContext(UserContext)
  
    const resetFormFields = () => {
      setFormFields(defaultFormFields);
    };
    const signInWithGoogle = async () => {
      await signInWithGooglePopup();
      //setCurrentUser(user);
      //await createUserDocumentFromAuth(user);
  };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
     
  
      try {
        const {user} = await signInAuthUserWithEmailAndPassword(email, password);
        //setCurrentUser(user);
        //console.log(response);
        resetFormFields();
      } catch (error) {
        if(error.code === "auth/wrong-password")
        alert("incorect pass");
        console.log(error);
      }
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormFields({ ...formFields, [name]: value });
    };
  
    return(
        <div className="sign-up-container">
        <h2>Already have an account ?</h2>
            <span>Sign in with  ur email and ur passswrd</span>
            <form onSubmit={ handleSubmit }>
            {/* <label>Display name</label> */}
                

                {/* <label>Email</label> */}
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>

                {/* <label>passsword</label> */}
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>

                {/* <label>confirm passswrd</label> */}
                
                
                <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
               
            </form>
        </div>
    )
}

export default SignInForm;