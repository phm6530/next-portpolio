import { FieldError } from "react-hook-form";

export type AnswerError = {
  answer?: FieldError;
  optionId?: FieldError;
};

export const getErrorMessage = (error: AnswerError | undefined) => {
  if (error?.answer) {
    return error.answer.message;
  } else if (error?.optionId) {
    return error.optionId.message;
  }
  return null;
};
