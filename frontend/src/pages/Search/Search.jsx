import styles from "@/pages/Search/Search.module.css";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header/Header";
import BottomNav from "@/components/BottomNav/BottomNav";
import SearchToggle from "@/components/Pages/Search/SearchToggle/SearchToggle";
import SearchBar from "@/components/Pages/Search/SearchBar/SearchBar";
import Results from "@/components/Pages/Search/Results/Results";

import { useState, useEffect, act } from "react";
import { useNavigate } from "react-router";

export default function Search() {
  const { API, token } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("people");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!token || !API) return;

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
        <SearchToggle activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar activeTab={activeTab} query={query} setQuery={setQuery} />
        <Results
          activeTab={activeTab}
          results={results}
          handleItemSelect={handleItemSelect}
          handleAction={handleAction}
        />
      </main>

      <BottomNav />
    </div>
  );
}
