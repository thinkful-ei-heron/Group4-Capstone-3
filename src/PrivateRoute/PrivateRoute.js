import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import UserContext from '../contexts/UserContext'
import JournalContext from '../contexts/JournalContext'

export default function PrivateRoute({component, ...props}) {
    const Component = component
    return (
        <Route
            {...props}
            render={componentProps => (
                <UserContext.Consumer>

                        {userContext =>
                            !!userContext.user.id
                                ?  <JournalContext.Consumer>{() => <Component {...componentProps} location={componentProps.location}/>}</JournalContext.Consumer>
                                : (
                                    <Redirect
                                        to={{
                                            pathname: '/',
                                            state: {from: componentProps.location},
                                        }}
                                    />
                                )
                        }

                </UserContext.Consumer>
            )}
        />
    )
}
