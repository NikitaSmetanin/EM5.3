import type { Category } from '../types/contact';

export const categories: { value: Category; label: string }[] = [
    { value: 'Family', label: 'Family (Сім’я)' },
    { value: 'Friends', label: 'Friends (Друзі)' },
    { value: 'Work', label: 'Work (Робота)' },
    { value: 'Other', label: 'Other (Інше)' },
];