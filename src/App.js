import './App.css';
import 'firebase/auth';
import * as firebase from 'firebase/app';
import firebaseConfig from './firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import {useState} from "react";

firebase.initializeApp(firebaseConfig);

function App() {

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
    });
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

  const handleSignIn = () => {
    signInWithPopup(auth,provider)
        .then(res => {
            const {displayName, photoURL, email} = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            setUser(signedInUser);
          console.log(displayName,email,photoURL);
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
  }

  const handleSignOut = () => {
      signOut(auth).then( res => {
          const signOutUser = {
              isSignedIn: false,
              name: '',
              email: '',
              photo: ''
          }
          setUser(signOutUser);
      }).catch((error) => {
          // An error happened.
      });
      console.log("sign out");
  }

  return (
    <div className="App">

        {
            user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button>
                :
                <button onClick={handleSignIn}>Sign In</button>
        }
        {
            user.isSignedIn && <div>
                <p>Welcome, {user.name}</p>
                <p>Your Email: {user.email}</p>
                <img src={user.photo} alt=""/>
            </div>
        }
    </div>
  );
};

export default App;
