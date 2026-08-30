const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.skillsync.com";

export async function apiRequest(endpoint: string, options: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
