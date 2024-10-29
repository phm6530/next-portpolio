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
      throw new Error(`서버에 문제가 있습니다. \n failed : ${error.message}`); // 이게 오ㅓㅐ실행됨?
    } else {
      throw new Error("알수 없는 오류");
    }
  }
}
