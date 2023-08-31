import Entity from "../../@shared/entity/Entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";

export default class Product extends Entity {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  validate(): void {
    if (!this._id || this._id.length === 0) {
      this.notification.addError({
        message: "ID is required",
        context: "product",
      });
    }
    if (!this._name || this._name.length === 0) {
      this.notification.addError({
        message: "Name is required",
        context: "product",
      });
    }
    if (this._price < 0) {
      this.notification.addError({
        message: "Price cannot be less than 0",
        context: "product",
      });
    }
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors);
    }
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }
}
