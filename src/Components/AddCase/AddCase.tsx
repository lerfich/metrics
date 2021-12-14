import { observer } from 'mobx-react';
import React, {useCallback, useContext} from 'react';
import {
  FcViewDetails, FcKey, FcReading, FcOvertime, FcCollaboration,
} from 'react-icons/fc';
import { IoLogoTwitter, IoLogoYoutube } from 'react-icons/io';
import { StoreContext } from '../../store';
import './AddCase.css';
import ModalHelp from './ModalHelp';


function AddCase() {
  const globalStore = useContext(StoreContext);

  const caseInfo = globalStore.models.createCaseModel.caseInfo;

  const updateCaseInfo = useCallback((event) => {
    if(event.currentTarget.name === 'twitter' || event.currentTarget.name === 'youtube') {
      globalStore.models.createCaseModel.updateCaseInfo(event.currentTarget.name, event.currentTarget.checked);
    } else {
      globalStore.models.createCaseModel.updateCaseInfo(event.currentTarget.name, event.currentTarget.value);
    }
  }, [globalStore.models.createCaseModel]);

  const addCase = useCallback((e) => {
    globalStore.models.casesModel.addCase(e, caseInfo.name);
  }, [caseInfo, globalStore.models.casesModel]);

  return (
    <div className="add-case-section">
      <form className="case-form" onSubmit={addCase}>
        <div className="block-title-container">
          <h1>Параметры сбора информации</h1>
        </div>

        <section className="case-info">
          <div className="title">
            <FcReading className="header-icon" />
            <p className="header-text">Название кейса</p>
          </div>
          <label className="case-info__case-content" htmlFor="case-name-input">
            <input className="case-name-input" type="text" name="name" placeholder="Введите название кейса" onChange={updateCaseInfo} value={caseInfo.name}  />
          </label>
        </section>

        <section className="case-info">
          <div className="title">
            <FcViewDetails className="header-icon" />
            <p className="header-text">Описание кейса</p>
          </div>
          <label className="case-info__case-content" htmlFor="case-description-input">
            <textarea className="case-description-input" name="description" placeholder="Введите описание кейса" onChange={updateCaseInfo} value={caseInfo.description} />
          </label>
        </section>

        <section className="case-info">
          <div className="title">
            <FcKey className="header-icon" />
            <p className="header-text">Тэги и ключевые понятия</p>
          </div>
          <label className="case-info__case-content case-info__case-content_tags" htmlFor="case-tags-input">
            <input className="case-tags-input" name="tags" placeholder="Введите теги и ключевые понятия через ;" onChange={updateCaseInfo} value={caseInfo.tags} />
            <ModalHelp />
          </label>
        </section>

        <section className="case-info">
          <div className="title">
            <FcOvertime className="header-icon" />
            <p className="header-text">Период сбора</p>
          </div>
          <div className="row">
            <label className="case-info__case-content" htmlFor="case-time-input">
              <p>Начало сбора</p>
              <input type="time" className="case-time-input" name="startTime" onChange={updateCaseInfo} value={caseInfo.startTime} />
              <input type="date" className="case-date-input" name="startDate" onChange={updateCaseInfo} value={caseInfo.startDate} />
            </label>
            <label className="case-info__case-content" htmlFor="case-time-input">
              <p>Конец сбора</p>
              <input type="time" className="case-time-input" name="endTime" onChange={updateCaseInfo} value={caseInfo.endTime} />
              <input type="date" className="case-date-input" name="endDate" onChange={updateCaseInfo} value={caseInfo.endDate} />
            </label>

          </div>
        </section>

        <section className="case-info final-section">
          <div className="title">
            <FcCollaboration className="header-icon" />
            <p className="header-text">Социальные сети</p>
          </div>
          <div className="case-info__case-content">
            <label className="input-container" htmlFor="twitter-input">
              <IoLogoTwitter className="network-icon network-icon_twitter" />
              <p>Twitter</p>
              <input type="checkbox" className="network-input twitter-input" name="twitter" onChange={updateCaseInfo} />
            </label>
            <label className="input-container" htmlFor="youtube-input">
              <IoLogoYoutube className="network-icon network-icon_youtube" />
              <p>YouTube</p>
              <input type="checkbox" className="network-input youtube-input"  name="youtube" onChange={updateCaseInfo}/>
            </label>
            <div className='buttons-group'>
              <button className="add-case-btn">Сохранить</button>
              <button className="add-case-btn" type='submit' >Сохранить и запустить</button>
            </div>
          </div>
        </section>

        {/* <div className="block-title-container">
          <h1>Блок анализа информации</h1>
        </div>

        <section className="case-info">
          <div className="title">
            <FcDataConfiguration className="header-icon" />
            <p className="header-text">Метаинформация</p>
          </div>
          <div className="case-info__case-content">
            <label className="input-container" htmlFor="case-metainfo-input">
              <p>Загрузка метаданных</p>
              <input type="checkbox" className="case-metainfo-input" name="case-metainfo-input" />
              <ModalHelp modalType="meta" />
            </label>
          </div>
        </section> */}

        {/* <section className="case-info">
            <div className="title">
              <FcFilingCabinet className="header-icon" />
              <p className="header-text">Формат загрузки данных</p>
            </div>
            <div className="case-info__case-content">
              <label className="input-container" htmlFor="txt-input">
                <p className="format-text">txt</p>
                <input type="checkbox" className="txt-input checkbox-input" name="txt-input" />
              </label>
              <label className="input-container" htmlFor="csv-input">
                <p className="format-text">csv</p>
                <input type="checkbox" className="csv-input checkbox-input" name="csv-input" />
              </label>
              <label className="input-container" htmlFor="xls-input">
                <p className="format-text">xls</p>
                <input type="checkbox" className="xls-input checkbox-input" name="xls-input" />
              </label>
            </div>
          </section> */}

        {/* <section className="case-info">
          <div className="title">
            <FcStatistics className="header-icon" />
            <p className="header-text">Периодичность публикаций</p>
          </div>
          <div>
            <div className="case-info__case-content">
              <label className="input-container" htmlFor="minute-input">
                <p className="format-text">Минутная</p>
                <input type="checkbox" className="minute-input" name="minute-input" />
              </label>
              <label className="input-container" htmlFor="hour-input">
                <p className="format-text">Часовая</p>
                <input type="checkbox" className="hour-input" name="hour-input" />
              </label>
              <label className="input-container" htmlFor="day-input">
                <p className="format-text">Дневная</p>
                <input type="checkbox" className="day-input checkbox-input" name="day-input" />
              </label>
              <label className="input-container" htmlFor="week-input">
                <p className="format-text">Недельная</p>
                <input type="checkbox" className="week-input checkbox-input" name="week-input" />
              </label>
              <label className="input-container" htmlFor="quarter-input">
                <p className="format-text">Квартальная</p>
                <input type="checkbox" className="quarter-input checkbox-input" name="quarter-input" />
              </label>
            </div>
          </div>
        </section> */}

        {/* <section className="case-info">
          <div className="title">
            <FcAbout className="header-icon" />
            <p className="header-text">Общая информация о дискуссии</p>
          </div>
          <div className="case-info__case-content">
            <label className="input-container" htmlFor="total-number-of-users-input">
              <p className="format-text">Общее кол-во пользователей</p>
              <input type="checkbox" className="total-number-of-users-input checkbox-input" name="total-number-of-users-input" />
            </label>
            <label className="input-container" htmlFor="number-of-active-users-input">
              <p className="format-text">Кол-во публикующих пользователей</p>
              <input type="checkbox" className="number-of-active-users-input checkbox-input" name="number-of-active-users-input" />
            </label>
            <label className="input-container" htmlFor="number-of-attracted-users-input">
              <p className="format-text">Кол-во привлеченных пользователей</p>
              <input type="checkbox" className="number-of-attracted-users-input checkbox-input" name="number-of-attracted-users-input" />
            </label>
            <label className="input-container" htmlFor="number-of-messages-input">
              <p className="format-text">Кол-во сообщений</p>
              <input type="checkbox" className="number-of-messages-input checkbox-input" name="number-of-messages-input" />
            </label>
            <label className="input-container" htmlFor="comments-input">
              <p className="format-text">Комментарии</p>
              <input type="checkbox" className="comments-input checkbox-input" name="comments-input" />
            </label>
            <label className="input-container" htmlFor="posts-input">
              <p className="format-text">Посты</p>
              <input type="checkbox" className="posts-input checkbox-input" name="posts-input" />
            </label>
            <label className="input-container" htmlFor="likes-input">
              <p className="format-text">Лайки</p>
              <input type="checkbox" className="likes-input checkbox-input" name="likes-input" />
            </label>
            <label className="input-container" htmlFor="xls-input">
              <p className="format-text">Просмотры</p>
              <input type="checkbox" className="csv-input checkbox-input" name="xls-input" />
            </label>
          </div>
        </section> */}

        {/* <section className="case-info">
          <div className="title">
            <FcMindMap className="header-icon" />
            <p className="header-text">Выгрузить пользовательский граф</p>
          </div>
          <div className="case-info__case-content">
            <label className="input-container" htmlFor="xls-input">
              <p className="format-text">Взвешенный</p>
              <input type="checkbox" className="csv-input checkbox-input" name="xls-input" />
            </label>
            <label className="input-container" htmlFor="xls-input">
              <p className="format-text">Не взвешенный</p>
              <input type="checkbox" className="csv-input checkbox-input" name="xls-input" />
            </label>
            <button className="add-case-btn">Сохранить</button>
          </div>
        </section> */}

        {/* <section className="case-info">
            <button className="add-case-btn">Сохранить</button>
          </section> */}

      </form>
    </div>
  );
}

export default observer(AddCase);
