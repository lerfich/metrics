import React from "react";

import { Box } from "@material-ui/core";
import { Route, useParams } from "react-router-dom";
import { APP_URL } from "shared/components/navigation/constants";
import { RouterSwitchSymbol } from "shared/symbols/RouterSwitchSymbol";
import { ActualCaseBasicAnalytics } from "../ActualCaseBasicAnalytics";
import { NavbarList } from "./NavbarList";
import { buildUrl } from "shared/routes/routerUtils";
import { ActualCaseContentInput } from "features/analysis/types";
import { ActualCaseSidebar } from "../ActualCaseSidebar";
import { ActualCaseContent } from "../ActualCaseContent";
import { ActualCaseAdvancedAnalytics } from "../ActualCaseAdvancedAnalytics";
import { InfluencersPage } from "features/analysis/pages/InfluencersPage";
import { TopicAnalysisPage } from "features/analysis/pages/TopicAnalysisPage";
import { SemanticAnalysisPage } from "features/analysis/pages/SemanticAnalysisPage";

export const ActualCaseNavbarWrapper: React.FC<ActualCaseContentInput> = ({
  generalStats,
  tweets,
  tweetsCount,
  dateFilter,
  tags,
  filters,
}) => {
  const { id } = useParams<{ id: string }>();
  const MAIN_SIDEBAR_LIST_DATA = [
    {
      title: "Data",
      icon: "Feed",
      route: buildUrl(APP_URL.actualCase, { pathParams: { id } }),
    },
    {
      title: "Influencers",
      icon: "People",
      route: buildUrl(APP_URL.influencers, { pathParams: { id } }),
    },
    {
      title: "Basic analysis",
      icon: "BarChart",
      route: buildUrl(APP_URL.actualCaseBasicAnalytics, { pathParams: { id } }),
    },
    {
      title: "Advanced analysis",
      icon: "Addchart",
      route: buildUrl(APP_URL.actualCaseAdvancedAnalytics, {
        pathParams: { id },
      }),
    },
  ];

  const [currentKey, setCurrentKey] = React.useState(0);

  const filtersLength = filters?.length || 0;
  const socialKeysIterator = React.useCallback(
    (filters: string[]) => {
      setCurrentKey(currentKey + 1);
      return filters[currentKey + 1];
    },
    [currentKey]
  );

  const [socialFilter, setSocialFilter] = React.useState(
    filters && currentKey < filtersLength
      ? {
          [`${socialKeysIterator(filters)}`]: false,
        }
      : {}
  );

  const [isShowingCheckbox, setIsShowingCheckbox] = React.useState(false);

  const onChangeSocialFilter = React.useCallback(
    (e, name) => {
      setSocialFilter({ ...socialFilter, [`${name}`]: e.target.checked });
    },
    [socialFilter]
  );

  return (
    <Box display="grid" gridTemplateColumns="1fr 4fr" height="100%" my={2}>
      <ActualCaseSidebar
        dateFilter={dateFilter}
        tags={tags}
        filters={filters}
        socialFilter={socialFilter}
        onChangeFilter={onChangeSocialFilter}
        isShowingCheckbox={isShowingCheckbox}
      />
      <Box display="grid" gridTemplateRows="1fr 8fr">
        <NavbarList listData={MAIN_SIDEBAR_LIST_DATA} />
        <Box mx={2}>
          <RouterSwitchSymbol
            routes={
              <React.Fragment>
                <Route path={APP_URL.actualCase} exact>
                  <ActualCaseContent
                    tweets={tweets}
                    tweetsCount={tweetsCount}
                    generalStats={generalStats}
                    setIsShowingCheckbox={setIsShowingCheckbox}
                  />
                </Route>
                <Route path={APP_URL.influencers} exact>
                  <InfluencersPage
                    setIsShowingCheckbox={setIsShowingCheckbox}
                  />
                </Route>
                <Route path={APP_URL.actualCaseBasicAnalytics} exact>
                  <ActualCaseBasicAnalytics
                    socialFilter={socialFilter}
                    setIsShowingCheckbox={setIsShowingCheckbox}
                  />
                </Route>
                <Route path={APP_URL.actualCaseAdvancedAnalytics} exact>
                  <ActualCaseAdvancedAnalytics
                    setIsShowingCheckbox={setIsShowingCheckbox}
                  />
                </Route>
                <Route path={APP_URL.actualCaseSemanticAnalytics} exact>
                  <SemanticAnalysisPage
                    setIsShowingCheckbox={setIsShowingCheckbox}
                  />
                </Route>
                <Route path={APP_URL.actualCaseTopicAnalytics} exact>
                  <TopicAnalysisPage
                    setIsShowingCheckbox={setIsShowingCheckbox}
                  />
                </Route>
              </React.Fragment>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};
