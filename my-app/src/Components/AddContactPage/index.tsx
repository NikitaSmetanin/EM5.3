import { useState } from 'react';
import { ContactForm } from '../ContactForm';
import { emptyContact } from '../../fixtures/emptyContact';
import { getContacts, saveContacts } from '../../fixtures/contacts';
import type { Contact } from '../../types/contact';
import './style.css';

export const AddContactPage = () => {
    const [message, setMessage] = useState('');

    const handleSave = (contact: Contact) => {
        const contacts = getContacts(); // беремо старий список
        const newContact = { ...contact, id: Date.now() }; // даємо контакту унікальний id
        saveContacts([...contacts, newContact]); // додаємо в кінець і зберігаємо
        setMessage('Контакт збережено!');
    };

    return (
        <div>
            <h1>Новий контакт</h1>
            <ContactForm
                startContact={emptyContact}
                buttonText="Зберегти контакт"
                onSave={handleSave}
            />
            {message && <p className="success-message">{message}</p>}
        </div>
    );
};