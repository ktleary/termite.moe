import { compose, gt, length, lte, map, trim } from "ramda";
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

const lte0 = xn => lte(xn, 0);
const lenLt0 = compose(lte0, length);

// eslint-disable-next-line fp/no-mutation
export {
  gt0,
  lenGt0,
  trimCapitalize,
  rmNonAlpha,
  alphaTrimCapitalize,
  lte0,
  lenLt0,
  uniqList,
  capitalizeAlphaList,
  uniqCapitalized,
  normalizeItems,
};
