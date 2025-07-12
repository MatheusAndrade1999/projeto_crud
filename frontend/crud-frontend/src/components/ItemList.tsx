import React, { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../services/itemService';
import { Item } from '../types/item';
import ItemForm from './ItemForm';

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItemId, setEditingItemId] = useState<number | undefined>(undefined);

  const fetchItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error('Erro ao carregar itens', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Deseja realmente excluir este item?')) {
      await deleteItem(id);
      fetchItems();
    }
  };

  const handleEdit = (id: number) => {
    setEditingItemId(id);
  };

  const handleSuccess = () => {
    fetchItems();
    setEditingItemId(undefined);
  };

return (
  <div className="layout-container">
    <div className="sidebar">
      <h2>Itens</h2>
      {loading && <p>Carregando...</p>}
      {!loading && items.length === 0 && <p>Nenhum item cadastrado.</p>}
      {!loading && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {items.map(item => (
            <li key={item.id} className="list-item">
              <div>
                <strong>{item.name}</strong>
                <br />
                <span>{item.description}</span>
              </div>
              <button
                className="btn-edit"
                onClick={() => handleEdit(item.id!)}
              >
                Editar
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDelete(item.id!)}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
    <div className="main-content">
      <h2>Cadastro de Itens</h2>
      <ItemForm
        itemId={editingItemId}
        onSuccess={handleSuccess}
      />
    </div>
  </div>
);

};

export default ItemList;
