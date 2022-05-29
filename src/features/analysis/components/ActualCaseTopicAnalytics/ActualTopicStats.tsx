import { Box, useTheme } from "@material-ui/core";
import { useDatabaseContext } from "providers/useDatabaseContext";
import { Chart, Typography } from "shared/components/ui";

export const ActualTopicStats = ({
  topicId,
  onModalClose,
}: {
  topicId: string;
  onModalClose: () => void;
}) => {
  const theme: any = useTheme();
  const { topicAnalysis: topicsList } = useDatabaseContext();

  const currentTopic = topicsList?.find(({ id }) => id.toString() === topicId);

  const topicData = currentTopic?.words?.map(({ text, frequency }) => ({
    category: text,
    value: frequency,
  }));

  const otherTopicData = currentTopic?.words?.map(
    ({ text, otherFrequency }) => ({
      category: text,
      value: otherFrequency,
    })
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="subtitle5">{currentTopic?.title}</Typography>
      <Chart
        type="bar"
        categoryName="shto to"
        chartData={topicData}
        extraChartData={otherTopicData}
        height={290}
        width={700}
        mainLabelColor={theme.palette.primary.main}
        otherLabelColor={theme.palette.info.light}
      />
    </Box>
  );
};
