import axios from '../api/axios';
import { useAuth } from 'src/hooks/use-auth';

const useRefreshToken = () => {
    const auth = useAuth();
    // console.log(auth)

    
    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            headers: {'Content-Type': 'application/json'},
            withCredentials: false
        });
        const { token } = response.data.accessToken;
        console.log(token);

        dispatch({
            type: HANDLERS.REFRESH_TOKEN,
            payload: { token }
        });
    }
    return refresh;
};

export default useRefreshToken;