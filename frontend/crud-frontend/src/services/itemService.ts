import { Item } from '../types/item';

const API_URL = 'http://localhost:3000/items';

export async function getItems(): Promise<Item[]> {
  const res = await fetch(API_URL);
  return res.json();
}

export async function getItem(id: number): Promise<Item> {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export async function createItem(item: Omit<Item, 'id'>): Promise<Item> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function updateItem(id: number, item: Omit<Item, 'id'>): Promise<Item> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function deleteItem(id: number): Promise<void> {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
}
