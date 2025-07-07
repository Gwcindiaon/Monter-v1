import { useState, useEffect } from 'react';
import SiteRow from './SiteRow';
import { useAutoRunner } from '../utils/useAutoRunner';

export default function Dashboard() {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    fetch('/api/sites').then(res => res.json()).then(setSites);
  }, []);

  useAutoRunner(sites, setSites);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">AI Blog Monitor</h1>
      {sites.map(site => (
        <SiteRow key={site.id} site={site} refresh={() => {
          fetch('/api/sites').then(res => res.json()).then(setSites);
        }} />
      ))}
    </div>
  );
}
