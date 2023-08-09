import { PathConstant } from '@/constants'
import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({ isAuth, redirectPath, children }) => {
  const location = useLocation()
  if (!isAuth) {
    return <Navigate to={redirectPath || PathConstant.PAGE_403} state={{ from: location }} replace />
  }
  return children
}

PrivateRoute.propTypes = {
  isAuth: PropTypes.bool,
  redirectPath: PropTypes.string,
  children: PropTypes.element,
}

export default PrivateRoute
