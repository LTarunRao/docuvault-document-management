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
// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpcF9hZGRyZXNzIjoiMS4xODcuMjIwLjM0IiwidW5pcXVlX2lkIjoiODg4OTY2NjcyNyIsInVzZXJfbmFtZSI6Ijg4ODk2NjY3MjciLCJhY2Nlc3NfdHlwZSI6ImVtcCIsIm1vYmlsZSI6Ijg4ODk2NjY3MjciLCJjbGllbnRfaWQiOiJhbGxzb2Z0IiwiZXhwIjoxNzU0MjExMTY3fQ.2x__5I3Z8l04YMGRvgDMF6vIeloOHVzw0SEi_g7bXf8
