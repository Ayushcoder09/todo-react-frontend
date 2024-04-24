import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./security/AuthContext"
import React from "react"

function LoginComponent() {
    const [username, setUserName] = useState('Ayush')
    const [password, setPassword] = useState('')
    const [loginFailed, setLoginFailed] = useState(false)
    const authContext = useAuth()
    const navigate = useNavigate()

    function handleUserNameChange(event) {
        setUserName(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    async function handleLogin() {
        if (await authContext.login(username, password)) {
            //Navigate to welcome page
            navigate(`/welcome/${username}`)
        }
        else {
            setLoginFailed(true)
        }
    }

    return (
        <div className="LoginComponent">
            <h1>Time for login</h1>
            <div>
                <label>Username</label>
                <input type="text" name="username" value={username} onChange={handleUserNameChange}></input>
            </div>

            <div>
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={handlePasswordChange}></input>
            </div>

            <div>
                <button type="button" name="login" onClick={handleLogin}>login</button>
            </div>

            {loginFailed && <div className="loginFailed"><label>Authentication Failed. Please check the credentials</label></div>}
        </div>
    )

}

export default LoginComponent