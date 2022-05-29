import { Box, Chip, useTheme } from "@material-ui/core";
import { Autocomplete, css } from "@mui/material";
import { DateTime } from "luxon";
import { observer } from "mobx-react";
import React from "react";
import { FormError } from "../../../shared/components/form";
import { Icon24LogoVk } from "@vkontakte/icons";
import CIcon from "@coreui/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faOdnoklassniki,
} from "@fortawesome/free-brands-svg-icons";
import {
  Button,
  FormCheckbox,
  FormKeyboardDatePicker,
  FormTextField,
  Icon,
  TextField,
  Tooltip,
  Typography,
} from "../../../shared/components/ui";
import { SocialIcon } from "react-social-icons";
import { Form } from "../../../shared/components/ui/Form";
import { SOCIAL_NETWORKS } from "../../../shared/constants/social";
import { required } from "../../../shared/utils/form";
import { generateAccessCode } from "shared/utils/form/generateCode";
import { useDatabaseContext } from "providers/useDatabaseContext";
import { useSnackbar } from "notistack";
import {
  createSnackMessage,
  SNACK_TYPES,
} from "shared/components/ui/SnackMessage";
import { random } from "lodash";
import { CASE_STATUSES } from "shared/constants/status";

const socialIconCss = (color: string) => css`
  color: ${color};
  margin-top: 3px;
`;

const membersInputCss = (theme: any) => css`
  fieldset {
    border-color: ${theme.palette.primary.dark};
  }
`;

const commonButtonsCss = css`
  padding-left: 35px;
  padding-right: 35px;
`;

const submitButtonCss = (theme: any) => css`
  ${commonButtonsCss};
  background-color: ${theme.palette.primary.light};
`;

const cancelButtonCss = (theme: any) => css`
  ${commonButtonsCss};
  color: ${theme.palette.primary.dark};
  margin-right: 20px;
`;

const chipCSS = (theme: any) => css`
  background-color: rgba(9, 167, 250, 0.2);
  border-radius: 4px;
  color: ${theme.palette.primary.light};
`;

const calendarIconCss = (theme: any) => css`
  font-size: ${theme.typography.fontSize}px;
  color: ${theme.palette.info.light};
`;

const helperMarkCss = (theme: any) => css`
  color: ${theme.palette.primary.light};
`;

type FormData = {
  id?: string;
  title?: string;
  description?: string;
  startDate?: DateTime | undefined;
  endDate?: DateTime | undefined;
  social?: {
    facebook?: boolean;
    instagram?: boolean;
    vkontakte?: boolean;
    odnoklassniki?: boolean;
    twitter?: boolean;
    youtube?: boolean;
    telegram?: boolean;
  };
};

const MINUTES_STEP = 30;

