import React, { useState, useEffect } from 'react';
import { createItem, updateItem, getItem } from '../services/itemService';

interface Props {
  itemId?: number;
  onSuccess: () => void;
}

const ItemForm: React.FC<Props> = ({ itemId, onSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (itemId) {
      getItem(itemId).then(item => {
        setName(item.name);
        setDescription(item.description);
      });
    } else {
      setName('');
      setDescription('');
    }
  }, [itemId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (itemId) {
        await updateItem(itemId, { name, description });
      } else {
        await createItem({ name, description });
      }
      setName('');
      setDescription('');
      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar item', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nome</label>
        <input
          className="form-control"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Descrição</label>
        <input
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn">
        Salvar
      </button>
      {itemId && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setName('');
            setDescription('');
            onSuccess();
          }}
        >
          Cancelar
        </button>
      )}
    </form>
  );
};

export default ItemForm;
