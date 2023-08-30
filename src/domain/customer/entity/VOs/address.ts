import Entity from "../../../@shared/entity/Entity.abstract";
import NotificationError from "../../../@shared/notification/notification.error";

export default class Address extends Entity {
  private _street: string;
  private _number: number;
  private _zip: string;
  private _city: string;

  constructor(street: string, number: number, zip: string, city: string) {
    super();
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;

    this.validate();
  }

  validate() {
    if (!this._street || this._street.length === 0) {
      this.notification.addError({
        message: "Street is required",
        context: "address",
      });
    }
    if (!this._number || isNaN(this._number)) {
      this.notification.addError({
        message: "Number is required",
        context: "address",
      });
    }
    if (!this._zip || this._zip.length === 0) {
      this.notification.addError({
        message: "Zip Code is required",
        context: "address",
      });
    }
    if (!this._city || this._city.length === 0) {
      this.notification.addError({
        message: "City is required",
        context: "address",
      });
    }

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors);
    }
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get zip(): string {
    return this._zip;
  }

  get city(): string {
    return this._city;
  }

  toString() {
    return `${this._street}, ${this._number} - ${this._zip} - ${this._city}`;
  }
}
