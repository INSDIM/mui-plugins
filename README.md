# mui-plugins

Plugins for MUI (Promise-based Confirm Dialog, Snackbar, etc.)

## Installation

```sh
npm install --save @insdim-lab/mui-plugins
```

## Usage

### Confirm

_Inspired by https://github.com/jonatanklosko/material-ui-confirm_  
Wrap the App component in `ConfirmServiceProvider` (inside `ThemeProvider`)  
If a set of global basic options is needed, just use the `defaultOptions` prop.

```js
import { ConfirmServiceProvider } from "@insdim-lab/mui-plugins";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();
const defaultOptions = {
  title: "Sure?",
  content: "This operation cannot be undone.",
};

const App = () => (
  <ThemeProvider theme={theme}>
    <ConfirmServiceProvider defaultOptions={defaultOptions}>
      {...otherComponents}
    </ConfirmServiceProvider>
  </ThemeProvider>
);
```

Then, when you need a confirm dialog, call the `useConfirm` hook to create a `confirm` function.  
_Note: The options provided in the `confirm` function parameters will override the global options_

```js
import { useConfirm } from "@mui/material/styles";

const SomeComponent = () => {
  const confirm = useConfirm();

  const handleClick = () =>
    confirm({
      title: "Sure?",
      content: "This operation cannot be undone.",
      catchOnCancel: true,
    })
      .then(() => {
        console.log("confirmed");
      })
      .catch(() => {
        console.log("canceled");
      });

  return <button onClick={handleClick}>Delete</button>;
};
```

### Snackbar

Wrap the App component in `SnackServiceProvider` (inside `ThemeProvider`)  
If a set of global basic options is needed, just use the `defaultOptions` prop.

```js
import { SnackServiceProvider } from "@insdim-lab/mui-plugins";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();
const defaultOptions = {
  message: "Operation succeeded",
};

const App = () => (
  <ThemeProvider theme={theme}>
    <SnackServiceProvider defaultOptions={defaultOptions}>
      {...otherComponents}
    </SnackServiceProvider>
  </ThemeProvider>
);
```

Then, when you need a snackbar, call the `useSnack` hook to create a `snack` function.  
_Note: The options provided in the `snack` function parameters will override the global options_

```js
import { useSnack } from "@mui/material/styles";

const SomeComponent = () => {
  const snack = useSnack();

  const handleClick = () =>
    snack({
      message: "Operation checked",
    }).then(() => {
      console.log("closed");
    });

  return <button onClick={handleClick}>ShowSnack</button>;
};
```

### Spacer

_Inspired by https://vuetifyjs.com/en/api/v-spacer/_
Fill available space between two components inside a flexbox.

```js
import { Spacer } from "@insdim-lab/mui-plugins";

const SomeComponent = () => (
  <div style={{ display: "flex" }}>
    <div>component A</div>
    <Spacer />
    <div>component B</div>
  </div>
);
```

## API

### Confirm

#### `ConfirmOptions`

Type definition for confirm dialog options.  
| Name                       | Type                                | Default     | Description                                                                                               |
| -------------------------- | ----------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------- |
| **`title`**                | `string`                            | `""`        | Dialog title                                                                                              |
| **`content`**              | `React.ReactNode`                   | `""`        | Dialog content                                                                                            |
| **`dialogProps`**          | `DialogProps`                       | `{}`        | [MUI Dialog API](https://mui.com/material-ui/api/dialog/)                                                 |
| **`titleProps`**           | `DialogTitleProps`                  | `{}`        | [MUI DialogTitle API](https://mui.com/material-ui/api/dialog-title/)                                      |
| **`contentProps`**         | `DialogTitleProps`                  | `{}`        | [MUI DialogContent API](https://mui.com/material-ui/api/dialog-content/)                                  |
| **`actionProps`**          | `DialogActionsProps`                | `{}`        | [MUI DialogActions API](https://mui.com/material-ui/api/dialog-actions/)                                  |
| **`confirmButtonColor`**   | `ButtonTypeMap["props"]["color"]`   | `"primary"` | [MUI Button Color Shortcut](https://mui.com/material-ui/customization/palette/#adding-new-colors)         |
| **`confirmButtonText`**    | `React.ReactNode`                   | `""`        | Confirm Button Text                                                                                       |
| **`confirmButtonVariant`** | `ButtonTypeMap["props"]["variant"]` | `"text"`    | [Confirm MUI Button Variant Shortcut](https://mui.com/material-ui/api/button/)                            |
| **`confirmButtonProps`**   | `ButtonProps`                       | `{}`        | [Confirm MUI Button Props](https://mui.com/material-ui/api/button/)                                       |
| **`cancelButtonColor`**    | `ButtonTypeMap["props"]["color"]`   | `"primary"` | [Confirm MUI Button Color Shortcut](https://mui.com/material-ui/customization/palette/#adding-new-colors) |
| **`cancelButtonText`**     | `React.ReactNode`                   | `""`        | Cancel Button Text                                                                                        |
| **`cancelButtonVariant`**  | `ButtonTypeMap["props"]["variant"]` | `"text"`    | [Cancel MUI Button Variant Shortcut](https://mui.com/material-ui/api/button/)                             |
| **`cancelButtonProps`**    | `ButtonProps`                       | `{}`        | [Cancel MUI Button Props](https://mui.com/material-ui/api/button/)                                        |
| **`catchOnCancel`**        | `boolean`                           | `false`     | If true, the `confirm` function returns rejected Promise after being canceled                             |

#### `<ConfirmServiceProvider {defaultOptions: ConfirmOptions} />`
Provide a global service context for confirm dialog.

#### `useConfirm()`
Return the `confirm` function.

#### `confirm(options: ConfirmOptions) => Promise`
| Name    | Type                                  | Default | Description     |
| ------- | ------------------------------------- | ------- | --------------- |
| options | [ConfirmOptions](####confirm-options) | `{}`    | Confirm Options |

### Snack

#### `SnackOptions`
| Name                | Type                      | Default     | Description                                                               |
| ------------------- | ------------------------- | ----------- | ------------------------------------------------------------------------- |
| **`message`**       | `React.ReactNode`         | `""`        | Snackbar Message                                                          |
| **`severity`**      | `AlertProps["severity"]`  | `"success"` | [MUI Alert Severity Shortcut](https://mui.com/material-ui/api/alert/)     |
| **`action`**        | `SnackbarProps["action"]` | `undefined` | [MUI Snackbar Action Shortcut](https://mui.com/material-ui/api/snackbar/) |
| **`snackbarProps`** | `SnackbarProps`           | `{}`        | [MUI Snackbar Props](https://mui.com/material-ui/api/snackbar/)           |
| **`alertProps`**    | `AlertProps`              | `{}`        | [MUI Alert Props](https://mui.com/material-ui/api/alert/)                 |

#### `<SnackServiceProvider {defaultOptions: SnackOptions} />`
Provide a global service context for snackbar.

#### `useSnack()`
Return the `snack` function.

#### `snack(options: SnackOptions) => Promise`
| Name    | Type                              | Default | Description      |
| ------- | --------------------------------- | ------- | ---------------- |
| options | [SnackOptions](####snack-options) | `{}`    | Snackbar Options |
