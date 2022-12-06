import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import CorpCard from "../components/Main/CorpCard";
import { AllCompany } from "../api/CompanyApi";
import { ICompanyDataTypes } from "../types/CompanyData";
import Link from "next/link";

export default function Home() {
  const [companyData, setCompanyData] = useState([]);
  useEffect(() => {
    AllCompany().then((res) => setCompanyData(res?.data));
  }, []);

  return (
    <Main>
      <CardList>
        {companyData?.map((value: ICompanyDataTypes, index) => (
          <Link key={index} href={`/corp/${value.id}`}>
            <CorpCard
              id={value.id}
              name={value.name}
              classification={value.classification}
              wage={value.wage}
              isInclusiveWage={value.isInclusiveWage}
              isPublicStock={value.isPublicStock}
              numberOfEmployees={value.numberOfEmployees}
              recruitmentSite={value.recruitmentSite}
              site={value.site}
              welfares={value.welfares.slice(0, 7)}
            />
          </Link>
        ))}
      </CardList>
    </Main>
  );
}

const Main = styled.main`
  padding: 12px 24px 20px;
`;

const CardList = styled.section`
  display: grid;
  padding: 0 0 32px;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  grid-column: 1/3;
  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 690px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
