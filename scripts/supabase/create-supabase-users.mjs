import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";

// If you use a .env file, uncomment the next line and install dotenv:
// import "dotenv/config";

const url = (process.env.SUPABASE_URL || "").trim().replace(/[<>]/g, "");
const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim().replace(/[<>]/g, "");

if (!url || !serviceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  global: {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
  },
  auth: { autoRefreshToken: false, persistSession: false },
});

// demoaccounts.txt format: email,password (one per line)
const lines = fs
  .readFileSync("demoaccounts.txt", "utf8")
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter(Boolean);

const users = lines.map((line) => {
  const m = line.match(/^([^,\s]+@[^,\s]+)\s*,\s*(.+)$/);
  if (!m) throw new Error(`Bad line: ${line}`);
  return { email: m[1].trim(), password: m[2].trim() };
});

for (const u of users) {
  const { data, error } = await supabase.auth.admin.createUser({
    email: u.email,
    password: u.password,
    email_confirm: true,
  });

  if (error) console.log(u.email, "ERROR:", error.message);
  else console.log("created:", data.user.email, data.user.id);
}
