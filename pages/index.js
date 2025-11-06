export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white via-blue-50 to-blue-100 text-center p-6">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
        SIKHULUMA AI
      </h1>
      <h2 className="text-xl text-gray-700 mb-10">
        Founded by <span className="font-semibold text-blue-600">Dominic Dlamini</span><br />
        <span className="text-sm text-gray-600">Sikhuluma Global Council</span>
      </h2>

<div className="flex flex-col sm:flex-row gap-4">
  <a  href="/learn" className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition">
  Learn siSwati

  </a>

  <button className="bg-yellow-500 text-white px-6 py-3 rounded-xl shadow hover:bg-yellow-600">
    Translate
  </button>

  <button className="bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700">
    Verify Certificate (PEJU)
  </button>
</div>


      <footer className="mt-12 text-sm text-gray-500">
        © {new Date().getFullYear()} Sikhuluma AI — Empowering African Languages
      </footer>
    </main>
  );
}
