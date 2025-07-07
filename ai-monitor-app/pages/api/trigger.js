export default async function handler(req, res) {
  const { site } = req.body;
  const response = await fetch(site.url + '/wp-json/ai-blogger/v1/trigger', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + site.token }
  });
  const data = await response.json();
  res.status(200).json(data);
}
