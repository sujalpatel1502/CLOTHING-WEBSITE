//import { async } from "@firebase/util";
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";
//import { UserContext } from "../../context/user.sontext";

const defaultFormFields ={
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    //console.log("hitt");
   // const { setCurrentUser } = useContext(UserContext);
  
    const resetFormFields = () => {
      setFormFields(defaultFormFields);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (password !== confirmPassword) {
        alert('passwords do not match');
        return;
      }
  
      try {
        const { user } = await createAuthUserWithEmailAndPassword(
          email,
          password
        );
        //setCurrentUser(user);
  
        await createUserDocumentFromAuth(user, { displayName });
        resetFormFields();
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          alert('Cannot create user, email already in use');
        } else {
          console.log('user creation encountered an error', error);
        }
      }
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormFields({ ...formFields, [name]: value });
    };
  
    return(
        <div className="sign-up-container">
        <h2>Don't have an account ?</h2>
            <span>Sign up  ur email and ur passswrd</span>
            <form onSubmit={ handleSubmit }>
            {/* <label>Display name</label> */}
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>

                {/* <label>Email</label> */}
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>

                {/* <label>passsword</label> */}
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>

                {/* <label>confirm passswrd</label> */}
                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;