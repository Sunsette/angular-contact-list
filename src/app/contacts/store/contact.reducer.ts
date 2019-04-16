import * as ContactActions from './contact.actions';
import { Contact } from './../contact.model';

export interface AppState {
    contacts: State;
}

export interface State {
    list: Contact[];
    total: number;
    loading: boolean;
    loadingSingle: boolean,
    selectedContact: Contact;
}

export const initialState: State = {
    list: [],
    total: 0,
    loading: false,
    loadingSingle: false,
    selectedContact: null
};

export function contactReducer(state = initialState, action: ContactActions.ContactActions) {
    switch (action.type) {
        case ContactActions.FETCH_CONTACTS:
            return { ...state, loading: true };
        case ContactActions.FETCH_CONTACT:
            return { ...state, loadingSingle: true };
        case ContactActions.SET_CONTACTS:
            return { ...state, list: [...state.list, ...action.payload.rows], loading: false, total: action.payload.total };
        case ContactActions.SET_CONTACT:
            return { ...state, selectedContact: action.payload, loadingSingle: false };
        case ContactActions.SAVE_CONTACT:
            return { ...state, loadingSingle: true };
        case ContactActions.CLEAR_CONTACTS:
            return { ...state, list: [] };
        default:
            return state;
    }
}