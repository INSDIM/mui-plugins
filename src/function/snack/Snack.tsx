import Alert, { AlertProps } from "@mui/material/Alert";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import React from "react";

export interface SnackbarOptions {
  /**
   * The message to display.
   */
  message?: React.ReactNode;
  /**
   * The severity of the alert. This defines the color and icon used.
   * @default 'success'
   */
  severity?: AlertProps["severity"];
  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action?: SnackbarProps["action"];
  /**
   * - [Snackbar API](https://mui.com/material-ui/api/snackbar/)
   */
  snackbarProps?: SnackbarProps;
  /**
   * - [Alert API](https://mui.com/material-ui/api/alert/)
   * - inherits [Paper API](https://mui.com/material-ui/api/paper/)
   */
  alertProps?: AlertProps;

  onClose?: () => void;
}

export const Snack: React.FC<SnackbarOptions> = ({
  message,
  severity,
  alertProps,
  snackbarProps,
  action,
  onClose,
}) => {
  alertProps = { ...alertProps, severity, action };
  snackbarProps = { ...snackbarProps, message };

  return (
    <Snackbar {...snackbarProps} onClose={onClose}>
      <Alert {...alertProps}>{snackbarProps?.message}</Alert>
    </Snackbar>
  );
};
