import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { retrieveHelloWorldBeanPathVariable } from "./api/HelloWorldApiService.js"
import React from "react"
import { useAuth } from "./security/AuthContext"

function WelcomeComponent() {
    const { username } = useParams()

    const [message, setMessage] = useState(null)
    const authContext = useAuth()

    function callHelloWorldRestApi() {
        console.log('called')


        retrieveHelloWorldBeanPathVariable('Ayush',authContext.token)
            .then((response) => successfulResponse(response))
            .catch((error) => errorResponse(error))
            .finally(() => console.log('cleanup'))

    }

    function successfulResponse(response) {
        console.log(response)
        setMessage(response.data.message)
    }

    function errorResponse(error) {
        console.log(error)
    }


    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username}</h1>
            <div> Welcome.
                You can manage your todos, <Link to="/todos"> from here</Link>

                <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>
                    Call Hello World</button>

            </div>
            <div className="text-info container">{message} </div>
        </div>
    )

}
export default WelcomeComponent