import React, { useState, useEffect, useRef } from 'react';
import { useDynamicSVGImport } from '../hooks';
const Icon = ({ name , color , onCompleted, onError, ...rest }) => {
  const { error, loading, SvgIcon } = useDynamicSVGImport(name, color, {
    onCompleted,
    onError
  });
  if (error) {
    return error.message;
  }
  if (loading) {
    return "Loading...";
  }
  if (SvgIcon) {
    return <SvgIcon fill={color} {...rest} />;
  }
  return null;
};

export default Icon;