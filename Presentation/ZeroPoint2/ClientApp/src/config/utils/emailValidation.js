import React from 'react';

export const emailValidation = (email) => {
  if (/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
    return true;
  } else {
    return false;
  }
};
