import React from "react";
import { any } from "prop-types";
import { capitalize } from "../../util";
import { VITALS } from "../../constants";
import { compose, concat, map, prop, values } from "ramda";
import StoryItemCategory from "./story-item-category";

const labelFormat = label => concat(label, ": ");
const capitalizeLabelFormat = compose(labelFormat, capitalize);

const Vitals = ({ content }) =>
  map(
    vital => (
      <StoryItemCategory
        title={capitalizeLabelFormat(vital)}
        content={prop(vital, content)}
        key={`vital-${vital}`}
      />
    ),
    values(VITALS)
  );

export default Vitals;

Vitals.propTypes = {
  content: any,
};
