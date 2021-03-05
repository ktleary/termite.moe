import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    // eslint-disable-next-line fp/no-unused-expression
    localStorage.setItem("token", JSON.stringify(userToken));
    return setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