const AddCase = () => {
  const theme: any = useTheme();
  const { setDatabase, database } = useDatabaseContext();
  const { enqueueSnackbar } = useSnackbar();

  const datePickerStyle: React.CSSProperties = {
    color: theme.palette.primary.main,
    fontWeight: 500,
    fontSize: theme.typography.fontSize,
  };

  const commonDatePickerProps = {
    style: datePickerStyle,
    readOnly: true,
    disableUnderline: true,
    disabled: false,
  };

  const { minExpirationDate, minStartDate } = React.useMemo(
    () => ({
      minStartDate: DateTime.now().set({ minute: 0 }).plus({ hours: 1 }),
      minExpirationDate: DateTime.now()
        .set({ minute: 0 })
        .plus({ hours: 1, minutes: MINUTES_STEP }),
    }),
    []
  );

  const [chipsArray, setChipsArray] = React.useState<string[]>([]);
  const [error, setError] = React.useState(false);
  const [inputText, setInputText] = React.useState<string>();

  const onTagAdd = React.useCallback(
    (event: React.SyntheticEvent, value: string[]) => {
      if (error) {
        setError(false);
      }
      setChipsArray(value);
      setInputText("");
    },
    [error]
  );

  const onFocusInput = React.useCallback(() => {
    if (error) {
      setError(false);
    }
  }, [error]);

  const onChangeInputText = React.useCallback(
    (event) => {
      if (error) {
        setError(false);
      }
      setInputText(event.target.value);
    },
    [error]
  );

  const handleKeyDown = React.useCallback(
    (event) => {
      switch (event.key) {
        case ",":
        case " ": {
          event.preventDefault();
          event.stopPropagation();
          if (event.target.value.length > 0) {
            setChipsArray([...chipsArray, event.target.value]);
            setInputText("");
          } else {
            setError(true);
          }
          break;
        }
        default:
      }
    },
    [chipsArray]
  );

  const onSaveCase = React.useCallback(
    (values) => () => {
      const newCase = {
        id: generateAccessCode(),
        title: values?.title,
        status: CASE_STATUSES.crawling,
        progress: (random(10) * 10) / 100,
        dateFilter: {
          startDate: DateTime.now(),
          endDate: DateTime.now(),
        },
        filters:
          Object.keys(values?.social ?? {}).map((label) => `${label}`) ?? [],
        tags: chipsArray,
        tweets: [
          {
            id: generateAccessCode(),
            text: "good text",
            author: "me",
            date: DateTime.now(),
          },
        ],
        tweetsCount: 33,
        generalStats: {
          likes: 44,
          comments: 10,
          posts: 15,
          reposts: 99,
          general_coverage: 1048,
        },
      };
      setDatabase([...database, newCase]);
      enqueueSnackbar(
        "Success. Case has been created. Check it out and start the crawling on list of cases page.",
        {
          autoHideDuration: 3000,
          content: createSnackMessage(SNACK_TYPES.error),
        }
      );
    },
    [chipsArray, database, enqueueSnackbar, setDatabase]
  );

  const onSubmit = React.useCallback(
    (formData: FormData) => {
      const newCase = {
        id: generateAccessCode(),
        title: formData?.title,
        status: CASE_STATUSES.crawling,
        progress: (random(10) * 10) / 100,
        dateFilter: {
          startDate: DateTime.now(),
          endDate: DateTime.now(),
        },
        filters:
          Object.keys(formData?.social ?? {}).map((label) => `${label}`) ?? [],
        tags: chipsArray,
        tweets: [
          {
            id: generateAccessCode(),
            text: "good text",
            author: "me",
            date: DateTime.now(),
          },
        ],
        tweetsCount: 33,
        generalStats: {
          likes: 44,
          comments: 10,
          posts: 15,
          reposts: 99,
          general_coverage: 1048,
        },
      };
      setDatabase([...database, newCase]);
      enqueueSnackbar(
        "Success. Case has been created and crawling started. Check it out on list of cases page.",
        {
          autoHideDuration: 3000,
          content: createSnackMessage(SNACK_TYPES.error),
        }
      );
    },
    [chipsArray, database, enqueueSnackbar, setDatabase]
  );

  return (
    <Form
      onSubmit={onSubmit}
      // validateOnBlur={false}
      // initialValues={initialValues}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Box
          display="grid"
          gridTemplateRows="auto"
          gridGap={10}
          alignItems="center"
          my={5}
          mx={5}
          minWidth={500}
        >
          <FormTextField
            inputProps={{
              color: "primary",
              label: "Название Кейса",
              variant: "outlined",
            }}
            fieldProps={{ name: "title", validate: required }}
          />
          <FormTextField
            inputProps={{
              color: "primary",
              label: "Описание Кейса",
              multiline: true,
              rows: "7",
              rowsMax: "7",
              variant: "outlined",
            }}
            fieldProps={{ name: "description", validate: required }}
          />
          <Box
            display="grid"
            gridTemplateColumns="auto min-content"
            alignItems="center"
          >
            <Autocomplete
              multiple
              options={[]}
              defaultValue={[]}
              value={chipsArray}
              freeSolo
              onChange={onTagAdd}
              onFocus={onFocusInput}
              renderTags={(
                value: string[],
                getTagProps: (email: {
                  index: number;
                }) => JSX.IntrinsicAttributes
              ) =>
                value.map((option: string, index: number) => {
                  return (
                    <Chip
                      key={option}
                      css={chipCSS}
                      label={option}
                      {...getTagProps({ index })}
                    />
                  );
                })
              }
              renderInput={(params: any) => {
                params.inputProps.onKeyDown = handleKeyDown;
                return (
                  <React.Fragment>
                    <TextField
                      {...params}
                      css={membersInputCss}
                      label="ТЭГИ"
                      placeholder="Напишите тег"
                      variant="outlined"
                      onChange={onChangeInputText}
                      value={inputText}
                    />
                    {error && <FormError text={`Invalid text`} />}
                  </React.Fragment>
                );
              }}
            />
            <Tooltip
              title={
                <Typography variant="body2">
                  Ключевое слово или ключевая фраза не больше двух слов
                </Typography>
              }
              placement="top"
            >
              <Icon name="HelpOutline" css={helperMarkCss} />
            </Tooltip>
          </Box>
          <Box display="flex" justifyContent="start" alignItems="center">
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="end"
              mt={2}
            >
              <Typography> Выбрите дату начала:</Typography>
              <FormKeyboardDatePicker
                datePickerProps={{
                  format: "dd MMM yyyy",
                  keyboardIcon: (
                    <Icon name="EventNote" size="small" css={calendarIconCss} />
                  ),
                  maxDate: values.endDate ?? undefined,
                  maxDateMessage: "Start date cant be later than the end date.",
                  disableFuture: true,
                  InputProps: { style: datePickerStyle },
                  allowKeyboardControl: true,
                  inputVariant: "outlined",
                  variant: "inline",
                  size: "small",
                }}
                fieldProps={{ name: "startDate" }}
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="end"
              mt={2}
              ml={3}
            >
              <Typography variant="body1">Выбрите дату окончания:</Typography>
              <FormKeyboardDatePicker
                datePickerProps={{
                  format: "dd MMM yyyy",
                  keyboardIcon: (
                    <Icon name="EventNote" size="small" css={calendarIconCss} />
                  ),
                  minDate: values.startDate ?? undefined,
                  maxDateMessage:
                    "End date cant be earlier than the start date.",
                  disableFuture: true,
                  InputProps: { style: datePickerStyle },
                  allowKeyboardControl: true,
                  inputVariant: "outlined",
                  variant: "inline",
                  size: "small",
                }}
                fieldProps={{ name: "endDate" }}
              />
            </Box>
          </Box>
          <Box display="grid" gridTemplateRows="auto" alignItems="center">
            {SOCIAL_NETWORKS.map((network) => (
              <Box
                display="grid"
                gridTemplateColumns="2fr 5fr"
                alignItems="center"
              >
                <Box display="flex" justifyContent="start" mt={1.5}>
                  <>
                    {network === SOCIAL_NETWORKS[3] ? (
                      <Icon24LogoVk css={socialIconCss(network.color)} />
                    ) : network === SOCIAL_NETWORKS[5] ? (
                      <FontAwesomeIcon
                        icon={faOdnoklassniki}
                        color="#ed812b"
                        style={{ fontSize: 20, marginTop: 3, marginRight: 2 }}
                      />
                    ) : (
                      <Icon
                        size="small"
                        name={network.icon}
                        css={socialIconCss(network.color)}
                      />
                    )}
                  </>
                  <Typography variant="body1">{network.label}</Typography>
                </Box>

                <FormCheckbox
                  fieldProps={{ name: `social.${network.shortName}` }}
                  checkboxProps={{
                    color: "primary",
                    disabled: isSubmitting,
                  }}
                />
              </Box>
            ))}
          </Box>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Box mr={1}>
              <Button
                css={cancelButtonCss}
                color={theme.palette.primary.light}
                disabled={isSubmitting}
                loading={isSubmitting}
                size="medium"
                variant="outlined"
                onClick={onSaveCase(values)}
              >
                Save
              </Button>
            </Box>
            <Button
              css={submitButtonCss}
              color="primary"
              disableElevation
              variant="contained"
              type="submit"
              loading={isSubmitting}
            >
              Save & Run
            </Button>
          </Box>
        </Box>
      )}
    </Form>
  );
};

export default observer(AddCase);
