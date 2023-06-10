import React from "react";
import styled from "@emotion/styled";

import CorpCard from "./CorpCard";
import { ICompanyDataPageListTypes, ICompanyDataTypes } from "../../types/CompanyData";

function CardList({ data }: { data: ICompanyDataPageListTypes }) {
  return (
    <Container>
      {data?.content?.map((value: ICompanyDataTypes, idx: number) => (
        <CorpCard
          companyId={value?.companyId}
          name={value?.name}
          logo={value?.logo}
          classification={value?.classification}
          wage={value?.wage}
          isInclusiveWage={value?.isInclusiveWage}
          isPublicStock={value?.isPublicStock}
          numberOfEmployee={value?.numberOfEmployee}
          welfares={
            [
              ...(value?.workingConditions || []).slice(0, 3),
              ...(value?.officeEnvironment || []).slice(0, 3),
              ...(value?.workSupport || []).slice(0, 2),
              ...(value?.offDutySupport || []).slice(0, 5),
            ].slice(0, 7) || []
          }
          isCertified={value.isCertified}
          favorite={value?.favorite}
        />
      ))}
    </Container>
  );
}

const Container = styled.section`
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

export default CardList;
