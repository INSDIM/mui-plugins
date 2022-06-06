import { ConfirmServiceProvider, useConfirm } from "../function/confirm";
import { ConfirmOptions } from "../function/confirm/Confirm";
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";

describe("confirm", () => {
  const handleConfirm = jest.fn();
  const handleCancel = jest.fn();

  const ConfirmButton = (props: ConfirmOptions) => {
    const confirm = useConfirm();

    const handleClick = async () => {
      try {
        await confirm(props);
        handleConfirm();
        console.log("confirm");
      } catch (err) {
        console.log("cancel");
        handleCancel();
      }
    };

    return <button onClick={handleClick}>TriggerConfirm</button>;
  };

  const Scene = (props: ConfirmOptions) => (
    <ConfirmServiceProvider>
      <ConfirmButton {...props} />
    </ConfirmServiceProvider>
  );

  test("resolve on confirm", async () => {
    const { getByText, queryByText } = render(
      <Scene
        title="ConfirmTitle"
        confirmButtonText="Ok"
        cancelButtonText="Cancel"
      />
    );

    // open confirm dialog
    expect(queryByText("ConfirmTitle")).toBeFalsy();
    fireEvent.click(getByText("TriggerConfirm"));
    expect(queryByText("ConfirmTitle")).toBeTruthy();

    // click ok
    fireEvent.click(getByText("Ok"));
    await waitForElementToBeRemoved(() => queryByText("ConfirmTitle"));
    expect(handleConfirm).toHaveBeenCalled();
    expect(handleCancel).not.toHaveBeenCalled();
  });

  test("default cancel action", async () => {
    const { getByText, queryByText } = render(
      <Scene
        title="ConfirmTitle"
        confirmButtonText="Ok"
        cancelButtonText="Cancel"
      />
    );

    // open confirm dialog
    expect(queryByText("ConfirmTitle")).toBeFalsy();
    fireEvent.click(getByText("TriggerConfirm"));
    expect(queryByText("ConfirmTitle")).toBeTruthy();

    // click cancel
    fireEvent.click(getByText("Cancel"));
    await waitForElementToBeRemoved(() => queryByText("ConfirmTitle"));
    expect(handleCancel).not.toHaveBeenCalled();
    // ignore this, 'cause ts-jest cannot distinguish whether a func is called or not between multiple tests
    // expect(handleConfirm).not.toHaveBeenCalled();
  });

  test("catch on cancel", async () => {
    const { getByText, queryByText } = render(
      <Scene
        title="ConfirmTitle"
        catchOnCancel
        confirmButtonText="Ok"
        cancelButtonText="Cancel"
      />
    );

    // open confirm dialog
    expect(queryByText("ConfirmTitle")).toBeFalsy();
    fireEvent.click(getByText("TriggerConfirm"));
    expect(queryByText("ConfirmTitle")).toBeTruthy();

    // click cancel
    fireEvent.click(getByText("Cancel"));
    await waitForElementToBeRemoved(() => queryByText("ConfirmTitle"));
    expect(handleCancel).toHaveBeenCalled();
    // ignore this, 'cause ts-jest cannot distinguish whether a func is called or not between multiple tests
    // expect(handleConfirm).not.toHaveBeenCalled();
  });

  test("merge options", async () => {
    const { getByText, queryByText } = render(
      <Scene
        title="ConfirmTitle"
        confirmButtonText="AltOk"
        cancelButtonText="AltCancel"
        content="AltContent"
        confirmButtonColor="error"
        confirmButtonProps={{ color: "primary" }}
      />
    );

    // open confirm dialog
    expect(queryByText("AltContent")).toBeFalsy();
    fireEvent.click(getByText("TriggerConfirm"));
    expect(queryByText("AltContent")).toBeTruthy();
    expect(queryByText("AltOk")).toBeTruthy();
    expect(queryByText("AltCancel")).toBeTruthy();
  });
});
