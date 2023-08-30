import Entity from "../../@shared/entity/Entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "./VOs/address";

// UMA ENTIDATE DE NEGOCIO POR PADRÃO DEVE SE AUTO-VALIDAR GARANTINDO SUA CONSISTÊNCIA
export default class Customer extends Entity {
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();
  }

  validate() {
    if (!this.id || this.id.length === 0) {
      this.notification.addError({
        message: "ID is required",
        context: "customer",
      });
    }
    if (!this._name || this._name.length === 0) {
      this.notification.addError({
        message: "Name is required",
        context: "customer",
      });
    }
    if (this._rewardPoints < 0) {
      this.notification.addError({
        message: "Reward points must be greater than or equal to 0",
        context: "customer",
      });
    }

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors);
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  giveRewardPoints(points: number) {
    this._rewardPoints += points;
    this.validate();
  }

  activate(): void {
    if (!this._address || this._address === undefined)
      throw new Error("Address is mandatory to activate a customer");

    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get address(): Address {
    return this._address;
  }

  set Address(address: Address) {
    this._address = address;
    this.activate();
  }
}
