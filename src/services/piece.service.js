import genericService from "./generic.service";
class PieceService {
  async get(company, id) {
    try {
      return genericService.get(`/companies/${company}/pieces/${id}`);
    } catch (err) {
      throw new Error(`Cannot find piece with id: ${id}`);
    }
  }

  async getEvents(company, entityType, id) {
    try {
      return genericService.get(
        `/companies/${company}/${entityType}/${id}/events`
      );
    } catch (err) {
      throw new Error(`Cannot find piece with id: ${id}`);
    }
  }

  async post(company, id, body) {
    try {
      return genericService.post(`/companies/${company}/pieces/${id}`, body);
    } catch (err) {
      throw new Error(`Cannot find piece with id: ${id}`);
    }
  }

  async delete(company, id) {
    try {
      return genericService.delete(`/companies/${company}/pieces/${id}`);
    } catch (err) {
      throw new Error(`Cannot find piece with id: ${id}`);
    }
  }
}

export default new PieceService();
