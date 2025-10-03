/**
 * Sends a POST request with a strongly-typed response.
 * @param url The endpoint URL.
 * @param data The data to send in the request body.
 * @returns A promise that resolves with the typed response data.
 */
export async function post<T>(url: string, data: object): Promise<T> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    // The 'as T' assertion tells TypeScript to trust us on the response type.
    return await response.json() as T;

  } catch (error) {
    console.error(`Failed to POST to ${url}:`, error);
    throw error;
  }
}

// --- Example Usage ---
// interface ApiResponse {
//   message: string;
//   sessionId: string;
// }
//
// const loginCredentials = { user: 'admin', pass: '1234' };
//
// // The function's return type is now automatically ApiResponse
// post<ApiResponse>('https://api.example.com/login', loginCredentials)
//   .then(sessionInfo => {
//     console.log('Login successful:', sessionInfo.sessionId);
//   });
