export default function addPin(length: number) {
  //거듭제곱으로 길이 계산
  const startNum = Math.pow(10, length - 1);
  const endNum = Math.pow(10, length) - 1;

  return Math.floor(startNum + Math.random() * (endNum - startNum + 1));
}
