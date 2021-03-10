import { compose, gt, length, map, trim } from "ramda";
import { capitalize } from "../../util";

const gt0 = xn => gt(xn, 0);
const lenGt0 = compose(gt0, length);

const trimCapitalize = compose(capitalize, trim);
const rmNonAlpha = xs => xs.replace(/[^a-z0-9+]+/gi, " ");
const alphaTrimCapitalize = compose(trimCapitalize, rmNonAlpha);

const uniqList = xl => [...new Set(xl)];
const capitalizeAlphaList = xl => map(alphaTrimCapitalize, xl);
const uniqCapitalized = compose(uniqList, capitalizeAlphaList);
const normalizeItems = items =>
  Array.isArray(items) ? uniqCapitalized(items) : items;

// eslint-disable-next-line fp/no-mutation
export {
  gt0,
  lenGt0,
  trimCapitalize,
  rmNonAlpha,
  alphaTrimCapitalize,
  uniqList,
  capitalizeAlphaList,
  uniqCapitalized,
  normalizeItems,
};
