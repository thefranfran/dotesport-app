import { Env } from "@env";

enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

type URL = string;
type Body = Record<string, unknown>;

const BASE_URL: string = Env.API_URL;

const getHeaders = (): HeadersInit => {
  const getToken = () => {};

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getToken()}`,
  };
};

class ApiMethods {
  /**
   * Makes an API request to the specified URL using the given HTTP method and body.
   *
   * @param method - The HTTP method to use for the request (e.g., 'GET', 'POST').
   * @param url - The endpoint URL to which the request is made.
   * @param body - The request payload to be sent with the request. Defaults to an empty object.
   * @returns A promise that resolves with the response data in JSON format or rejects with an error.
   */
  static apiRequest<T>(method: Method, url: URL, body: Body = {}): Promise<T> {
    url = BASE_URL + url;
    const options = method === Method.GET ? {} : { body: JSON.stringify(body) };

    return new Promise((resolve, reject) => {
      fetch(url, {
        method,
        ...options,
        headers: getHeaders(),
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch(reject);
    });
  }

  /**
   * Sends a GET request to the specified URL.
   *
   * @param url - The URL to which the GET request is sent.
   * @returns A promise that resolves with the response of the GET request.
   */
  static get(url: URL) {
    return this.apiRequest(Method.GET, url);
  }

  /**
   * Sends a POST request to the specified URL with the provided data.
   *
   * @param url - The URL to which the POST request is sent.
   * @param data - The data to be sent in the body of the POST request.
   * @returns A promise that resolves with the response of the POST request.
   */
  static post(url: URL, data: Body) {
    return this.apiRequest(Method.POST, url, data);
  }

  /**
   * Sends a PUT request to the specified URL with the provided data.
   *
   * @param url - The URL to send the PUT request to.
   * @param data - The data to be sent in the PUT request.
   * @returns A promise that resolves with the response of the PUT request.
   */
  static put(url: URL, data: Body) {
    return this.apiRequest(Method.PUT, url, data);
  }

  /**
   * Sends a DELETE request to the specified URL.
   *
   * @param url - The URL to which the DELETE request is sent.
   * @returns A promise that resolves with the response of the DELETE request.
   */
  static delete(url: URL) {
    return this.apiRequest(Method.DELETE, url);
  }
}

export default ApiMethods;
