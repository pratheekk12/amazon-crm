import React from 'react';

const Logo1 = props => {
  return (
    <img
      alt="Logo"
      src="/static/gr3.png"
      {...props}
      style={{ height: '50px', width: '150px' }}
    />
  );
};

export default Logo1;