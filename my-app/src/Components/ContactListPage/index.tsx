import { useState } from 'react';
import { Link } from 'react-router';
import { SearchBar } from './SearchBar';
import { ContactCard } from './ContactCard';
import { getContacts, cleanPhone } from '../../fixtures/contacts';
import './style.css';

export const ContactsListPage = () => {
    const [search, setSearch] = useState('');
    const contacts = getContacts();

    
    const searchText = search.trim().toLowerCase();
    const searchPhone = cleanPhone(searchText);

   
    const foundContacts = contacts.filter((contact) => {
        const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
        const nameMatches = fullName.includes(searchText);
        const phoneMatches = searchPhone !== '' && cleanPhone(contact.phone).includes(searchPhone);

        return nameMatches || phoneMatches;
    });

    return (
        <div>
            <h1>Список контактів</h1>
            <SearchBar value={search} onChange={setSearch} />

            <div className="contacts-list">
                {contacts.length === 0 && (
                    <p>
                        Контактів ще немає. <Link to="/">Додати перший</Link>
                    </p>
                )}

                {contacts.length > 0 && foundContacts.length === 0 && <p>Нічого не знайдено</p>}

                {foundContacts.map((contact) => (
                    <ContactCard key={contact.id} contact={contact} />
                ))}
            </div>
        </div>
    );
};