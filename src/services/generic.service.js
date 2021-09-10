import ky from "ky";

const API_URL = "https://api.onerecord.fr";

/**
 *
 * @param {string} path
 */
const resolveURL = (path) => {
  if (path.startsWith("/")) {
    return API_URL + path;
  } else {
    return `${API_URL}/${path}`;
  }
};

class GenericService {
  /**
   *
   * @param {string} path
   *
   * @returns {object}
   */
  async getAbsolute(path) {
    try {
      return await ky.get(path).json();
    } catch (err) {
      throw new Error(`Cannot get: ${path}`);
    }
  }

  /**
   *
   * @param {string} path
   *
   * @returns {object}
   */
  async get(path) {
    try {
      return await ky.get(resolveURL(path)).json();
    } catch (err) {
      throw new Error(`Cannot get: ${path}`);
    }
  }

  /**
   *
   * @param {string} path
   * @param {object} body
   *
   * @returns {object}
   */
  async post(path, body) {
    try {
      return await ky.post(resolveURL(path), { json: body });
    } catch (err) {
      throw new Error(`Cannot post: ${path}`);
    }
  }

  /**
   *
   * @param {string} path
   *
   * @returns {object}
   */
  async delete(path) {
    try {
      return await ky.delete(resolveURL(path));
    } catch (err) {
      throw new Error(`Cannot post: ${path}`);
    }
  }
}

export default new GenericService();
