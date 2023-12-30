import { CustomError } from '@/lib/error';

class RequestError extends CustomError {
  constructor(response: Response) {
    super(`Request failed: ${response.status} ${response.statusText}`);
  }
}

interface Schema<T> {
  parse: (data: unknown) => T;
}

export async function zodFetch<T>(schema: Schema<T>, ...args: Parameters<typeof fetch>) {
  const response = await fetch(...args);
  if (!response.ok) throw new RequestError(response);
  const data = await response.json();
  return schema.parse(data);
}
