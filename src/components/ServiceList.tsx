import { useDispatch, useSelector } from 'react-redux';
import { deleteService, startEditing } from '../store/actions';
import type { RootState, Service } from '../store/types';

export default function ServiceList() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.services.items);
  const editingId = useSelector((state: RootState) => state.form.editingId);

  const handleDelete = (id: string) => {
    dispatch(deleteService(id));
  };

  const handleEdit = (service: Service) => {
    dispatch(startEditing(service));
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <h3>Список услуг</h3>
        <span className="count-badge">Всего: {items.length}</span>
      </div>

      {items.length === 0 && (
        <div className="empty-state">Пока нет ни одной услуги</div>
      )}

      <ul className="service-list">
        {items.map((service) => {
          const isEditing = service.id === editingId;

          return (
            <li
              key={service.id}
              className={isEditing ? 'service-item service-item-active' : 'service-item'}
            >
              <div className="service-info">
                <span className="service-name">{service.name}</span>
                <span className="service-price">{service.price} ₽</span>
              </div>

              <div className="service-actions">
                <button
                  className="icon-btn"
                  onClick={() => handleEdit(service)}
                >
                  ✏️
                </button>
                
                <button
                  className="icon-btn"
                  onClick={() => handleDelete(service.id)}
                >
                  ✕
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}