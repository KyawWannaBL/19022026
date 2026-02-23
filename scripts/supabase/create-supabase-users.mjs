import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// demoaccounts.txt format: email,password (one per line)
const lines = fs.readFileSync("demoaccounts.txt", "utf8")
  .split(/\r?\n/)
  .map(l => l.trim())
  .filter(Boolean);

const users = lines.map((line) => {
  const [email, password] = line.split(",").map(s => s.trim());
  if (!email || !password) throw new Error(`Bad line: ${line}`);
  return { email, password };
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
