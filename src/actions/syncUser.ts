"use server";

import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export async function syncUserToDatabase() {
  const user = await currentUser();
  if (!user) return { error: "Unauthorized" };

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const primaryEmail = user.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId
  )?.emailAddress;

  const { error } = await supabase.from("users").upsert({
    id: user.id,
    email: primaryEmail || "",
    first_name: user.firstName || "",
    last_name: user.lastName || "",
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}