export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="https://storage.googleapis.com/msgsndr/QjiQRR74D1pxPF7I8fcC/media/68042afc29d629c59c352a2b.png" 
                alt="T-Rex Motors Logo" 
                className="w-[250px] h-[250px] object-contain"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Richmond's premier used car dealership, serving customers with quality vehicles and exceptional service since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-trex-green">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-trex-green">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-trex-green">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-trex-green">
                <i className="fab fa-google"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#inventory" className="text-gray-400 hover:text-trex-green">Browse Inventory</a></li>
              <li><a href="#financing" className="text-gray-400 hover:text-trex-green">Financing Options</a></li>
              <li><a href="#trade-in" className="text-gray-400 hover:text-trex-green">Trade-In Value</a></li>
              <li><a href="#warranties" className="text-gray-400 hover:text-trex-green">Extended Warranties</a></li>
              <li><a href="#service" className="text-gray-400 hover:text-trex-green">Service Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Vehicle Types</h4>
            <ul className="space-y-2">
              <li><a href="#sedans" className="text-gray-400 hover:text-trex-green">Sedans</a></li>
              <li><a href="#suvs" className="text-gray-400 hover:text-trex-green">SUVs & Crossovers</a></li>
              <li><a href="#trucks" className="text-gray-400 hover:text-trex-green">Pickup Trucks</a></li>
              <li><a href="#sports" className="text-gray-400 hover:text-trex-green">Sports Cars</a></li>
              <li><a href="#luxury" className="text-gray-400 hover:text-trex-green">Luxury Vehicles</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2">
              <div className="flex items-start text-gray-400">
                <i className="fas fa-map-marker-alt mr-2 text-trex-green mt-1"></i>
                <span>1234 Main Street<br />Richmond, VA 23230</span>
              </div>
              <div className="flex items-center text-gray-400">
                <i className="fas fa-phone mr-2 text-trex-green"></i>
                <span>(804) 555-TREX</span>
              </div>
              <div className="flex items-center text-gray-400">
                <i className="fas fa-envelope mr-2 text-trex-green"></i>
                <span>info@trexmotors.com</span>
              </div>
              <div className="flex items-start text-gray-400">
                <i className="fas fa-clock mr-2 text-trex-green mt-1"></i>
                <span>Mon-Sat: 9AM-7PM<br />Sunday: 12PM-5PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 T-Rex Motors. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
