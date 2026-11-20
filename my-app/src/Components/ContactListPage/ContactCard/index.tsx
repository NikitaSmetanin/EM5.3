import { Link } from 'react-router';
import type { Contact } from '../../../types/contact';
import './style.css';

type ContactCardProps = {
    contact: Contact;
};

export const ContactCard = ({ contact }: ContactCardProps) => {
    return (
        <Link to={`/contacts/${contact.id}`} className="contact-card">
            <div>
                <div className="contact-card-name">
                    {contact.firstName} {contact.lastName}
                </div>
                <div className="contact-card-phone">{contact.phone}</div>
            </div>
            <span className="contact-card-category">{contact.category}</span>
        </Link>
    );
};