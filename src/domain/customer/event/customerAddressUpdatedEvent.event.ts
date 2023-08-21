import IEvent from "../../@shared/event/event.interface";

export default class CustomerAddressUpdatedEvent implements IEvent {
  dateTimeOccurred: Date;
  eventData: any;

  constructor(data: any) {
    this.dateTimeOccurred = new Date();
    this.eventData = data;
  }
}
