import styles from "@/components/Pages/Search/SearchBar/SearchBar.module.css";

export default function SearchBar({ activeTab, query, setQuery }) {
  return (
    <div className={styles.searchBarWrapper}>
      <input
        type="text"
        placeholder={`Search for ${activeTab}...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
}
