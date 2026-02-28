import React from "react";

const DeleteAlert = ({
  content,
  onDelete,
  onCancel,
  isDeleting = false,
}) => {
  return (
    <div className="space-y-6">

      <p className="text-sm text-gray-300 leading-relaxed">
        {content}
      </p>

      <div className="flex justify-end gap-3 pt-4">

        {/* Cancel Button */}
        <button
          type="button"
          onClick={onCancel}
          className="
            px-6 py-2.5
            rounded-xl
            bg-white/[0.05]
            border border-white/[0.1]
            text-gray-300
            backdrop-blur-md
            hover:bg-white/[0.08]
            transition-all duration-200
          "
        >
          Cancel
        </button>

        {/* Delete Button */}
        <button
          type="button"
          onClick={onDelete}
          disabled={isDeleting}
          className="
            px-6 py-2.5
            rounded-xl
            bg-rose-500/15
            border border-rose-400/25
            text-rose-400
            font-medium
            backdrop-blur-md
            hover:bg-rose-500/25
            transition-all duration-200
            active:scale-[0.97]
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>

      </div>
    </div>
  );
};

export default DeleteAlert;