import React, { useState } from 'react'

const Login = ({handleLogin}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        handleLogin(email,password)
        

        setEmail("")
        setPassword("")
    }


    return (
        <div className="flex h-screen w-screen items-center justify-center ">
            <div className="border-2 border-emerald-600 rounded-2xl p-20 ">
                <form
                    onSubmit={(e) => {
                        submitHandler(e)
                    }}
                    className="flex flex-col items-center justify-center ">
                    <h1 className="text-2xl font-semibold text-white mb-10">Login form</h1>

                    <input
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                        className="text-white outline-none border-2 border-emerald-600 py-3 px-5 mt-7 rounded-full text-xl bg-transparent placeholder:text-gray-300"
                        type="text"
                        placeholder="Enter your email"
                    />

                    <input
                        value={password}

                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                        className="text-white outline-none border-2 border-emerald-600 py-3 px-5 rounded-full text-xl bg-transparent placeholder:text-gray-300 mt-7"
                        type="password"
                        placeholder="Enter your password"
                    />

                    <button
                        className="mt-7 text-white bg-emerald-700 py-3 px-8 rounded-full text-xl hover:bg-emerald-800 transition">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
