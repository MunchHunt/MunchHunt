import React from 'react';
import Navbar from './Navbar';

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <section>
        {children}
      </section>
    </div>
  );
};

export default Layout;