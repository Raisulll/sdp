import { StorageClient } from "@supabase/storage-js";

const STORAGE_URL = "https://<project_ref>.supabase.co/storage/v1";
const SERVICE_KEY = "<service_role>"; //! service key, not anon key

const storageClient = new StorageClient(STORAGE_URL, {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
});
