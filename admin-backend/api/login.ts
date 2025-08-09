import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS with credentials - wildcard pattern for all Vercel workspace deployments
  const origin = req.headers.origin;
  const isAllowedOrigin =
    origin &&
    (origin.includes("workspace-") &&
      (origin.includes("jeremys-projects-0f68a4ab.vercel.app") ||
      origin.includes("workspace-nu-ecru.vercel.app")) ||
      origin.includes("replit.dev") ||
      origin.includes("localhost") ||
      origin.includes("127.0.0.1") ||
      origin.includes("trexmotorsrichmond.netlify.app"));

  if (isAllowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-vercel-protection-bypass");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { username, password } = req.body;

    // Simple authentication check
    if (username === "admin" && password === "trex2025!") {
      // Generate simple session token
      const token = Buffer.from(`admin:${Date.now()}`).toString("base64");

      // Set cookie for session management
      res.setHeader("Set-Cookie", [
        `admin-session=${token}; HttpOnly; Secure; SameSite=None; Max-Age=604800`, // 7 days
      ]);

      res.json({
        success: true,
        message: "Login successful",
        isAuthenticated: true,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
        isAuthenticated: false,
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      isAuthenticated: false,
    });
  }
}
