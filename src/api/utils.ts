const BASE_URL = "https://opentdb.com/";

/**
 * Fetch the open trivia api to get the quiz data.
 *
 * @param url
 * @returns {Promise<T | undefined>}
 */
export async function getOpenTriviaData<T>(url: string) {
  const fullUrl = `${BASE_URL}${url}`;
  try {
    const response = await fetch(fullUrl);
    const res = await response.json();
    return res as T;
  } catch (err) {
    if (err instanceof Error) {
      throw Error(err.message);
    }
  }
}
