import Button, { ButtonProps, ButtonTypeMap } from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions, { DialogActionsProps } from "@mui/material/DialogActions";
import DialogContent, { DialogContentProps } from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle, { DialogTitleProps } from "@mui/material/DialogTitle";
import React from "react";

export interface ConfirmOptions {
  title?: React.ReactNode;
  content?: React.ReactNode;

  dialogProps?: DialogProps;
  titleProps?: DialogTitleProps;
  contentProps?: DialogContentProps;
  actionProps?: DialogActionsProps;

  confirmButtonColor?: ButtonTypeMap["props"]["color"];
  confirmButtonText?: React.ReactNode;
  confirmButtonVariant?: ButtonTypeMap["props"]["variant"];
  confirmButtonProps?: ButtonProps;

  cancelButtonColor?: ButtonTypeMap["props"]["color"];
  cancelButtonText?: React.ReactNode;
  cancelButtonVariant?: ButtonTypeMap["props"]["variant"];
  cancelButtonProps?: ButtonProps;

  catchOnCancel?: boolean;
}

interface ConfirmDialogProps extends ConfirmOptions {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  content,
  dialogProps,
  titleProps,
  contentProps,
  actionProps,

  confirmButtonColor,
  confirmButtonText,
  confirmButtonVariant,
  confirmButtonProps,

  cancelButtonColor,
  cancelButtonText,
  cancelButtonVariant,
  cancelButtonProps,

  open = false,
  onConfirm,
  onClose,
  onCancel,
}) => {
  // handle duplicate options
  confirmButtonProps = {
    ...confirmButtonProps,
    variant: confirmButtonVariant,
    color: confirmButtonColor,
  } as ButtonProps;

  cancelButtonProps = {
    ...cancelButtonProps,
    variant: cancelButtonVariant,
    color: cancelButtonColor,
  } as ButtonProps;

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      {...dialogProps}
      onClose={onClose}
    >
      <DialogTitle {...titleProps}>{title}</DialogTitle>
      <DialogContent {...contentProps}>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions {...actionProps}>
        <Button
          variant={confirmButtonVariant ? confirmButtonVariant : "contained"}
          color={confirmButtonColor}
          onClick={onConfirm}
          disableElevation
        >
          {confirmButtonText ? confirmButtonText : `Ok`}
        </Button>
        <Button
          variant={cancelButtonVariant ? cancelButtonVariant : "text"}
          color={cancelButtonColor}
          onClick={onCancel}
          disableElevation
        >
          {cancelButtonText ? cancelButtonText : `Cancel`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
