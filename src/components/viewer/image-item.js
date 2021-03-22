import React from "react";
import PropTypes from "prop-types";

const ImageItem = ({ url }) => {
  const imageExts = ["jpg", "jpeg", "png", "gif"];
  const isImage = imageExts.reduce(
    (b, ext) => (!b && url && url.indexOf(ext) > -1 ? true : b),
    false
  );
  return isImage ? <img src={url} style={{ height: 48 }} /> : url;
};

export default ImageItem;

// eslint-disable-next-line fp/no-mutation
ImageItem.propTypes = {
  url: PropTypes.string,
};
