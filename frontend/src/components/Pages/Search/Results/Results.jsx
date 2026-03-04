import styles from "@/components/Pages/Search/Results/Results.module.css";

import { MdFlag } from "react-icons/md";

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
            {activeTab === "people" ? (
              item?.profile_picture_url ? (
                <img
                  src={item.profile_picture_url}
                  alt={`${item.first_name}'s profile picture`}
                  className={styles.profileImg}
                />
              ) : (
                <div className={styles.profileInitial}>
                  {item?.first_name?.charAt(0).toUpperCase()}
                </div>
              )
            ) : item?.club_logo ? (
              <img
                src={item.logo}
                alt={`${item.name} logo`}
                className={styles.clubLogo}
              />
            ) : (
              <MdFlag className={styles.placeholder} />
            )}
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
