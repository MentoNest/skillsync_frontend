import { Mentor, MentorFilters } from "./mentor-types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.message || `HTTP error! status: ${response.status}`,
      response.status,
      errorData.code
    );
  }
  return response.json();
}

export const mentorApi = {
  async getMentors(filters: MentorFilters = {}, page = 1, limit = 12): Promise<{
    mentors: Mentor[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.set(key, String(value));
        }
      }
    });

    params.set("page", page.toString());
    params.set("limit", limit.toString());

    const response = await fetch(`${API_BASE}/mentors?${params.toString()}`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    return handleResponse(response);
  },

  async getMentorById(id: string): Promise<Mentor> {
    const response = await fetch(`${API_BASE}/mentors/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 },
    });

    return handleResponse(response);
  },

  async bookmarkMentor(mentorId: string): Promise<{ success: boolean; isBookmarked: boolean }> {
    const response = await fetch(`${API_BASE}/mentors/${mentorId}/bookmark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    return handleResponse(response);
  },

  async removeBookmark(mentorId: string): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE}/mentors/${mentorId}/bookmark`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    return handleResponse(response);
  },

  async getBookmarkedMentors(): Promise<Mentor[]> {
    const response = await fetch(`${API_BASE}/mentors/bookmarked`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      next: { revalidate: 60 },
    });

    return handleResponse(response);
  },
};

export { ApiError };