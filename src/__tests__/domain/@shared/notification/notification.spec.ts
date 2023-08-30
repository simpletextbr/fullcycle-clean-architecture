import Notification from "../../../../domain/@shared/notification/notification";

describe("Unit test for notification", () => {
  it("should create errors", () => {
    const notification = new Notification();
    const error = {
      message: "Error message",
      context: "customer",
    };
    expect(notification.hasErrors()).toBe(false);

    notification.addError(error);

    expect(notification.messages("customer")).toBe("customer: Error message");
    expect(notification.hasErrors()).toBe(true);

    const error2 = {
      message: "Error message2",
      context: "customer",
    };

    notification.addError(error2);

    expect(notification.messages("customer")).toBe(
      "customer: Error message,customer: Error message2"
    );
    expect(notification.hasErrors()).toBe(true);

    const error3 = {
      message: "Error message",
      context: "product",
    };

    notification.addError(error3);

    expect(notification.messages("product")).toBe("product: Error message");
    expect(notification.messages("customer")).toBe(
      "customer: Error message,customer: Error message2"
    );
    expect(notification.messages()).toBe(
      "customer: Error message,customer: Error message2,product: Error message"
    );
  });

  it("should check if has notification errors", () => {
    const notification = new Notification();
    expect(notification.hasErrors()).toBe(false);

    const error = {
      message: "Error message",
      context: "customer",
    };

    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);
  });

  it("should return notification messages", () => {
    const notification = new Notification();
    expect(notification.hasErrors()).toBe(false);

    const error = {
      message: "Error message",
      context: "customer",
    };

    notification.addError(error);

    expect(notification.errors).toEqual([error]);

    const error2 = {
      message: "Error message",
      context: "customer",
    };

    notification.addError(error2);

    expect(notification.errors).toEqual([error, error2]);
  });
});
