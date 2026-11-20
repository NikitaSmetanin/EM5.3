import type { ReactNode } from 'react';
import './style.css';

type ContactFieldProps = {
    label: string;
    error?: string;
    children: ReactNode; 
};

export const ContactField = ({ label, error, children }: ContactFieldProps) => {
    return (
        <label className="field">
            <span className="field-label">{label}</span>
            {children}
            {error && <span className="field-error">{error}</span>}
        </label>
    );
};