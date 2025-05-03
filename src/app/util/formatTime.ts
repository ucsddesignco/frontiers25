// Function to convert ISO timestamp string to relative time string (e.g., "18h", "3d")
export function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date(); // Reference "today"
  const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);

  const diffMinutes = Math.round(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `${diffMinutes}m`;
  }
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}h`;
  }
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d`;
}
