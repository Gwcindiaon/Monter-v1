import { useEffect } from "react";

export function useAutoRunner(sites, refreshSites) {
  useEffect(() => {
    const interval = setInterval(() => {
      sites.forEach(site => {
        if (!site.auto_enabled) return;
        const now = Date.now();
        const last = new Date(site.last_triggered || 0).getTime();
        if ((now - last) >= site.interval_seconds * 1000) {
          fetch("/api/trigger", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ site }),
          }).then(refreshSites);
        }
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [sites, refreshSites]);
}
