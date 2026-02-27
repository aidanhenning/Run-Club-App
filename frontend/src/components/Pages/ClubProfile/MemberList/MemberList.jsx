import styles from "@/components/Pages/ClubProfile/MemberList/MemberList.module.css";

import { useNavigate } from "react-router";

export default function MemberList({ club, loading }) {
  const navigate = useNavigate();

  return (
    <section className={styles.clubMembers}>
      <h3>Members</h3>
      <div className={styles.membersContainer}>
        {loading ? (
          <p>Loading members...</p>
        ) : club?.members?.length > 0 ? (
          club.members.map((member) => (
            <div
              key={member.id}
              className={styles.memberCard}
              onClick={() => navigate(`/profile/${member.id}`)}
            >
              <img
                src={member.profile_picture_url}
                alt={`${member.first_name}'s profile picture`}
                className={styles.memberAvatar}
              />
              <div className={styles.memberInfo}>
                <p className={styles.memberName}>
                  {member.first_name} {member.last_name}
                </p>
                <p className={styles.clubRuns}>
                  {member.runs_with_club} Club Runs
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>This club has no members</p>
        )}
      </div>
    </section>
  );
}
