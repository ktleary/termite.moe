export const log = xo => console.log(xo);
export const capitalize = str => str[0].toUpperCase() + str.slice(1);

export const validateUrl = string => {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }
  return true;
};
