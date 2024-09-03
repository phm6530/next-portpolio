"use client";

import { TemplateTypeProps } from "@/types/template";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export const localStorageHandler = ({
  templateId,
  templateType,
}: {
  templateId: number;
  templateType: TemplateTypeProps;
}) => {
  const storageKey = `${templateType}_${templateId}`;

  return {
    setter: () => {
      const participationData = {
        templateId,
        templateType,
        participatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"), // 참여 일
      };

      localStorage.setItem(storageKey, JSON.stringify(participationData));
    },
    getter: () => {
      if (typeof window !== "undefined") {
        const data = localStorage.getItem(storageKey);
        return data ? JSON.parse(data) : null;
      }
    },
    remove: () => {
      localStorage.removeItem(storageKey);
    },
  };
};
