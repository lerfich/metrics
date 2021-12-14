import { observable, action, makeObservable, toJS } from "mobx";

interface CaseInfo {
  name: string,
  description: string,
  tags: string,
  startTime: string,
  startDate: string,
  endTime: string,
  endDate: string,
  twitter: boolean,
  youtube: boolean,
}

class CreateCaseModel {
  caseInfo: CaseInfo = {
    name: '',
    description: '',
    tags: '',
    startTime: '',
    startDate: '',
    endTime: '',
    endDate: '',
    twitter: false,
    youtube: false,
  }

  updateCaseInfo(name: string, value: string | boolean) {
    console.log(name);
    console.log(value);
    this.caseInfo = {
      ...this.caseInfo,
      [name]: value,
    }
  }

  constructor() {
    makeObservable(this, {
      caseInfo: observable,
      updateCaseInfo: action,
    });
  }


}

export default CreateCaseModel;
