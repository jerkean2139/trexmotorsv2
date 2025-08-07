import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
            <p className="text-gray-600 mb-6">Last updated: January 2025</p>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Acceptance of Terms</h2>
                <p className="text-gray-600">
                  By accessing and using the T-Rex Motors website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Vehicle Information</h2>
                <p className="text-gray-600">
                  All vehicle information, including prices, specifications, and availability, is subject to change without notice. We make every effort to ensure accuracy, but errors may occur. All vehicles are sold "as-is" unless otherwise specified in writing.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Financing Applications</h2>
                <p className="text-gray-600 mb-3">
                  Financing applications submitted through our website are subject to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Credit approval and verification</li>
                  <li>Current lending policies and rates</li>
                  <li>Vehicle inspection and appraisal</li>
                  <li>Completion of all required documentation</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Use License</h2>
                <p className="text-gray-600">
                  Permission is granted to temporarily download one copy of the materials on T-Rex Motors' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Disclaimer</h2>
                <p className="text-gray-600">
                  The materials on T-Rex Motors' website are provided on an 'as is' basis. T-Rex Motors makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Limitations</h2>
                <p className="text-gray-600">
                  In no event shall T-Rex Motors or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on T-Rex Motors' website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Information</h2>
                <p className="text-gray-600">
                  For questions about these Terms of Service, please contact us at:
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