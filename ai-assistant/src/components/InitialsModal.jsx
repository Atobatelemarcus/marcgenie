export default function InitialsModal({ user, isOpen, onClose }) {
  if (!isOpen) return null;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map(n => n[0].toUpperCase())
        .slice(0, 2)
        .join("")
    : "??";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4"
      onClick={onClose} // click on backdrop closes modal
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-full shadow-lg p-4 flex flex-col items-center gap-2 w-24 h-24 justify-center"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-lg font-bold">
          {initials}
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300 truncate text-center">
          {user?.name || "Guest"}
        </div>
        <button
          onClick={onClose}
          className="text-xs text-purple-600 hover:underline mt-1"
        >
          Close
        </button>
      </div>
    </div>
  );
}
