import styles from "@/components/Pages/ClubProfile/EventList/EventList.module.css";

import { useState } from "react";
import { MdOutlineDirectionsRun, MdOutlineLocationOn } from "react-icons/md";

export default function EventList({ club, loading }) {
  const [view, setView] = useState("upcoming");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleString("en-US", { month: "short" }),
      day: date.toLocaleString("en-US", { day: "2-digit" }),
      weekday: date.toLocaleString("en-US", { weekday: "short" }),
    };
  };

  return (
    <section className={styles.events}>
      <div className={styles.tabContainer}>
        <button
          className={view === "upcoming" ? styles.activeTab : styles.tab}
          onClick={() => setView("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={view === "past" ? styles.activeTab : styles.tab}
          onClick={() => setView("past")}
        >
          Past
        </button>
      </div>
      <div className={styles.eventsContainer}>
        {loading ? (
          <p>Loading events...</p>
        ) : (view === "upcoming" ? club?.upcomingEvents : club?.pastEvents)
            ?.length > 0 ? (
          (view === "upcoming" ? club.upcomingEvents : club.pastEvents).map(
            (event) => {
              const { month, day, weekday } = formatDate(event.starts_at);
              return (
                <div key={event.id} className={styles.eventCard}>
                  <div className={styles.calendarIcon}>
                    <span
                      className={
                        view === "upcoming"
                          ? styles.upcomingMonth
                          : styles.pastMonth
                      }
                    >
                      {month}
                    </span>
                    <span className={styles.day}>{day}</span>
                    <span className={styles.weekday}>{weekday}</span>
                  </div>

                  <div className={styles.eventDetails}>
                    <h4>{event.title}</h4>
                    <div className={styles.detailRow}>
                      <MdOutlineDirectionsRun className={styles.icon} />
                      <span>{event.run_type}</span>
                    </div>
                    <div className={styles.detailRow}>
                      <MdOutlineLocationOn className={styles.icon} />
                      <address className={styles.address}>
                        {event.address}
                      </address>
                    </div>
                  </div>
                </div>
              );
            },
          )
        ) : (
          <p className={styles.emptyState}>No {view} events found</p>
        )}
      </div>
    </section>
  );
}
