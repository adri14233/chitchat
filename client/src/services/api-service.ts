class ApiService {
  baseUrl: string = 'http://localhost:3001/';

  async fetch<T>(
    endpoint: string,
    options?: {
      body?: any;
      method?: string;
      withCredentials?: boolean;
    }
  ): Promise<{ result?: T; error?: string }> {
    const { body, method, withCredentials } = options || {
      body: undefined,
      method: 'GET',
      withCredentials: true,
    };

    const response = await fetch(this.baseUrl + endpoint, {
      method: method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: withCredentials ? 'include' : undefined,
      body: body && JSON.stringify(body),
    });

    if (!response.ok) {
      // TODO: Pass on error code
      return { error: 'error fetching' };
    }

    const json = await response.json();

    return { result: json as T };
  }
}

export default ApiService;
