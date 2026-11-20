import { useState, useRef } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { ContactField } from './ContactField.tsx';
import { validate, getToday } from './validate';
import {categories} from '../../fixtures/categories.ts';
import {emptyContact} from '../../fixtures/emptyContact.ts';
import { getContacts } from '../../fixtures/contacts.ts';
import type { Contact, ContactErrors } from '../../types/contact';
import './style.css';

type ContactFormProps = {
    startContact: Contact; 
    buttonText: string; 
    onSave: (contact: Contact) => void; 
    onCancel?: () => void; 
};

export const ContactForm = ({ startContact, buttonText, onSave, onCancel }: ContactFormProps) => {
    const [contact, setContact] = useState<Contact>(startContact);
    const [errors, setErrors] = useState<ContactErrors>({});
    const firstNameRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); 

        const newErrors = validate(contact, getContacts());
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            if (newErrors.firstName) {
                firstNameRef.current?.focus();
            }
            return;
        }

        // 3. Передаємо контакт без зайвих пробілів на сторінку
        onSave({
            ...contact,
            firstName: contact.firstName.trim(),
            lastName: contact.lastName.trim(),
            phone: contact.phone.trim(),
            email: contact.email.trim(),
        });

        if (contact.id === 0) {
            setContact(emptyContact);
            firstNameRef.current?.focus();
        }
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <ContactField label="Ім’я *" error={errors.firstName}>
                <input
                    ref={firstNameRef}
                    name="firstName"
                    value={contact.firstName}
                    onChange={handleChange}
                    placeholder="Іван"
                />
            </ContactField>

            <ContactField label="Прізвище" error={errors.lastName}>
                <input
                    name="lastName"
                    value={contact.lastName}
                    onChange={handleChange}
                    placeholder="Петренко"
                />
            </ContactField>

            <ContactField label="Номер телефону *" error={errors.phone}>
                <input
                    name="phone"
                    type="tel"
                    value={contact.phone}
                    onChange={handleChange}
                    placeholder="+380 50 123 45 67"
                />
            </ContactField>

            <ContactField label="Email" error={errors.email}>
                <input
                    name="email"
                    type="email"
                    value={contact.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                />
            </ContactField>

            <ContactField label="Дата народження" error={errors.birthDate}>
                <input
                    name="birthDate"
                    type="date"
                    max={getToday()}
                    value={contact.birthDate}
                    onChange={handleChange}
                />
            </ContactField>

            <ContactField label="Категорія *" error={errors.category}>
                <select name="category" value={contact.category} onChange={handleChange}>
                    <option value="">Оберіть категорію</option>
                    {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                            {category.label}
                        </option>
                    ))}
                </select>
            </ContactField>

            <div className="form-buttons">
                <button type="submit" className="button-primary">
                    {buttonText}
                </button>
                {onCancel && (
                    <button type="button" className="button-secondary" onClick={onCancel}>
                        Скасувати
                    </button>
                )}
            </div>
        </form>
    );
};