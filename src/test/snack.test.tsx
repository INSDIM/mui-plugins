import { SnackServiceProvider, useSnack } from "../function/snack";
import { SnackbarOptions } from "../function/snack/Snack";
import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";

describe("snack", () => {
  const handleCloseCallback = jest.fn();

  const SnackButton = (props: Omit<SnackbarOptions, "onClose">) => {
    const snack = useSnack();

    const handleClick = () => {
      snack(props).then(handleCloseCallback);
    };

    return <button onClick={handleClick}>TriggerSnack</button>;
  };

  const Scene = (props: {
    options?: Omit<SnackbarOptions, "onClose">;
    defaultOptions?: SnackbarOptions;
  }) => (
    <SnackServiceProvider defaultOptions={props.defaultOptions}>
      <SnackButton {...props.options} />
    </SnackServiceProvider>
  );

  test("default options", async () => {
    const { getByText, queryByText } = render(
      <Scene defaultOptions={{ message: "DefaultSnackMessage" }} />
    );

    // open snackbar
    expect(queryByText("DefaultSnackMessage")).toBeFalsy();
    fireEvent.click(getByText("TriggerSnack"));
    expect(queryByText("DefaultSnackMessage")).toBeTruthy();

    // close
    await waitForElementToBeRemoved(() => queryByText("DefaultSnackMessage"));
  });

  test("resolve on close", async () => {
    const { getByText, queryByText } = render(
      <Scene options={{ message: "SnackMessage" }} />
    );

    // open snackbar
    expect(queryByText("SnackMessage")).toBeFalsy();
    fireEvent.click(getByText("TriggerSnack"));
    expect(queryByText("SnackMessage")).toBeTruthy();

    // close
    await waitForElementToBeRemoved(() => queryByText("SnackMessage"));
    expect(handleCloseCallback).toHaveBeenCalled();
  });
});
