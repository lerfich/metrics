import { css, useTheme } from "@emotion/react";
import { Avatar, Box, Chip, Divider, IconButton } from "@material-ui/core";
import { useDatabaseContext } from "providers/useDatabaseContext";
import React from "react";
import { Button, Icon, Typography } from "shared/components/ui";

const IMAGE_URL =
  "https://cdn.filestackcontent.com/security=policy:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MTY1MjQ4NjQwMCwiaGFuZGxlIjoibkloYVU5QUtUN2FZV295NUhydkcifQ==,signature:315f132626ab2cac6f7741fe0812e43a2ba3fb64a7bcefbec8c14654fc925757/nIhaU9AKT7aYWoy5HrvG";

const USER_AVATAR_SIZE = 90;

const userAvatarCSS = css`
  width: ${USER_AVATAR_SIZE}px;
  height: ${USER_AVATAR_SIZE}px;
`;

const firstColorCss = (theme: any) => css`
  color: ${theme.palette.primary.light};
  line-height: 26px;
`;

const labelIconCss = (theme: any) => css`
  color: ${theme.palette.success.light};
`;

const BOTTOM_BUTTONS_PADDING = 10;

const commonButtonsCSS = css`
  padding-left: ${BOTTOM_BUTTONS_PADDING}px;
  padding-right: ${BOTTOM_BUTTONS_PADDING}px;
`;

const cancelButtonCSS = (theme: any) => css`
  ${commonButtonsCSS};
  color: ${theme.palette.primary.dark};
  margin-right: ${BOTTOM_BUTTONS_PADDING}px;
`;

const userClassCSS = (theme: any) => css`
  color: ${theme.palette.text.primary};
`;

export const InfluencerProfile = ({
  userId,
  onModalClose,
}: {
  userId: string;
  onModalClose: () => void;
}) => {
  const theme: any = useTheme();
  const onViewProfileClick = React.useCallback(() => {}, []);

  const { influencers } = useDatabaseContext();
  const currentUser = React.useMemo(
    () =>
      influencers?.find(
        (influencer) => influencer.userId.toString() === userId
      ),
    [userId, influencers]
  );

  const maxLikes = Math.max(
    ...influencers?.map(({ likesCount }) => likesCount)
  );

  const maxPosts = Math.max(
    ...influencers?.map(({ tweetsCount }) => tweetsCount)
  );
  const maxReposts = Math.max(
    ...influencers?.map(({ repostsCount }) => repostsCount)
  );
  const maxInvolved = Math.max(...influencers?.map(({ involved }) => involved));

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="row"
        alignItems="center"
        mr={1}
      >
        <Avatar css={userAvatarCSS} src={IMAGE_URL || ""} variant="circular" />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          ml={2}
          mt={2}
        >
          <Typography variant="subtitle4">{currentUser?.user}</Typography>
        </Box>
      </Box>
      <Box display="grid" gridTemplateRows="auto" pb={2}>
        <Box display="grid" gridTemplateRows="auto" alignItems="center">
          <Box ml={1} display="grid" gridTemplateColumns="7fr 1fr">
            <Typography css={userClassCSS} variant="body1">
              Number of posts:
            </Typography>
            <Chip
              style={{
                backgroundColor:
                  maxPosts === currentUser?.tweetsCount
                    ? theme.palette.success.light
                    : "",
              }}
              disabled={false}
              label={currentUser?.tweetsCount}
              size="small"
            />
          </Box>
          <Box ml={1} display="grid" gridTemplateColumns="7fr 1fr">
            <Typography css={userClassCSS} variant="body1">
              Number of likes:
            </Typography>
            <Chip
              style={{
                backgroundColor:
                  maxLikes === currentUser?.likesCount
                    ? theme.palette.success.light
                    : "",
              }}
              disabled={false}
              label={currentUser?.likesCount}
              size="small"
            />
          </Box>
          <Box ml={1} display="grid" gridTemplateColumns="7fr 1fr">
            <Typography css={userClassCSS} variant="body1">
              Number of reposts:
            </Typography>
            <Chip
              style={{
                backgroundColor:
                  maxReposts === currentUser?.repostsCount
                    ? theme.palette.success.light
                    : "",
              }}
              disabled={false}
              label={currentUser?.repostsCount}
              size="small"
            />
          </Box>
          <Box ml={1} display="grid" gridTemplateColumns="7fr 1fr">
            <Typography css={userClassCSS} variant="body1">
              Number of users involved:
            </Typography>
            <Chip
              style={{
                backgroundColor:
                  maxInvolved === currentUser?.involved
                    ? theme.palette.success.light
                    : "",
              }}
              disabled={false}
              label={currentUser?.involved}
              size="small"
            />
          </Box>
        </Box>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="min-content auto"
        alignItems="center"
      >
        <Icon name="Label" css={labelIconCss} />
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography variant="subtitle6" css={firstColorCss} align="center">
            First by this category
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box display="flex" justifyContent="end" pt={2} pb={1}>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" justifyContent="end" alignItems="end" mr={2}>
            <Button
              color="secondary"
              startIcon={<Icon name="Article" fontSize="small" />}
              size="small"
              onClick={onViewProfileClick}
            >
              Go to profile
            </Button>
          </Box>
          <Button css={cancelButtonCSS} size="small" onClick={onModalClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
