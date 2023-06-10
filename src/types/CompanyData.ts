export interface ICompanyDataPageListTypes {
  content: ICompanyDataTypes[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface ICompanyDataTypes extends ICompanyWelfaresTypes {
  companyId: string;
  name: string;
  classification: string;
  wage?: number;
  isInclusiveWage?: string;
  isPublicStock?: boolean;
  numberOfEmployee?: number;
  logo?: string;
  isCertified?: boolean | string;
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
  type: string;
  title: string;
  content: string;
  icon: string;
}
