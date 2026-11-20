import type { Contact, ContactErrors } from '../../types/contact';
import { cleanPhone } from '../../fixtures/contacts';

const nameRegex = /^[\p{L}'’\- ]+$/u;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{10,13}$/;

export const getToday = () => {
    return new Date().toISOString().slice(0, 10);
};


export const validate = (contact: Contact, allContacts: Contact[]): ContactErrors => {
    const errors: ContactErrors = {};

    const firstName = contact.firstName.trim();
    if (firstName === '') {
        errors.firstName = 'Введіть ім’я';
    } else if (firstName.length < 2) {
        errors.firstName = 'Ім’я має містити щонайменше 2 символи';
    } else if (!nameRegex.test(firstName)) {
        errors.firstName = 'Ім’я може містити лише літери, пробіл, дефіс та апостроф';
    }

    const lastName = contact.lastName.trim();
    if (lastName !== '' && !nameRegex.test(lastName)) {
        errors.lastName = 'Прізвище може містити лише літери, пробіл, дефіс та апостроф';
    }

    const phone = cleanPhone(contact.phone);
    const phoneExists = allContacts.some((c) => {
        return c.id !== contact.id && cleanPhone(c.phone) === phone;
    });
    if (phone === '') {
        errors.phone = 'Введіть номер телефону';
    } else if (!phoneRegex.test(phone)) {
        errors.phone = 'Невірний номер. Приклад: +380 50 123 45 67';
    } else if (phoneExists) {
        errors.phone = 'Контакт з таким номером вже існує';
    }

    // Email (необов'язковий)
    const email = contact.email.trim();
    if (email !== '' && !emailRegex.test(email)) {
        errors.email = 'Невірний формат email. Приклад: name@example.com';
    }

    if (contact.birthDate !== '') {
        if (contact.birthDate > getToday()) {
            errors.birthDate = 'Дата народження не може бути в майбутньому';
        } else if (contact.birthDate < '1900-01-01') {
            errors.birthDate = 'Дата народження не може бути раніше 1900 року';
        }
    }

    if (contact.category === '') {
        errors.category = 'Оберіть категорію';
    }

    return errors;
};