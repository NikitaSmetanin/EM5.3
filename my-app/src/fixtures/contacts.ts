import type { Contact } from '../types/contact';

const STORAGE_KEY = 'contacts';

export const getContacts = (): Contact[] => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === null) {
        return []; 
    }

    return JSON.parse(saved);
};

export const saveContacts = (contacts: Contact[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
};

export const cleanPhone = (phone: string) => {
    return phone.replace(/[\s()-]/g, '');
};