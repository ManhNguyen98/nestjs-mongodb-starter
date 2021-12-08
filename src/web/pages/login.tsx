import { useState } from 'react'
import Router from 'next/router'
import { useUser } from '../hooks/useUser'
import SignIn from '../components/SignIn'
import Head from 'next/head'

const Login = () => {
  useUser({ redirectTo: '/home', redirectIfFound: true })

  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    }    

    try {
      const res = await fetch('/api/v2/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        Router.push('/home')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  }

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <SignIn onSubmit={handleSubmit}/>
    </div>
  )
}

export default Login
