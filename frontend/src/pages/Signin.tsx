import { firebaseConfig } from "@/lib/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt : "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export default function SignIn(){
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
}
return (
    <div>
        <button onClick={logGoogleUser}>Sign In With Google</button>
    </div>
)
}