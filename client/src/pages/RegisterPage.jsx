import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate('')

    const handleSubmit=(e) => {
        e.preventDefault();
        try{
        axios.post('http://localhost:3000/register',{
            name,
            email,
            password})
            .then(result => {console.log(result)
                navigate('/login')
            })
            alert('Registration Successful');
        }catch(e){
            alert('Registration Failed. Please Try Again Later')
        }
    }




    return (
        <form className="max-w-md mx-auto" onSubmit={handleSubmit} >
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                required
            />
            <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                required
            />
            <button className="primary" type="submit">Submit</button>
            <div className="text-center py-2 text-gray-500">
                Already a member? <Link className="underline text-black" to={'/login'}>Login </Link>
            </div>
        </form>
    );
};

export default RegisterPage;