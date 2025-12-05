interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

/**
 * Reusable error message display component
 */
export const ErrorMessage = ({
  message,
  onDismiss,
}: ErrorMessageProps) => {
  return (
    <div className="p-4 bg-red-600 text-white rounded-lg mb-8 text-center relative">
      <span>Error: {message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute top-2 right-2 text-white hover:text-gray-200 focus:outline-none"
          aria-label="Dismiss error"
        >
          ×
        </button>
      )}
    </div>
  );
};

