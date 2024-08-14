import { ApiResponse } from "@/app/types";

export async function apiRequest<T>(url: string): Promise<ApiResponse<T>> {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Request failed: ${res.status}`);
        }
        const data: ApiResponse<T> = await res.json();

        if (!data || typeof data !== 'object' || !('data' in data)) {
            throw new Error("Malformed API response");
        }

        return data;
    } catch (error) {
        throw new Error(`Failed to fetch data: ${(error as Error).message}`);
    }
}

export function handleApiError<T>(data: ApiResponse<T>, isLoadMore: boolean): string | null {

    if (data.error) {
        if (data.error === "Movie not found!" && isLoadMore) {
            return null;
        }
        return data.error;
    }

    if (!data.data) {
        return "Unexpected error: no data";
    }

    return null;
}
