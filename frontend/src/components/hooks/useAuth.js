import { useSelector } from 'react-redux'
import { userAuthRedux } from '../../store/toolkitReducer'
const useAuth = () => {
    const isAuth = useSelector(userAuthRedux)
    if (!isAuth.author) {
        return false
    } else {
        return true
    }
};

export default useAuth;