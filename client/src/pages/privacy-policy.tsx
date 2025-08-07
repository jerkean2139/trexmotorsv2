import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            <p className="text-gray-600 mb-6">Last updated: January 2025</p>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Information We Collect</h2>
                <p className="text-gray-600 mb-3">
                  T-Rex Motors collects information you provide directly to us, such as when you:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Fill out our financing application</li>
                  <li>Request information about vehicles</li>
                  <li>Contact us by phone, email, or through our website</li>
                  <li>Subscribe to our newsletter or promotional materials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">How We Use Your Information</h2>
                <p className="text-gray-600 mb-3">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Process your financing applications and vehicle purchases</li>
                  <li>Communicate with you about our services and available inventory</li>
                  <li>Improve our website and customer service</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Information Sharing</h2>
                <p className="text-gray-600">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with trusted partners who assist us in operating our website and conducting our business, provided they agree to keep this information confidential.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Security</h2>
                <p className="text-gray-600">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Us</h2>
                <p className="text-gray-600">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-3 text-gray-600">
                  <p><strong>T-Rex Motors</strong></p>
                  <p>1300 South 9th St, Richmond, IN 47374</p>
                  <p>Phone: (765) 238-2887</p>
                  <p>Email: info@trexmotors.com</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}