export const uploadFile = async (
  file: File,
  path: string
): Promise<string> => {
  // In a real app, this would upload to a storage service
  // For demo, we'll create an object URL
  return URL.createObjectURL(file);
};

export const deleteFile = async (path: string): Promise<void> => {
  // In a real app, this would delete from storage
  URL.revokeObjectURL(path);
};