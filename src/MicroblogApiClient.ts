const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default class MicroblogApiClient {
  readonly base_url: string

  constructor() {
    this.base_url = BASE_API_URL + '/api';
  }

  async request(options: Options) {
    let query = new URLSearchParams(options.query || {}).toString();
    if (query !== '') {
      query = '?' + query;
    }

    let response: any;
    try {
      response = await fetch(this.base_url + options.url + query, {
        method: options.method,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : null,
      });
    } catch (error) {
      response = {
        ok: false,
        status: 500,
        json: async () => {
          return {
            code: 500,
            message: 'The server is unresponsive',
            description: error.toString(),
          };
        }
      };
    }

    return {
      ok: response.ok,
      status: response.status,
      body: response.status !== 204 ? await response.json() : null
    };
  }

  async get(url: string, query: string, options: Options) {
    return this.request({method: 'GET', url, query, ...options});
  }

  async post(url: string, body: string, options: Options) {
    return this.request({method: 'POST', url, body, ...options});
  }

  async put(url: string, body: string, options: Options) {
    return this.request({method: 'PUT', url, body, ...options});
  }

  async delete(url: string, options: Options) {
    return this.request({method: 'DELETE', url, ...options});
  }
}

interface Options {
  url: string,
  query: string,
  method: string,
  headers: any,
  body: any
}