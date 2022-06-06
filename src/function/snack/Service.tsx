import { Snack, SnackbarOptions } from "./Snack";
import { AlertProps, SnackbarProps } from "@mui/material";
import React, {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useState,
} from "react";

const snackServiceContext = createContext<
  (options: Omit<SnackbarOptions, "onClose">) => Promise<any>
>(Promise.reject);

export const useSnack = () => useContext(snackServiceContext);

interface providerProps {
  children?: React.ReactNode;
  defaultOptions?: SnackbarOptions;
}

const defaultOptions = {
  snackbarProps: {
    anchorOrigin: { vertical: "top", horizontal: "center" },
    autoHideDuration: 500,
  },
} as SnackbarOptions;

export function SnackServiceProvider(props: providerProps) {
  const [options, setOptions] = useState<Omit<SnackbarOptions, "onClose">>({
    ...defaultOptions,
    ...props.defaultOptions,
  });
  const [resolveReject, setResolveReject] = useState(
    [] as ((a?: any) => void)[]
  );
  const [resolve, reject] = resolveReject;

  const handleClose = useCallback(() => {
    resolve();
    setResolveReject([]);
  }, [resolve]);

  const snack = useCallback(
    (customOptions: Omit<SnackbarOptions, "onClose">) => {
      return new Promise((resolve, reject) => {
        setOptions({
          ...options,
          ...customOptions,
        });
        setResolveReject([resolve, reject]);
      });
    },
    []
  );

  return (
    <Fragment>
      <snackServiceContext.Provider value={snack}>
        {props.children}
      </snackServiceContext.Provider>
      <Snack
        {...options}
        snackbarProps={{
          ...options.snackbarProps,
          open: resolveReject.length === 2,
        }}
        onClose={handleClose}
      ></Snack>
    </Fragment>
  );
}
