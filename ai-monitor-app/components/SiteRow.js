import { useState } from "react";

export default function SiteRow({ site, refresh }) {
  const [enabled, setEnabled] = useState(site.auto_enabled);
  const [interval, setInterval] = useState(site.interval_seconds);

  const update = (field, value) => {
    fetch("/api/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: site.id, field, value }),
    }).then(refresh);
  };

  const trigger = () => {
    fetch("/api/trigger", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ site }),
    }).then(refresh);
  };

  return (
    <div className="border p-4 rounded mb-4 shadow">
      <div className="flex justify-between items-center">
        <strong>{site.name}</strong>
        <button onClick={trigger} className="px-3 py-1 bg-blue-600 text-white rounded">▶ Trigger Now</button>
      </div>
      <div className="mt-2 flex gap-4 items-center">
        <label>
          Auto: <input type="checkbox" checked={enabled} onChange={(e) => {
            setEnabled(e.target.checked);
            update("auto_enabled", e.target.checked);
          }} />
        </label>
        <label>
          Every <input type="number" value={interval} onChange={(e) => {
            const val = parseInt(e.target.value);
            setInterval(val);
            update("interval_seconds", val);
          }} className="w-16 px-1 border rounded" /> sec
        </label>
        <span>Posts: {site.post_count}</span>
      </div>
    </div>
  );
}
