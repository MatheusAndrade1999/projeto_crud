import React, { useState } from 'react';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import './index.css';

const App: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="container">
      <ItemList key={refreshKey} />
    </div>
  );
};

export default App;
