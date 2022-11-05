import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    console.log("Refresh TOken");
    console.log(auth.refreshToken + "\n");
    console.log("Old TOken");
    console.log(auth.accessToken + "\n");
    const response = await axios.post('/v1/auth/refresh-tokens',
    JSON.stringify({'refreshToken': auth.refreshToken}),
    )
    setAuth(prev => {
        console.log("New TOken");
        console.log(response.data.access.token);
        return { ...prev, accessToken: response.data.access.token};
    })
    return response.data.access.token;
  }

  return refresh;
};

export default useRefreshToken;