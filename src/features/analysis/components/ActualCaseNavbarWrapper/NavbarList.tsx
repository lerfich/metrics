import { css, useTheme } from "@emotion/react";
import { Box, List, ListItemText } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { ListItemIconSymbol } from "shared/symbols";
import { NavListItemSymbol } from "shared/symbols";

const listItemContainerCss = css`
  display: flex;
  justify-content: center;
  margin: 0;
`;

const listItemIconCss = (theme: any) => css`
  margin-right: 5px;
  fill: ${theme.palette.text.secondary};
`;

const containerCss = (theme: any) => css`
  width: 50%;
  display: flex;
  height: 60%;
  flex-direction: row;
  border: 0.5px solid ${theme.palette.borderlight};
  border-radius: ${theme.spacing(1)}px;
`;

const navItemTitleCss = css`
  padding: 0;
  margin: 0;
`;

type NavbarListItemProps = {
  title: string;
  icon: string;
  route: string;
};

type NavbarListProps = {
  listData: NavbarListItemProps[];
};

export const NavbarList = ({ listData }: NavbarListProps) => {
  const theme: any = useTheme();
  const location = useLocation();
  return (
    <Box ml={4}>
      <List css={containerCss}>
        {listData.map((item) => (
          <NavListItemSymbol
            css={listItemContainerCss}
            key={item.route}
            path={item.route}
            exact={false}
            selected={location.pathname === item.route}
            iconColor={theme.palette.text.secondary}
            selectedIconColor={theme.palette.primary.main}
            button
            disableGutters
            startIcon={
              <ListItemIconSymbol
                css={listItemIconCss}
                name={item.icon}
                variant="filled"
              />
            }
            listItemText={
              <ListItemText css={navItemTitleCss} disableTypography={false}>
                {item.title}
              </ListItemText>
            }
          />
        ))}
      </List>
    </Box>
  );
};
