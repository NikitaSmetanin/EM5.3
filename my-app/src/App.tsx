import { BrowserRouter, Routes, Route } from 'react-router';
import { Header } from './Components/Header';
import { AddContactPage } from './Components/AddContactPage';
import { ContactsListPage } from './Components/ContactListPage';
import { ContactDetailsPage } from './Components/ContactDetailsPage';
import './App.css';

export const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <main className="main">
                <Routes>
                    <Route path="/" element={<AddContactPage />} />
                    <Route path="/contacts" element={<ContactsListPage />} />
                    <Route path="/contacts/:id" element={<ContactDetailsPage />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}; 