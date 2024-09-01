"use client";
import FileBrowser from "../_components/file-browser";
export const runtime = 'edge';
export default function FavoritesPage() {
  return (
    <div>
      <FileBrowser title="Trash" deletedOnly={true} />
    </div>
  );
}