//Front
export const withFetch = async <T>(
  callback: () => Promise<Response>
): Promise<T> => {
  try {
    const response = await callback();
    if (!response.ok) {
      throw new Error("서버 이상");
    }
    return response.json() as Promise<T>;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("알 수 없는 에러");
    }
  }
};
