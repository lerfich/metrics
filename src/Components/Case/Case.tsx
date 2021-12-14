import styles from './Case.module.css';

function Case(props: {name: string, progress: string, status: string}) {
  return (
    <div className={styles.case}>
      <div className={styles.caseName}>{props.name}</div>
      <div className={styles.caseProgress}>
        <div className={styles.progressBar}>
          {props.progress}
        </div>
      </div>
      <div className={styles.caseStatus}>{props.status}</div>
    </div>
  );
}

export default Case;