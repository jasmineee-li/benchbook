import { supabase } from "../supabase";
import type { Memory, NewMemory } from "../types";

export async function getPreviewMemories() {
  const { data, error } = await supabase
    .from("memories")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) throw error;
  return data as Memory[];
}

export async function getAllMemories() {
  const { data, error } = await supabase
    .from("memories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Memory[];
}

export async function createMemory(memory: NewMemory) {
  const { data, error } = await supabase
    .from("memories")
    .insert([memory])
    .select()
    .single();

  if (error) throw error;
  return data as Memory;
}

export async function uploadImage(file: string, type: "photo" | "drawing") {
  try {
    // Convert base64 to blob
    const base64Data = file.split(",")[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" });

    const fileName = `${type}-${Date.now()}.jpg`;

    // Upload the image
    const { data, error } = await supabase.storage
      .from("memory-images")
      .upload(fileName, blob, {
        cacheControl: "3600",
        upsert: false,
        contentType: "image/jpeg",
      });

    if (error) {
      console.error("Error uploading image:", error);
      throw error;
    }

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("memory-images").getPublicUrl(fileName);

    return publicUrl;
  } catch (err) {
    console.error("Error in uploadImage:", err);
    throw err;
  }
}
