import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { toast } from "react-toastify";
import firebase from "../services/firebaseConnect";

interface User {
    uid: string | null | undefined;
    name: string | null | undefined;
    email: string | null | undefined;
    avatarUrl: string | null | undefined;
}

interface AuthCtx {
  auth: boolean;
  user: User | null | undefined;
  loadingAuth: boolean;
  loading: boolean;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>
}

export const AuthContext = createContext({} as AuthCtx)

function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadStorage() {
      const storageUser = localStorage.getItem('user-system')

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false)
      }

      setLoading(false);
    }

    loadStorage();

  }, [])

  const signIn = async (email: string, password: string) => {
    setLoadingAuth(true);

    await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async (value) => {
        const uid = value?.user?.uid;

        const userProfile = await firebase.firestore().collection('users')
          .doc(uid).get();

        const data = {
          uid,
          name: userProfile.data()?.name,
          email: value.user?.email,
          avatarUrl: userProfile.data()?.avatar_url,
        }


        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        toast.success('Welcome back!')
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong with your login :(')
        setLoadingAuth(false)
      })
  }

  const signUp = async (name: string, email: string, password: string) => {
    setLoadingAuth(true);
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
        const uid = value.user?.uid

        await firebase.firestore().collection('users').doc(uid).set({
          name: name,
          avatarUrl: null
        })
          .then(() => {
            const data = {
              uid,
              name,
              email: value.user?.email,
              avatarUrl: null
            };


            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success('Welcome to the platform!');
          })
      })
      .catch(e => {
        console.log(e);
        toast.error('Ops, something went wrong :(')
        setLoadingAuth(false);
      })
  }

  const storageUser = (data: User) => {
    localStorage.setItem('user-system', JSON.stringify(data))
  }

  const signOut = async () => {
    await firebase.auth().signOut();
    localStorage.removeItem('user-system');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{
      auth: !!user,
      user,
      loadingAuth,
      loading,
      signUp,
      signOut,
      signIn
    }}
    >{children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;