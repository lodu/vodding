export interface FetchError extends Error {
  status: number;
  message: string;
  name: string;
}

const fetchInstance = async <T>({ url, options = {} }: { url: string, options?: RequestInit }): Promise<T> => {
  const response = await fetch(`/app${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const error: FetchError = new Error(response.statusText) as FetchError;
    error.status = response.status;
    if (response.status >= 500 && response.status < 600) {
      error.message = "Backend is not working";
    } else {
      error.message = response.statusText;
    }
    throw error;
  }

  return response.json() as Promise<T>;
};

export default fetchInstance;
