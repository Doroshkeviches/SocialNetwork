import { useSelector } from 'react-redux'
import { userAuthRedux } from '../../store/toolkitReducer';
const useUser = () => {
    const user = useSelector(userAuthRedux)
    return user
};

export default useUser;