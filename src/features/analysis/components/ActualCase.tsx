import React from "react";
import { useParams } from "react-router-dom";
import { CaseNotFound } from "./CaseNotFound";
import { useCurrentCase } from "../hooks/useCurrentCase";
import { ActualCaseNavbarWrapper } from "./ActualCaseNavbarWrapper";

export const ActualCase: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: currentCase } = useCurrentCase(id);

  return (
    <>
      {id === ":id" ? (
        <CaseNotFound />
      ) : (
        <ActualCaseNavbarWrapper
          tweets={currentCase?.tweets}
          tweetsCount={currentCase?.tweetsCount}
          generalStats={currentCase?.generalStats}
          dateFilter={currentCase?.dateFilter}
          tags={currentCase?.tags}
          filters={currentCase?.filters}
        />
      )}
    </>
  );
};
