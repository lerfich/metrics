import { Box, Chip, useTheme } from "@material-ui/core";
import { Autocomplete, css } from "@mui/material";
import { DateTime } from "luxon";
import { observer } from "mobx-react";
import React from "react";
import { FormError } from "../../../shared/components/form";
import { Icon24LogoVk } from "@vkontakte/icons";
import CIcon from "@coreui/icons-react";
import {
  Button,
  FormCheckbox,
  FormKeyboardDatePicker,
  FormTextField,
  Icon,
  TextField,
  Typography,
} from "../../../shared/components/ui";
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

  const onSaveCase = React.useCallback(() => {}, []);

  React.useEffect(() => console.log(database.length, "db length"), [database]);
  const onSubmit = React.useCallback(
    (formData: FormData) => {
      const newCase = {
        id: generateAccessCode(),
        title: formData?.title,
        status: "pending",
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
      enqueueSnackbar("Выполнено. Новый кейс был добавлен к общему списку", {
        autoHideDuration: 3000,
        content: createSnackMessage(SNACK_TYPES.error),
      });
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
              getTagProps: (email: { index: number }) => JSX.IntrinsicAttributes
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
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
            <FormKeyboardDatePicker
              datePickerProps={{
                format: "dd MMM yyyy",
                keyboardIcon: (
                  <Icon name="EventNote" size="small" css={calendarIconCss} />
                ),
                minDate: values.startDate ?? undefined,
                maxDateMessage: "End date cant be earlier than the start date.",
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
          <Box display="grid" gridTemplateRows="auto" alignItems="center">
            {SOCIAL_NETWORKS.map((network) => (
              <Box
                display="grid"
                gridTemplateColumns="2fr 5fr"
                alignItems="center"
              >
                <Box
                  display="flex"
                  justifyContent="start"
                  // alignItems="center"
                  // mr={1}
                  mt={1.5}
                >
                  <>
                    {network !== (SOCIAL_NETWORKS[3] || SOCIAL_NETWORKS[5]) ? (
                      <Icon
                        size="small"
                        name={network.icon}
                        css={socialIconCss(network.color)}
                      />
                    ) : network === SOCIAL_NETWORKS[3] ? (
                      <Icon24LogoVk css={socialIconCss(network.color)} />
                    ) : (
                      <CIcon icon="cilPencil" />
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
                onClick={onSaveCase}
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