export default function Learn() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Learn siSwati</h1>
      <p className="text-lg text-gray-600 mb-8">
        Practice siSwati vocabulary and pronunciation.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 border rounded-xl shadow text-center hover:bg-blue-50 transition">
          <h2 className="text-2xl font-semibold mb-2">🇸🇿 Sawubona</h2>
          <p>Hello</p>
        </div>

        <div className="p-6 border rounded-xl shadow text-center hover:bg-blue-50 transition">
          <h2 className="text-2xl font-semibold mb-2">🇸🇿 Ngiyabonga</h2>
          <p>Thank you</p>
        </div>

        <div className="p-6 border rounded-xl shadow text-center hover:bg-blue-50 transition">
          <h2 className="text-2xl font-semibold mb-2">🇸🇿 Yebo</h2>
          <p>Yes</p>
        </div>

        <div className="p-6 border rounded-xl shadow text-center hover:bg-blue-50 transition">
          <h2 className="text-2xl font-semibold mb-2">🇸🇿 Cha</h2>
          <p>No</p>
        </div>
      </div>

      <footer className="mt-12 text-sm text-gray-500">
        © {new Date().getFullYear()} Sikhuluma AI — Learn African Languages
      </footer>
    </main>
  );
}
