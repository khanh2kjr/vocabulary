import { Navigate } from 'react-router-dom'
import { PathConstant } from '@/constants'

const InitialRoute = () => {
  return <Navigate to={PathConstant.VOCABULARIES} />
}

export default InitialRoute
