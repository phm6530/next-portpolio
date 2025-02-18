import { useEffect } from "react";

interface UseAOSOptions {
  threshold?: number;
}

export default function useAOS({ threshold = 0.2 }: UseAOSOptions = {}) {
  useEffect(() => {
    const observeElements = () => {
      const aosLists = document.querySelectorAll(".aos-hidden");

      const aosEntries = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("aos-visible");
          }
        });
      };

      const observer = new IntersectionObserver(aosEntries, {
        threshold,
      });

      aosLists.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    };

    observeElements();

    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => mutationObserver.disconnect();
  }, [threshold]);
}
