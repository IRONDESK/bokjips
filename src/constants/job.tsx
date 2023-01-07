export const COMPANY_TYPES = [
  { name: "IT·테크", value: "ittech" },
  { name: "생활", value: "life" },
  { name: "서비스", value: "service" },
  { name: "금융", value: "finance" },
  { name: "제조업", value: "product" },
  { name: "문화·미디어", value: "media" },
  { name: "공공", value: "public" },
];

export const COMPANY_TYPES_LITERAL: { [key: string]: string } = {
  ittech: "IT·테크",
  life: "생활",
  service: "서비스",
  finance: "금융",
  product: "제조업",
  media: "문화·미디어",
  public: "공공",
};

export const JOB_TYPES = [
  { value: "develop", name: "개발" },
  { value: "business", name: "경영·전략" },
  { value: "media", name: "마케팅·미디어" },
  { value: "design", name: "디자인" },
  { value: "sales", name: "영업" },
  { value: "service", name: "고객서비스" },
  { value: "hr", name: "HR" },
  { value: "engineer", name: "엔지니어링" },
  { value: "finance", name: "금융" },
  { value: "logistics", name: "물류" },
  { value: "manufacture", name: "제조·생산" },
  { value: "edu", name: "교육" },
  { value: "medical", name: "의료·제약" },
  { value: "food", name: "식·음료" },
  { value: "law", name: "법률" },
  { value: "construction", name: "건설" },
  { value: "public", name: "공공·복지" },
];

export const WELFARE_TYPES: { [key: string]: string } = {
  workingConditions: "근무 조건",
  workSupport: "근무 지원",
  offDutySupport: "근무 외 지원",
  officeEnvironment: "사내 환경",
};
