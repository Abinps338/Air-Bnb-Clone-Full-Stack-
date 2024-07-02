import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { UserContext } from "../UserContext";


export default function LoginPage(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate=useNavigate('')
    const {setUser} = useContext(UserContext)

    async function handleLoginSubmit (e) {
        e.preventDefault();
        const response = await axios.post('http://localhost:3000/login',{
            email,
            password})
            .then(result => {console.log(result)
                if(result.data === "Login Successful"){
                    navigate('/')
                }else{
                    alert('Login failed. Please check your password.')
                }
                setUser(response.data)
            })
            .catch(err=> console.log(err))
    }



    return(
        <div>
            <div className="mt-4 grow flex-items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto " onSubmit={handleLoginSubmit} >
                    <input type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />

                    <input type="password"
                        placeholder="password"
                        autoComplete="on" 
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}></input>
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet?<Link className="underline text-black" to={'/register'}>Register now</Link>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}