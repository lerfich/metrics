import React from "react";
import styles from "./Case.module.css";

interface CaseType {
  name: string;
  progress: string;
  status: string;
}

export const Case: React.FC<CaseType> = (props) => {
  return (
    <div className={styles.case}>
      <div className={styles.caseName}>{props.name}</div>
      <div className={styles.caseProgress}>
        <div className={styles.progressBar}>{props.progress}</div>
      </div>
      <div className={styles.caseStatus}>{props.status}</div>
    </div>
  );
};
