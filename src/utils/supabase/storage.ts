"use client";

import { createClient } from "../supabase/client";

// Create a Supabase client for use in component
const supabase = createClient();

// Define allowed file types
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export interface UploadResult {
  url: string | null;
  error: Error | null;
}

export const uploadImage = async (
  file: File,
  restaurantId: string,
  bucket: string = "banners",
  onProgress?: (progress: number) => void
): Promise<UploadResult> => {
  try {
    if (!restaurantId) {
      throw new Error("Restaurant ID is required");
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      throw new Error(
        "Invalid file type. Only JPG, JPEG, PNG, and WebP images are allowed."
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File size too large. Maximum size is 5MB.");
    }

    // Create file path using restaurant ID
    const fileExt = file.type.split("/")[1];
    const fileName = `banner.${fileExt}`;
    const filePath = `${restaurantId}/${fileName}`;

    try {
      // List existing files in the restaurant's folder
      const { data: existingFiles, error: listError } = await supabase.storage
        .from(bucket)
        .list(restaurantId);

      if (listError) {
        throw listError;
      }

      // Delete existing banner if it exists
      if (existingFiles && existingFiles.length > 0) {
        const { error: deleteError } = await supabase.storage
          .from(bucket)
          .remove(existingFiles.map((file) => `${restaurantId}/${file.name}`));

        if (deleteError) {
          console.warn("Error deleting old banner:", deleteError);
        }
      }

      // Simulate upload progress
      let progress = 0;
      const progressInterval = onProgress
        ? setInterval(() => {
            progress = Math.min(progress + 10, 90);
            onProgress(progress);
          }, 100)
        : null;

      try {
        // Upload the new file
        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: true,
            contentType: file.type,
          });

        if (uploadError) throw uploadError;

        // Get the public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from(bucket).getPublicUrl(filePath);

        // Set progress to 100% when complete
        if (onProgress) onProgress(100);

        return { url: publicUrl, error: null };
      } finally {
        if (progressInterval) clearInterval(progressInterval);
      }
    } catch (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      url: null,
      error:
        error instanceof Error ? error : new Error("An unknown error occurred"),
    };
  }
};

export const deleteImage = async (
  restaurantId: string,
  bucket: string = "banners"
): Promise<{ success: boolean; error: Error | null }> => {
  try {
    if (!restaurantId) {
      throw new Error("Restaurant ID is required");
    }

    // List existing files in the restaurant's folder
    const { data: existingFiles, error: listError } = await supabase.storage
      .from(bucket)
      .list(restaurantId);

    if (listError) {
      throw listError;
    }

    if (!existingFiles || existingFiles.length === 0) {
      return { success: true, error: null }; // Nothing to delete
    }

    // Delete all files in the restaurant's folder
    const { error: deleteError } = await supabase.storage
      .from(bucket)
      .remove(existingFiles.map((file) => `${restaurantId}/${file.name}`));

    if (deleteError) {
      throw deleteError;
    }

    return { success: true, error: null };
  } catch (error) {
    console.error("Error deleting image:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error : new Error("An unknown error occurred"),
    };
  }
};

export const uploadMultipleImages = async (
  files: File[],
  restaurantId: string,
  bucket: string = "banners",
  onProgress?: (progress: number) => void
): Promise<string[]> => {
  const urls: string[] = [];
  let totalProgress = 0;

  for (const [index, file] of files.entries()) {
    const result = await uploadImage(
      file,
      restaurantId,
      bucket,
      (progress: number) => {
        // Calculate total progress based on individual file progress
        const fileProgress = progress / files.length;
        const previousFilesProgress = (index * 100) / files.length;
        totalProgress = previousFilesProgress + fileProgress;
        onProgress?.(totalProgress);
      }
    );

    if (result.url) {
      urls.push(result.url);
    }
  }

  return urls;
};
