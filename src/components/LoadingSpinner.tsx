export default function LoadingSpinner({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-full bg-linear-to-r from-[#2a2929] via-[rgba(81,79,79,0.87)] to-[rgba(43,42,42,0.99)]">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        <p className="mt-4 text-white/80 text-sm">{message}</p>
      </div>
    </div>
  );
}
