/* eslint-disable */

import React from 'react';

type HelloProps = {
  foo?: string;
};

const Hello = ({ foo }: HelloProps) => {
  return <div>{foo}</div>;
};

export default Hello;
