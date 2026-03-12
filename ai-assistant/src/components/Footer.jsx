import { Mail, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div>
            <h2 className="text-xl font-semibold tracking-tight">MarcGenie</h2>
            <p className="mt-3 text-sm text-gray-600">
              Crafting content with precision and modern engineering.
            </p>

            <div className="flex items-center gap-3 mt-4">
              <a
                href="#"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:support@marcgenie.ai"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
              Platform
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="/" className="text-sm text-gray-600 hover:text-black">
                  Home
                </a>
              </li>
              <li>
                <a href="/login" className="text-sm text-gray-600 hover:text-black">
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="text-sm text-gray-600 hover:text-black">
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
              Legal
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t pt-4 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} MarcGenie. Built with discipline and craft.
          </p>
        </div>
      </div>
    </footer>
  );
}
