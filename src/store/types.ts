export interface FormState {
  name: string;
  price: string;
  editingId: string | null; // null = добавление, id = редактирование
  errors: {
    name?: string;
    price?: string;
  };
};

export interface RootState {
  services: {
    items: Service[];
  };
  form: FormState;
}

export interface Service {
  id: string;
  name: string;
  price: number;
}

// Управление списком услуг
export const ADD_SERVICE = 'ADD_SERVICE';
export const UPDATE_SERVICE = 'UPDATE_SERVICE';
export const DELETE_SERVICE = 'DELETE_SERVICE';

// Управление формой
export const SET_FORM_FIELD = 'SET_FORM_FIELD';
export const START_EDITING = 'START_EDITING';
export const CANCEL_EDITING = 'CANCEL_EDITING';
export const CLEAR_FORM = 'CLEAR_FORM';
export const SET_VALIDATION_ERROR = 'SET_VALIDATION_ERROR';

//тип для экшенов услуг
export type ServiceAction = 
  { type: typeof ADD_SERVICE; payload: { name: string, price: number } } |
  { type: typeof UPDATE_SERVICE; payload: { id: string, name: string, price: number } } |
  { type: typeof DELETE_SERVICE; payload: { id: string } };

//тип для экшенов формы
export type FormAction = 
  { type: typeof SET_FORM_FIELD; payload: { field: 'name' | 'price'; value: string } } |
  { type: typeof START_EDITING; payload: { service: Service } } | 
  { type: typeof CANCEL_EDITING } | 
  { type: typeof CLEAR_FORM } |
  { type: typeof SET_VALIDATION_ERROR; payload: { field: 'name' | 'price'; error: string } };

export type AppAction = ServiceAction | FormAction;