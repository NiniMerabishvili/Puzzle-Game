interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export const ErrorMessage = ({
  message,
  onDismiss,
}: ErrorMessageProps) => {
  return (
    <div className="p-4 bg-white text-black border-4 border-white mb-8 text-center relative">
      <span className="font-bold uppercase">Error: {message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute top-2 right-2 text-black hover:text-gray-600 focus:outline-none font-bold text-xl"
          aria-label="Dismiss error"
        >
          ×
        </button>
      )}
    </div>
  );
};

