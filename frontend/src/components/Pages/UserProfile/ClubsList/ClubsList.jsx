import styles from "@/components/Pages/UserProfile/ClubsList/ClubsList.module.css";

function ClubItem({ club }) {
  return (
    <div className={styles.clubCard}>
      <img
        src={club.image_url || "/default-club.png"}
        alt={club.name}
        className={styles.clubImage}
      />
      <h4 className={styles.clubName}>{club.name}</h4>
    </div>
  );
}

export default function ClubsList({ clubs }) {
  return (
    <section className={styles.clubs}>
      <h3 className={styles.clubsTitle}>Clubs</h3>

      {clubs?.length > 0 ? (
        <div className={styles.clubsList}>
          {clubs.map((club) => (
            <ClubItem key={club.id} club={club} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>No clubs joined yet.</p>
        </div>
      )}
    </section>
  );
}
