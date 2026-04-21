import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

interface NotificationPayload {
  package: string;
  title: string;
  text: string;
  timestamp: number;
}

app.post("/notifications", (req: Request, res: Response) => {
  const {
    package: pkg,
    title,
    text,
    timestamp,
  }: NotificationPayload = req.body;

  // Basic validation
  if (!pkg || !timestamp) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }

  console.log(`[${new Date(timestamp).toISOString()}] ${pkg}`);
  console.log(`  ${title}: ${text}`);

  // Do whatever you want here — save to DB, forward to Telegram, etc.

  res.status(200).json({ received: true });
});

app.get("/ping", (_, res: Response) => {
  res.json({ message: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
