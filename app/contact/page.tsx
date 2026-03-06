import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getContact } from '@/lib/content';

export default function ContactPage() {
  const contact = getContact();

  return (
    <>
      <Header />
      <main className="pt-20 sm:pt-24 min-h-screen flex items-center justify-center">
        <section className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24 text-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal mb-4 text-gray-900">
            Contacto
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 max-w-xl mx-auto leading-relaxed px-2">
            ¿Quieres colaborar o tienes alguna propuesta? No dudes en contactarme.
          </p>

          <div className="space-y-6 sm:space-y-8">
            {/* Phone */}
            <a
              href={`tel:${contact.phone?.replace(/\s/g, '')}`}
              className="block p-4 sm:p-6 border-2 border-gray-200 hover:border-accent transition-colors group"
            >
              <span className="text-xs sm:text-sm text-gray-500 block mb-2">Teléfono</span>
              <span className="text-lg sm:text-xl md:text-2xl text-accent font-semibold group-hover:text-accent-light transition-colors break-all sm:break-normal">
                {contact.phone}
              </span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${contact.email}`}
              className="block p-4 sm:p-6 border-2 border-gray-200 hover:border-accent transition-colors group"
            >
              <span className="text-xs sm:text-sm text-gray-500 block mb-2">Email</span>
              <span className="text-lg sm:text-xl md:text-2xl text-accent font-semibold group-hover:text-accent-light transition-colors break-all sm:break-normal">
                {contact.email}
              </span>
            </a>

            {/* Social Links */}
            <div className="pt-6 sm:pt-8">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Redes Sociales</h2>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {Object.entries(contact.socials).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-colors font-medium text-sm sm:text-base"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
