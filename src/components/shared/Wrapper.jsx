import React from "react";

const Wrapper = ({ children ,className}) => {
  return (
    <section className={ `container mx-auto px-4 py-16 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </section>
  );
};

export default Wrapper;
