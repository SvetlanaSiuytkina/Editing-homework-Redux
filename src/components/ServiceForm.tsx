import { useDispatch, useSelector } from 'react-redux';
import {
  addService,
  updateService,
  setFormField,
  cancelEditing,
  setValidationError,
} from '../store/actions';
import type { RootState } from '../store/types';

function validateForm(name: string, price: string) {
  const errors: { name?: string; price?: string } = {};

  if (!name.trim()) {
    errors.name = 'Введите название';
  } else if (name.trim().length < 2) {
    errors.name = 'Минимум 2 символа';
  }

  const num = Number(price);
  if (!price.trim()) {
    errors.price = 'Введите цену';
  } else if (isNaN(num) || num <= 0) {
    errors.price = 'Цена должна быть > 0';
  }

  return errors;
}

export default function ServiceForm() {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.form);
  const isEditing = form.editingId !== null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(form.name, form.price);

    if (Object.keys(errors).length > 0) {
      if (errors.name) dispatch(setValidationError('name', errors.name));
      if (errors.price) dispatch(setValidationError('price', errors.price));
      return;
    }

    if (isEditing && form.editingId) {
      dispatch(updateService(form.editingId, form.name.trim(), Number(form.price)));
    } else {
      dispatch(addService(form.name.trim(), Number(form.price)));
    }

    dispatch(cancelEditing());
  };

  return (
    <div className={`form-card ${isEditing ? 'form-card-editing' : ''}`}>
      <div className="form-header">
        <h2>{isEditing ? 'Редактирование' : 'Новая услуга'}</h2>
        {isEditing && <span className="form-badge">Режим редактирования</span>}
      </div>

      <form onSubmit={handleSubmit} className="form-body">
        <div className="form-group">
          <label>Название</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => dispatch(setFormField('name', e.target.value))}
            placeholder="Замена стекла"
            className={form.errors.name ? 'input-error' : ''}
          />
          {form.errors.name && <span className="error-text">{form.errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Цена</label>
          <input
            type="text"
            value={form.price}
            onChange={(e) => dispatch(setFormField('price', e.target.value))}
            placeholder="21000"
            className={form.errors.price ? 'input-error' : ''}
          />
          {form.errors.price && <span className="error-text">{form.errors.price}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Сохранить
          </button>
          
          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => dispatch(cancelEditing())}
            >
              Отмена
            </button>
          )}
        </div>
      </form>
    </div>
  );
}