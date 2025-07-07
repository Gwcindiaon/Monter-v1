export default async function handler(req, res) {
  res.status(200).json([
    {
      id: "1",
      name: "site1.com",
      url: "https://site1.com",
      token: "123456",
      auto_enabled: true,
      interval_seconds: 60,
      post_count: 5,
      last_triggered: new Date().toISOString(),
    },
  ]);
}
