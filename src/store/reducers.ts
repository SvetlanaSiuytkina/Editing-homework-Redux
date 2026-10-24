import { nanoid } from 'nanoid';
import {
  ADD_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
  SET_FORM_FIELD,
  START_EDITING,
  CANCEL_EDITING,
  CLEAR_FORM,
  SET_VALIDATION_ERROR,
  type AppAction,
  type FormState,
  type Service,
} from './types';

const initialFormState: FormState = {
  name: '',
  price: '',
  editingId: null,
  errors: {},
};

export function servicesReducer(
  state = { items: [] as Service[] },
  action: AppAction
) {
  switch (action.type) {
    case ADD_SERVICE:
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: nanoid(),
            name: action.payload.name,
            price: action.payload.price,
          },
        ],
      };

    case UPDATE_SERVICE:
      return {
        ...state,
        items: state.items.map((item) => {

          if (item.id === action.payload.id) {

            return {
              ...item,
              name: action.payload.name,
              price: action.payload.price,
            };
          }
          return item;
        }),
      };

    case DELETE_SERVICE:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    default:
      return state;
  }
}

export function formReducer(
  state: FormState = initialFormState,
  action: AppAction
): FormState {
  switch (action.type) {
    case SET_FORM_FIELD:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
        errors: {
          ...state.errors,
          [action.payload.field]: undefined,
        },
      };

    case START_EDITING:
      return {
        name: action.payload.service.name,
        price: String(action.payload.service.price),
        editingId: action.payload.service.id,
        errors: {},
      };

    case CANCEL_EDITING:
    case CLEAR_FORM:
      return { ...initialFormState };

    case SET_VALIDATION_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.error,
        },
      };

    case DELETE_SERVICE:
      if (state.editingId === action.payload.id) {
        return { ...initialFormState };
      }
      return state;

    default:
      return state;
  }
}