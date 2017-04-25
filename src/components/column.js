import React from 'react'

const Column = ({children, cols, offset, className}) => (
  <div className={`col-md-${cols} ${offset ? `offset-md-${offset}` : ''} ${className ? ` ${className}`: ''}`}>
    {children}
  </div>
);

export default Column