import { useState } from 'react';

export default function SiteRow({ site, refresh }) {
  const [interval, setInterval] = useState(site.interval_seconds);
  const [enabled, setEnabled] = useState(site.auto_enabled);

  const update = (field, value) => {
    fetch('/api/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: site.id, field, value })
    }).then(refresh);
  };

  const trigger = () => {
    fetch('/api/trigger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ site })
    }).then(refresh);
  };

  return (
    <div className="border rounded p-4 mb-4 shadow">
      <div className="flex justify-between items-center">
        <strong>{site.name}</strong>
        <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={trigger}>▶ Trigger Now</button>
      </div>
      <div className="mt-2 flex items-center gap-4">
        <label>Auto:
          <input type="checkbox" checked={enabled} onChange={(e) => {
            setEnabled(e.target.checked);
            update('auto_enabled', e.target.checked);
          }} className="ml-2" />
        </label>
        <label>Every:
          <input type="number" value={interval} onChange={(e) => {
            setInterval(e.target.value);
            update('interval_seconds', parseInt(e.target.value));
          }} className="ml-2 w-20 border rounded px-2" />
          sec
        </label>
        <span>Posts: {site.post_count}</span>
      </div>
    </div>
  );
}
