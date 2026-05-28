import { on } from 'events';
import css from './SearchBox.module.css';
interface SearchBoxProps {
  searchQuery: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchBox({ searchQuery, onChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="search notes"
      value={searchQuery}
      onChange={onChange}
    />
  );
}
