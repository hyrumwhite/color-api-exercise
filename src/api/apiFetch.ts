export const apiFetch = async <T>(
  request: RequestInfo | URL,
  options?: RequestInit & { data: object } = {},
) => {
  let dataString = '';
  if (data) {
    dataString = JSON.stringify(data);
    options.body = dataString;
  }
  options.headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  const response = await fetch(request, options);
  if (!response.ok) {
    throw response;
  }
  const json = await response.json();
  return json as T;
};
