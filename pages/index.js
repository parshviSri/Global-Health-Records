import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import SignUp from "./components/sign-up";
import Login from './components/login';
export default function Home() {
  const[showsignUp,setShowSignUp] = useState(false);
  const [showlogin, setLogin] = useState(false);

  const createProfile =()=>{

  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Health Care Records</title>
        <meta name="description" content="health care records" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to GHR/h1>

        <p className={styles.description}>Get started by creating Account</p>
        <p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              setShowSignUp(true);
            }}
          >
            Sign up
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              setLogin(true);
            }}
          >
            Log in
          </button>
        </p>
        {!showsignUp || <SignUp />}
        {!showlogin || <Login />}
      </main>
    </div>
  );
}
