import useToken from "./useToken";
export function validate({ username, password }) {
  return username.length > 3 && password.length > 3;
}

const authorizeUser = ({ username, password }) =>
  new Promise((resolve, reject) => {
    const token = new Date().getTime();
    return username && password ? resolve(token) : reject(false);
  });

export const userLogin = async ({ username, password }) => {
  const token = await authorizeUser({ username, password });
  if (!token) return false;
  // eslint-disable-next-line fp/no-unused-expression
  useToken.saveToken(token);
  return true;
};
