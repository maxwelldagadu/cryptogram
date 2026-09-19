'use server';

import { auth } from '@/lib/auth';
import { supabaseAdmin } from '@/supabase/supabase-admin';
import { headers } from 'next/headers';



// Updating the user profile

export async function UpdateUserProfileImage(formData: FormData) {
  const profileImage = formData.get('profileImage');

  if (!(profileImage instanceof File)) {
    return { success: false, error: 'No image' };
  }

  // Get current user
  const currentUser = await auth.api.getSession({ headers: await headers() });
  const userId = currentUser?.user.id;

  if (!userId) {
    return { success: false, error: 'No user found' };
  }

  // uploading image to avatar bucket
  const { data, error } = await supabaseAdmin.storage
    .from('avatar')
    .upload(`${userId}/avatar.png`, profileImage, { upsert: true });

  if (error || !data) {
    console.error('Supabase avatar upload failed:', error);
    return { success: false, error: error?.message ?? 'Cannot be uploaded' };
  }

  // Gets the image public URL
  const profilePhotoURL = supabaseAdmin.storage.from('avatar').getPublicUrl(data.path);

  // Update the user image in DB
  const updateResult = await auth.api.updateUser({
    headers: await headers(),
    body: { image: profilePhotoURL.data.publicUrl },
  });

  if (!updateResult.status) {
    return { success: false, error: 'Profile update failed' };
  }

  return { success: true };
}