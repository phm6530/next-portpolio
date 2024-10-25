export default async function requestHandler<T>(
  cb: () => Promise<Response>
): Promise<T> {
  try {
    const response = await cb();
    if (!response.ok || response.status === 404) {
      const errorMsg = await response.json();
      throw new Error(errorMsg.message);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("알수 없는 오류");
    }
  }
}
