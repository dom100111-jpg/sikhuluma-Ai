import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  const links = [
    { name: "Home", href: "/" },
    { name: "Voice", href: "/voice" },
    { name: "Verify", href: "/verify" },
    { name: "Community", href: "/community" },
    { name: "Dictionary", href: "/dictionary" },
    { name: "Speak", href: "/speak" }, // 🆕 Added for Phase 5
  ];

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo / Title */}
          <div
            onClick={() => router.push("/")}
            className="text-lg font-bold tracking-wide cursor-pointer"
          >
            Sikhuluma.AI
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            {links.map((link) => {
              const isActive = router.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${
                    isActive
                      ? "border-b-2 border-white font-semibold"
                      : "hover:text-gray-200"
                  } transition duration-200`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
