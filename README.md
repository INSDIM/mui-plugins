# mui-plugins

Plugins Collections for MUI

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

Under construction
