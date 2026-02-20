"use server";

import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export async function deleteUserPaper(paperId: string) {
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error } = await supabase
    .from("papers")
    .delete()
    .eq("id", paperId)
    .eq("teacher_id", user.id);

  if (error) {
    throw new Error(`Failed to delete paper: ${error.message}`);
  }

  return true;
}
