import styles from "@/pages/Search/Search.module.css";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header/Header";
import BottomNav from "@/components/BottomNav/BottomNav";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function Search() {
  const { API, token } = useAuth();
  const navigate = useNavigate();

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

  const handleItemSelect = (id) => {
    if (activeTab === "people") {
      navigate(`/profile/${id}`);
    } else {
      navigate(`/clubs/${id}`);
    }
  };

  const handleAction = async (itemId, isCurrentlyActive) => {
    const baseEndpoint =
      activeTab === "people" ? "followers" : "clubmemberships";
    const url = `${API}/${baseEndpoint}/${itemId}`;

    const method = isCurrentlyActive ? "DELETE" : "POST";

    const previousResults = [...results];
    setResults((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return activeTab === "people"
            ? { ...item, is_followed: !isCurrentlyActive }
            : { ...item, is_member: !isCurrentlyActive };
        }
        return item;
      }),
    );

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Server request failed");
      }
      console.log(`${method} successful for ${itemId}`);
    } catch (err) {
      console.error("Action failed, rolling back:", err);
      setResults(previousResults);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <Header title="Search" />

      <main className={styles.content}>
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

        <div className={styles.searchBarWrapper}>
          <input
            type="text"
            placeholder={`Search for ${activeTab}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.list}>
          {results.map((item) => (
            <div key={item.id} className={styles.resultItem}>
              <div
                className={styles.profile}
                onClick={() => handleItemSelect(item.id)}
              >
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
              <button
                className={styles.actionButton}
                onClick={() =>
                  handleAction(
                    item.id,
                    activeTab === "people" ? item.is_followed : item.is_member,
                  )
                }
              >
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
