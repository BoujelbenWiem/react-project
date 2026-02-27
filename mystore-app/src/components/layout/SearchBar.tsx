import './SearchBar.scss';

const SearchBar : React.FC<{onSearch: () => void; value: string; onChange: (value: string) => void}> = ({ onSearch, value, onChange }) => {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search products..." value={value} onChange={(e) => onChange(e.target.value)} />
            <button onClick={onSearch}>Search</button>
        </div>
    )
}

export default SearchBar;