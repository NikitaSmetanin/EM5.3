import './style.css';

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
};

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
    return (
        <input
            className="search-bar"
            placeholder="Пошук за ім’ям або номером телефону"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};