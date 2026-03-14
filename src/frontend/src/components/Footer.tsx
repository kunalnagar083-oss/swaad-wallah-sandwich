import { ChefHat } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2.5 justify-center md:justify-start mb-3">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-700 text-lg text-white">
                Swaad Wallah Sandwich
              </span>
            </div>
            <p className="text-white/60 text-sm">
              Indrapuri Sector C, Bhopal · Open 11 AM – 11 PM
            </p>
            <p className="text-white/40 text-xs mt-1">Owner: Kunal Nagar</p>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {["Home", "Menu", "About", "Gallery", "Contact"].map((link) => (
              <button
                type="button"
                key={link}
                onClick={() =>
                  document
                    .querySelector(`#${link.toLowerCase()}`)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-sm text-white/60 hover:text-primary transition-colors"
                data-ocid={`footer.${link.toLowerCase()}.link`}
              >
                {link}
              </button>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/swaad_wallah_sandwich"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary transition-colors flex items-center justify-center"
              aria-label="Instagram"
              data-ocid="footer.social.link"
            >
              <SiInstagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary transition-colors flex items-center justify-center"
              aria-label="Facebook"
              data-ocid="footer.social.link"
            >
              <SiFacebook className="w-4 h-4" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary transition-colors flex items-center justify-center"
              aria-label="X (Twitter)"
              data-ocid="footer.social.link"
            >
              <SiX className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>© {year} Swaad Wallah Sandwich. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
