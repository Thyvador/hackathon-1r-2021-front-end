import genericService from "./generic.service";

class EventService {
  async sendEvent(objectUri, data) {
    await genericService.postAbsolute(`${objectUri}/events`, data);
  }
}

export default new EventService();
