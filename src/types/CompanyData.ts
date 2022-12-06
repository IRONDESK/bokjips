export interface ICompanyDataTypes {
  id: number;
  name: string;
  classification: string;
  wage: number;
  isInclusiveWage: "Y" | "N";
  isPublicStock: string;
  numberOfEmployees: string;
  recruitmentSite: string;
  site: string;
  welfares: IWelfareDataTypes[];
}

export interface IWelfareDataTypes {
  id: number;
  type: string;
  title: string;
  content: string;
  icon: string;
}
