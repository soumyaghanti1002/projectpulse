import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = () => {
        if (email && password) { 
            navigate('/dashboard'); // Redirect to Dashboard
        }
    };

    const handleSignUp = () => {
        if (email && password) {
            navigate('/dashboard'); // Redirect to Dashboard
        }
    };

    return (
        <div className='container'>
            <div className='form-container'>
                <div className='form-toggle'>
                    <button className={isLogin ? 'active' : ""} onClick={() => setIsLogin(true)}>Login</button>
                    <button className={!isLogin ? 'active' : ""} onClick={() => setIsLogin(false)}>SignUp</button>
                </div>

                {isLogin ? (
                    <div className='form'>
                        <h2>Login Form</h2>
                        <input type='email' placeholder='Useremail' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <a href='#'>Forget Password?</a>
                        <button onClick={handleLogin}>Login</button>
                        <p>Not a Member? <a href='#' onClick={() => setIsLogin(false)}>SignUp</a></p>
                    </div>
                ) : (
                    <div className='form'>
                        <h2>SignUp Form</h2>
                        <input type='email' placeholder='Useremail' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type='password' placeholder='Confirm Password' />
                        <button onClick={handleSignUp}>SignUp</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
