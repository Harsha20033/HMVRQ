"use client";

import { useEffect } from "react";
import { syncUserToDatabase } from "@/actions/syncUser";

export function SyncUser() {
  useEffect(() => {
    syncUserToDatabase();
  }, []);

  return null;
}