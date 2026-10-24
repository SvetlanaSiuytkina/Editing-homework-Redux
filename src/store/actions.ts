import {
  ADD_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
  SET_FORM_FIELD,
  START_EDITING,
  CANCEL_EDITING,
  CLEAR_FORM,
  SET_VALIDATION_ERROR,
  type Service
} from './types';

//добавить услугу
export const addService = (name: string, price: number) => ({
  type: ADD_SERVICE,
  payload: { name, price },
});

//обновить услугу
export const updateService = (id: string, name: string, price: number) => ({
  type: UPDATE_SERVICE,
  payload: { id, name, price },
});

//удалить услугу
export const deleteService = (id: string) => ({
  type: DELETE_SERVICE,
  payload: { id },
});

//изменить поле формы
export const setFormField = (field: 'name' | 'price', value: string) => ({
  type: SET_FORM_FIELD,
  payload: { field, value },
});

//начать редактирование
export const startEditing = (service: Service) => ({
  type: START_EDITING,
  payload: { service },
});

//отменить ред
export const cancelEditing = () => ({ type: CANCEL_EDITING });

//очистить форму
export const clearForm = () => ({ type: CLEAR_FORM });

//установить ошибку валид
export const setValidationError = (field: 'name' | 'price', error: string) => ({
  type: SET_VALIDATION_ERROR,
  payload: { field, error },
});