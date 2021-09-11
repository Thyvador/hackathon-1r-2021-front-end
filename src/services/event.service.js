import genericService from "./generic.service";

class EventService {
  async sendEvent(event) {
    await genericService.postAbsolute(`${event.linkedObject.id}/events`, event);
  }
}

export default new EventService();
