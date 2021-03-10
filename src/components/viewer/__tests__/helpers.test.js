import {
  gt0,
  lenGt0,
  trimCapitalize,
  rmNonAlpha,
  alphaTrimCapitalize,
  uniqList,
  capitalizeAlphaList,
  uniqCapitalized,
  normalizeItems,
} from "../helpers";

/* eslint-disable */

test("it is true for hello", () => {
  const hello = "hello";
  expect(hello).toEqual(hello);
});

test("it is only true for numbers 1 and abover", () => {
  const n1 = -1;
  const n2 = 1;
  expect(gt0(n1)).toEqual(false);
  expect(gt0(n2)).toEqual(true);
});

test("an array with one item is gt0", () => {
  const a1 = ["1"];
  const a2 = [];
  const a3 = {};

  expect(lenGt0(a2)).toEqual(false);
  expect(lenGt0(a1)).toEqual(true);
  expect(lenGt0(a3)).toEqual(false);
});

test("it trims whitespace and capitalizes the first letter", () => {
  const s1 = " coffee ";
  const s2 = "  not-Bad  ! ";
  expect(trimCapitalize(s1)).toEqual("Coffee");
  expect(trimCapitalize(s2)).toEqual("Not-Bad  !");
});

test("it removes non alpha characters", () => {
  const s1 = "3Kanger_00s---------";
  expect(rmNonAlpha(s1)).toEqual("3Kanger00s");
});

test("it removes non alpha and capitalizes the first letter", () => {
  const s1 = "threeKanger_00s---------";
  expect(alphaTrimCapitalize(s1)).toEqual("ThreeKanger00s");
});

test("it removes duplicates from a list", () => {
  const l1 = ["one", "one", 1, {}, {}, 1, [2], [2]];
  expect(uniqList(l1)).toEqual(["one", 1, {}, {}, [2], [2]]);
});

test("it removes non alpha from a list and capitalizes each item", () => {
  const l1 = ["------fish!", "Eagle", "water-snake"];
  expect(capitalizeAlphaList(l1)).toEqual(["Fish", "Eagle", "Watersnake"]);
});

test("it makes a list unique and capitalizes it", () => {
  const l1 = [
    "------fish!",
    "Eagle",
    "water-snake",
    "water-snake",
    "watersnake",
  ];
  expect(uniqCapitalized(l1)).toEqual([
    "Fish",
    "Eagle",
    "Water snake",
    ""
  ]);
});
