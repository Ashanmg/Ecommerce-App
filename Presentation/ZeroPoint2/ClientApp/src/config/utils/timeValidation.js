import React from 'react';

const timeValidation = (value) => {
  let regex = /\dd \dh \dm/i;
  return regex.test(value);
};

export default timeValidation;
