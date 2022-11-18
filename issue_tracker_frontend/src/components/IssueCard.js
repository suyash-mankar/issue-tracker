import styles from "../styles/projectDetails.module.css";

function IssueCard({ issue }) {
  return (
    <div className={styles.issueCard} key={issue._id}>
      <p>Issue Title : {issue.title}</p>
      <p>Issue Description : {issue.description}</p>
      <p>Issue Author : {issue.author}</p>
      <div className={styles.labelContainer}>
        {issue.labels.map((label, index) => {
          return (
            <p className={styles.label} key={index}>
              {label}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default IssueCard;
