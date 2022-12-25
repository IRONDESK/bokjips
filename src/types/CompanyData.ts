export interface ICompanyDataTypes {
  id: number;
  name: string;
  classification: string;
  wage: number;
  isInclusiveWage: "Y" | "N";
  isPublicStock: boolean;
  numberOfEmployees: string;
  recruitmentSite: string;
  site: string;
  welfares: IWelfareDataTypes[];
}

export interface IWelfareDataTypes {
  type: string;
  title: string;
  content: string;
  icon: string;
}
