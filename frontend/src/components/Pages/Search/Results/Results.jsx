import styles from "@/components/Pages/Search/Results/Results.module.css";

export default function Results({
  activeTab,
  results,
  handleItemSelect,
  handleAction,
}) {
  return (
    <div className={styles.list}>
      {results.map((item) => (
        <div key={item.id} className={styles.resultItem}>
          <div
            className={styles.profile}
            onClick={() => handleItemSelect(item.id)}
          >
            <img
              src={
                activeTab === "people" ? item.profile_picture_url : item.logo
              }
              alt="avatar"
              className={styles.avatar}
            />
            <div className={styles.info}>
              <h4 className={styles.infoPrimary}>
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
  );
}
