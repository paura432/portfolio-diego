import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getContact } from '@/lib/content';

export default function ContactPage() {
  const contact = getContact();

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <section className="max-w-2xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-normal mb-4 text-gray-900">
            Contacto
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-xl mx-auto leading-relaxed">
            ¿Quieres colaborar o tienes alguna propuesta? No dudes en contactarme.
          </p>

          <div className="space-y-8">
            {/* Email */}
            <a
              href={`mailto:${contact.email}`}
              className="block p-6 border-2 border-gray-200 hover:border-accent transition-colors group"
            >
              <span className="text-sm text-gray-500 block mb-2">Email</span>
              <span className="text-xl md:text-2xl text-accent font-semibold group-hover:text-accent-light transition-colors">
                {contact.email}
              </span>
            </a>

            {/* Social Links */}
            <div className="pt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Redes Sociales</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {Object.entries(contact.socials).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-colors font-medium"
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
