import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import GoogleLogin from 'react-google-login' 
import { socialLogin, authenticate, isAuthenticated } from '../../../api/authApi'

export default function Google() {
    const [redirectToReferer, setRedirectToReferer] = useState(false)
    const { user } = isAuthenticated()

    const responseGoogle = response => {
        const { googleId, name, email } = response.profileObj
        const user = { 
            name: name,
            email: email,
            password: googleId
        }
        socialLogin(user).then(res => {
            authenticate(res, () => {
                setRedirectToReferer(!redirectToReferer)
            })
        }).catch(error => {
            console.log("Error " + error)
        })
    } 

    const redirectUser = () => {
        if (redirectToReferer) {
            if (user && user.role === 1) {
                return <Redirect to='/admin/dashboard' />
            } else {
                return <Redirect to='/user/dashboard' />
            }
        }
    }

    return (
        <div>
            <GoogleLogin 
                clientId="706246572047-he1j4hdv57me0djptspladqobc9qts3b.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />
            {redirectUser()}
        </div>
    )
}
