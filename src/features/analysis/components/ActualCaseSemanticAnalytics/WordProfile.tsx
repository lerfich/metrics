import { css } from "@emotion/react";
import { Box } from "@material-ui/core";
import { useDatabaseContext } from "providers/useDatabaseContext";
import React from "react";
import { Typography } from "shared/components/ui";
import { SEMANTIC_WORD_TOP } from "./constants";

const wordColoredCss = (theme: any) => css`
  color: ${theme.palette.error.light};
`;

export const WordProfile = ({
  wordId,
  onModalClose,
  sortType,
}: {
  wordId: string;
  onModalClose: () => void;
  sortType: string;
}) => {
  const { positiveSemanticWords, neutralSemanticWords, negativeSemanticWords } =
    useDatabaseContext();

  const switchActualLOV = React.useCallback(
    (sortType) => {
      switch (sortType) {
        case Object.keys(SEMANTIC_WORD_TOP)[0]: {
          return positiveSemanticWords;
        }
        case Object.keys(SEMANTIC_WORD_TOP)[1]: {
          return negativeSemanticWords;
        }
        case Object.keys(SEMANTIC_WORD_TOP)[2]: {
          return neutralSemanticWords;
        }
        default: {
          return positiveSemanticWords;
        }
      }
    },
    [negativeSemanticWords, neutralSemanticWords, positiveSemanticWords]
  );

  const currentWord = React.useMemo(
    () =>
      switchActualLOV(sortType).find(
        (word) => word?.wordId?.toString() === wordId
      ),
    [switchActualLOV, sortType, wordId]
  );
  return (
    <Box display="grid" gridTemplateColumns="auto auto">
      <Box>
        <Typography variant="subtitle5">Met in the next phrases: </Typography>
      </Box>
      <Box>
        {currentWord?.phrasesMetIn?.map((phrase) => {
          const wordIndex = phrase.indexOf(currentWord.word);
          return (
            <Box display="flex" justifyContent="start">
              <Typography variant="subtitle6">
                {phrase.slice(0, wordIndex)} &nbsp;
              </Typography>
              <Typography variant="subtitle6" css={wordColoredCss}>
                {currentWord.word} &nbsp;
              </Typography>
              <Typography variant="subtitle6">
                {phrase.slice(wordIndex + currentWord.word.length)}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
