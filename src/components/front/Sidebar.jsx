import React, { useState } from 'react';
import './Sidebar.css'

const Sidebar = () => {
  const [isOpen, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <button onClick={handleToggle}>Toggle Sidebar</button>
      {isOpen && (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
          <h3>Sidebar</h3>
          <p>Bienvenido a la barra lateral</p>
          <p>Esta barra lateral está optimizada para escritorio y móvil</p>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
