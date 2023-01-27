import { Fragment,useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import CartIcon from "../../component/cart-icon/cart-icon.component";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from "../../context/user.sontext";
import { CartContext } from "../../context/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import "./navigation.styles.scss";
const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  //console.log(currentUser);
  // const signOutHandler = async () => {
  //   await signOutUser();
  //   setCurrentUser(null);
  // };
    return(
      <Fragment>
        <div className="navigation">
        <Link className="logo-container" to='/'>
        <CrwnLogo className="logo"/>
        </Link>
       
        <div className="nav-links-container">
          <Link className="nav-link" to="/Shop">
          SHOP

          </Link>
          {
            currentUser ? (
              <span className="nav-link" onClick={signOutUser}>Sign Out</span>
              )
              : ( 
                <Link className="nav-link" to="/auth">
              SIGN IN
             </Link>   
            )
          }
          <CartIcon></CartIcon>
          
          
        </div>  
        {isCartOpen && <CartDropdown />}
        </div>
        <Outlet />
      </Fragment>
    );
  };

  export default Navigation;
