// Reusable loading spinner shown while photos are being fetched.
export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
      <p className="text-sm text-gray-500">Loading photos…</p>
    </div>
  )
}
