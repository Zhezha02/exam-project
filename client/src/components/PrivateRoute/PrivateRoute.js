import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Spinner from '../Spinner/Spinner';

const PrivateRoute = ({ roles, ...rest }) => {
  const { user, isFetching, error } = useSelector(state => state.auth)

  if (isFetching) {
    return <Spinner />
  }

  if (user) {
    if (roles && !roles.includes(user.role)) {
      return <Redirect to='/' />
    }
    return <Route {...rest} />
  }

  return null // TODO: fix null render 
}

export default PrivateRoute
