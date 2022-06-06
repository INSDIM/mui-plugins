import { ConfirmDialog, ConfirmOptions } from "./Confirm";
import React, {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useState,
} from "react";

const confirmServiceContext = createContext<
  (options: ConfirmOptions) => Promise<any>
>(Promise.reject);

export const useConfirm = () => useContext(confirmServiceContext);

interface providerProps {
  children?: React.ReactNode;
  defaultOptions?: ConfirmOptions;
}

const defaultOptions = {
  catchOnCancel: false,
  title: "",
  content: "",
  confirmButtonColor: "primary",
  cancelButtonColor: "primary",
} as ConfirmOptions;

export function ConfirmServiceProvider(props: providerProps) {
  const [options, setOptions] = useState<ConfirmOptions>({
    ...defaultOptions,
    ...props.defaultOptions,
  });
  const [resolveReject, setResolveReject] = useState(
    [] as [] as ((a?: any) => void)[]
  );
  const [resolve, reject] = resolveReject;

  const confirm = useCallback((customOptions: ConfirmOptions) => {
    return new Promise((resolve, reject) => {
      setOptions({
        ...defaultOptions,
        ...customOptions,
      });
      setResolveReject([resolve, reject]);
    });
  }, []);

  const handleClose = useCallback(() => {
    setResolveReject([]);
  }, []);

  const handleCancel = useCallback(() => {
    if (reject) {
      if (options.catchOnCancel) reject();
      handleClose();
    }
  }, [reject, handleClose]);

  const handleConfirm = useCallback(() => {
    resolve();
    handleClose();
  }, [resolve, handleClose]);

  return (
    <Fragment>
      <confirmServiceContext.Provider value={confirm}>
        {props.children}
      </confirmServiceContext.Provider>
      <ConfirmDialog
        open={resolveReject.length === 2}
        {...options}
        onClose={handleClose}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      ></ConfirmDialog>
    </Fragment>
  );
}
