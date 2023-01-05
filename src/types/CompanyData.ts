export interface ICompanyDataTypes extends ICompanyWelfaresTypes {
  companyId: string;
  name: string;
  classification: string;
  wage?: number;
  isInclusiveWage?: string;
  isPublicStock?: boolean;
  numberOfEmployee?: number;
  logo?: string;
  isCertified?: boolean;
  favorite?: string;
  isFavorite?: boolean | null;
  recruitmentSite?: string;
  site?: string;
}

export interface ICompanyWelfaresTypes {
  companyId?: string;
  workingConditions?: IWelfareDataTypes[];
  workSupport?: IWelfareDataTypes[];
  offDutySupport?: IWelfareDataTypes[];
  officeEnvironment?: IWelfareDataTypes[];
}

export interface IWelfareDataTypes {
  companyId?: string;
  type: string;
  title: string;
  content: string;
  icon: string;
}
