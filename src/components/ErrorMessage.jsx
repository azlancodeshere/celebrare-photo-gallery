// Shown when the API request fails.
export default function ErrorMessage({ message }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-6 text-center">
      <p className="font-medium text-red-700">Failed to load photos</p>
      <p className="mt-1 text-sm text-red-600">{message}</p>
    </div>
  )
}
