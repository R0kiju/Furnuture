import React, { useState, useEffect } from 'react';
import { type Product } from '../types';
import { Save, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminPanel: React.FC = () => {
  const [productList, setProductList]     = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [saveStatus, setSaveStatus]       = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProductList)
      .catch(err => console.error('Failed to load products:', err));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setSaveStatus('saving');
    try {
      await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      });
      setProductList(prev =>
        prev.map(p => (p.id === editingProduct.id ? editingProduct : p))
      );
      setSaveStatus('saved');
      setTimeout(() => { setSaveStatus('idle'); setEditingProduct(null); }, 1200);
    } catch {
      setSaveStatus('idle');
    }
  };

  return (
    <div>
      <Header onOpenModal={() => {}} />
      <div className="admin-page">
        <div className="container">

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2.5rem' }}>
            <h1 className="admin-title">Панель администратора</h1>
            <span style={{ color: 'var(--gray-mid)', fontSize: '0.85rem' }}>
              {productList.length} товаров
            </span>
          </div>

          {/* ── TABLE ── */}
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Название</th>
                  <th>Категория</th>
                  <th>Цена</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {productList.map(product => (
                  <tr
                    key={product.id}
                    style={{
                      background: editingProduct?.id === product.id
                        ? 'var(--gray-light)' : undefined,
                    }}
                  >
                    <td style={{ color: 'var(--gray-mid)', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                      #{String(product.id).padStart(2, '0')}
                    </td>
                    <td>{product.name}</td>
                    <td style={{ color: 'var(--gray-mid)' }}>{product.category}</td>
                    <td>${product.price.toLocaleString()}</td>
                    <td>
                      <button
                        id={`edit-product-${product.id}`}
                        className="btn btn-secondary"
                        style={{ padding: '0.3rem 0.85rem', fontSize: '0.72rem', borderRadius: '0' }}
                        onClick={() => { setEditingProduct(product); setSaveStatus('idle'); }}
                      >
                        Изменить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── EDIT PANEL ── */}
          {editingProduct && (
            <div className="admin-edit-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 className="admin-edit-title" style={{ margin: 0 }}>
                  Редактирование
                </h2>
                <button className="btn btn-ghost" style={{ padding: '0' }}
                  onClick={() => setEditingProduct(null)}>
                  <X size={18} />
                </button>
              </div>

              <form id="admin-edit-form" onSubmit={handleSave}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="edit-name">Название</label>
                    <input id="edit-name" className="form-input"
                      value={editingProduct.name}
                      onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      required />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="edit-price">Цена ($)</label>
                    <input id="edit-price" className="form-input" type="number" min={0}
                      value={editingProduct.price}
                      onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="edit-desc">Описание</label>
                  <input id="edit-desc" className="form-input"
                    value={editingProduct.description}
                    onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} />
                </div>
                <button id="save-product-btn" type="submit" className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  disabled={saveStatus === 'saving'}>
                  <Save size={14} />
                  {saveStatus === 'saving' ? 'Сохраняем…'
                    : saveStatus === 'saved' ? '✓ Сохранено!'
                    : 'Сохранить'}
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;
