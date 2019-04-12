import * as ContactActions from './contact.actions';
import { Contact } from './../contact.model';

export interface AppState {
    contacts: State;
}

export interface State {
    list: Contact[];
    total: number;
    loading: boolean;
    selectedContact: Contact;
}

const initialState: State = {
    list: [],
    total: 0,
    loading: false,
    selectedContact: null
};

export function contactReducer(state = initialState, action: ContactActions.ContactActions) {
    switch (action.type) {
        case ContactActions.SET_CONTACTS:
            return { ...state, list: [...state.list, ...action.payload.rows], loading: false, total: action.payload.total };
        case ContactActions.SET_CONTACT:
            return { ...state, selectedContact: action.payload };
        case ContactActions.START_LOADING:
            return { ...state, loading: true }
        case ContactActions.CLEAR_CONTACTS:
            return { ...state, list: [] };
        default:
            return state;
    }
}