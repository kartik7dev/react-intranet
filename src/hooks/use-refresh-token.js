import axios from '../api/axios';
import { useAuth } from 'src/hooks/use-auth';

const useRefreshToken = () => {
    const auth = useAuth()

    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        });
        const { token,user } = response.data;
        auth.refreshToken(token,user)

    }
    return refresh;
};

export default useRefreshToken;