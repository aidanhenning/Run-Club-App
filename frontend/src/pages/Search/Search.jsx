import styles from "./Search.module.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header/Header";
import BottomNav from "../../components/BottomNav/BottomNav";

export default function Search() {
  const { API, token } = useAuth();
  const [activeTab, setActiveTab] = useState("people");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const endpoint = activeTab === "people" ? "users" : "clubs";
      try {
        const res = await fetch(
          `${API}/${endpoint}/search?searchTerm=${query}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    const timer = setTimeout(fetchResults, 300);
    return () => clearTimeout(timer);
  }, [query, activeTab, API, token]);

  return (
    <div className={styles.container}>
      <Header title="Search" />

      <main className={styles.content}>
        {/* TABS */}
        <div className={styles.tabGroup}>
          <button
            className={`${styles.tab} ${activeTab === "people" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("people")}
          >
            People
          </button>
          <button
            className={`${styles.tab} ${activeTab === "clubs" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("clubs")}
          >
            Clubs
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className={styles.searchBarWrapper}>
          <input
            type="text"
            placeholder={`Search for ${activeTab}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* RESULTS LIST */}
        <div className={styles.list}>
          {results.map((item) => (
            <div key={item.id} className={styles.resultItem}>
              <div className={styles.profile}>
                <img
                  src={
                    activeTab === "people"
                      ? item.profile_picture_url
                      : item.logo
                  }
                  alt="avatar"
                  className={styles.avatar}
                />
                <div className={styles.info}>
                  <h4>
                    {activeTab === "people"
                      ? `${item.first_name} ${item.last_name}`
                      : item.name}
                  </h4>
                  <p className={styles.infoSecondary}>
                    {activeTab === "people"
                      ? item.location
                      : `${item.member_count} members`}
                  </p>
                </div>
              </div>
              <button className={styles.actionButton}>
                {activeTab === "people"
                  ? item.is_followed
                    ? "Following"
                    : "Follow"
                  : item.is_member
                    ? "Member"
                    : "Join"}
              </button>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
