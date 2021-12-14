import { observable, action, makeObservable, toJS } from "mobx";

interface CaseInfo {
  name: string,
  progress: string,
  status: string,
}

class CasesModel {
  constructor() {
    makeObservable(this, {
      cases: observable,
      addCase: action,
    });
  }

  cases: CaseInfo[] = [];

  addCase(e:any, caseName: string) {
    e.preventDefault();
    const caseInfo = {
      name: caseName,
      progress: '0%',
      status: 'crawling',
    };

    this.cases = [...this.cases, caseInfo];

    console.log(toJS(this.cases));
  }

}

export default CasesModel;
