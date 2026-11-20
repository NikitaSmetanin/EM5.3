export type Category = 'Family' | 'Friends' | 'Work' | 'Other';

export type Contact = {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    birthDate: string;
    category: Category | ''; 
};

export type ContactErrors = {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    birthDate?: string;
    category?: string;
};