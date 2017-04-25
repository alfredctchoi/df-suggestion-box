import React from 'react'

const Row = ({children, className}) => (
  <div className={`row${className ? ` ${className}` : ''}`}>
    {children}
  </div>
);

export default Row