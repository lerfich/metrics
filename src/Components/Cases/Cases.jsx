import React, { useContext } from 'react';
import { observer } from 'mobx-react';

import { StoreContext } from '../../store';

import Case from '../Case/Case.tsx';

import styles from './Cases.module.css';

function Cases() {
  const globalStore = useContext(StoreContext);

  const cases = globalStore.models.casesModel.cases.map((caseInfo, ind) =>
    <Case key={caseInfo.name} name={caseInfo.name} progress={caseInfo.progress} status={caseInfo.status} />
  );

  return (
    <div className={styles.cases}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Активные кейсы</h1>
      </div>
      <div className={styles.header}>
        <div className={styles.casesNames}>Название</div>
        <div className={styles.casesProgress}>Прогресс</div>
        <div className={styles.casesStatus}>Статус</div>
      </div>
      {cases}
    </div>
  );
}

export default observer(Cases);
