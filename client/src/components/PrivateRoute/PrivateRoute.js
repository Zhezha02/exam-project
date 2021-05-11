import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ roles, ...rest }) => {
  const { user, isFetching, error } = useSelector(state => state.auth)

  if (user) {
    if (roles.includes(user.role)) {
      return <Route {...rest} />
    }
    return <Redirect to='/' />
  }
  
  if (!roles || !roles.length) {
    return <Route {...rest} />
  }
}

export default PrivateRoute
