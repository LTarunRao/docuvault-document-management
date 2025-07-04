const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

export default {
  getAccessToken() {
    return {
      accessToken: localStorage.getItem(ACCESS_KEY),
      refreshToken: localStorage.getItem(REFRESH_KEY),
    };
  },
  setAccessToken(accessToken, refreshToken) {
    localStorage.setItem(ACCESS_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
  },
  removeAccessToken() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};