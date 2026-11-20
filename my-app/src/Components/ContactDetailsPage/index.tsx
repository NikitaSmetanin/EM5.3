import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { ContactInfo } from './ContactInfo';
import { ContactForm } from '../ContactForm';
import { getContacts, saveContacts } from '../../fixtures/contacts';
import type { Contact } from '../../types/contact';

export const ContactDetailsPage = () => {
    const { id } = useParams(); // id з адреси /contacts/:id (це текст)
    const [contact, setContact] = useState<Contact | undefined>(
        getContacts().find((c) => c.id === Number(id))
    );
    const [isEditing, setIsEditing] = useState(false);

    if (contact === undefined) {
        return (
            <div>
                <h1>Контакт не знайдено</h1>
                <Link to="/contacts">← До списку</Link>
            </div>
        );
    }

    const handleSave = (updatedContact: Contact) => {
        const newList = getContacts().map((c) => {
            return c.id === updatedContact.id ? updatedContact : c;
        });

        saveContacts(newList);
        setContact(updatedContact);
        setIsEditing(false);
    };

    return (
        <div>
            <Link to="/contacts">← До списку</Link>
            <h1>
                {contact.firstName} {contact.lastName}
            </h1>

            {isEditing ? (
                <ContactForm
                    startContact={contact}
                    buttonText="Зберегти зміни"
                    onSave={handleSave}
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                <ContactInfo contact={contact} onEdit={() => setIsEditing(true)} />
            )}
        </div>
    );
};