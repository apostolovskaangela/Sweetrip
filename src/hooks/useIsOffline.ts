import { subscribeInternetStatus } from "@/src/services/internetStatus";
import { useEffect, useState } from "react";

export function useIsOffline() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    return subscribeInternetStatus(setIsOffline);
  }, []);

  return isOffline;
}

