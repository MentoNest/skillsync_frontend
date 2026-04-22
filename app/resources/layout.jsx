import React from 'react';
import Navbar from '../../components/Navbar';

export default function ResourcesLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
