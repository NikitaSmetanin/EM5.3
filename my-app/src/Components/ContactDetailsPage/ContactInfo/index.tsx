import { categories } from '../../../fixtures/categories';
import type { Contact } from '../../../types/contact';
import './style.css';

type ContactInfoProps = {
    contact: Contact;
    onEdit: () => void;
};

const formatDate = (date: string) => {
    if (date === '') {
        return '—';
    }
    const [year, month, day] = date.split('-');
    return `${day}.${month}.${year}`;
};

export const ContactInfo = ({ contact, onEdit }: ContactInfoProps) => {
    const category = categories.find((c) => c.value === contact.category);

    return (
        <div className="contact-info">
            <p><b>Ім’я:</b> {contact.firstName}</p>
            <p><b>Прізвище:</b> {contact.lastName || '—'}</p>
            <p><b>Телефон:</b> {contact.phone}</p>
            <p><b>Email:</b> {contact.email || '—'}</p>
            <p><b>Дата народження:</b> {formatDate(contact.birthDate)}</p>
            <p><b>Категорія:</b> {category ? category.label : contact.category}</p>

            <button className="edit-button" onClick={onEdit}>
                Редагувати
            </button>
        </div>
    );
};