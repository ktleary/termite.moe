export function validate({ username, password }) {
  return username.length > 3 && password.length > 3;
}

const authorizeUser = ({ username, password }) =>
  new Promise((resolve, reject) => {
    const token = new Date().getTime();
    return username && password ? resolve(token) : reject(false);
  });

const setToken = ({ token }) => {
  return localStorage.setItem("token", JSON.stringify(token));
};

export const UNSAFEuserLogin = async ({ username, password }) => {
  const token = await authorizeUser({ username, password });
  if (!token) return false;
  // eslint-disable-next-line fp/no-unused-expression
  setToken({ token });
  // eslint-disable-next-line fp/no-unused-expression
  console.log(token);
  return true;
};
