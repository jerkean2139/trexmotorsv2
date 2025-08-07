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
              Your trusted partner for quality used cars in Richmond, IN since 2008
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-trex-green">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-trex-green">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-trex-green">
                <i className="fab fa-yelp"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#inventory" className="text-gray-400 hover:text-trex-green">Inventory</a></li>
              <li><a href="#financing" className="text-gray-400 hover:text-trex-green">Financing</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-trex-green">About Us</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-trex-green">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#inspection" className="text-gray-400 hover:text-trex-green">Vehicle Inspection</a></li>
              <li><a href="#trade-in" className="text-gray-400 hover:text-trex-green">Trade-In Appraisal</a></li>
              <li><a href="#warranties" className="text-gray-400 hover:text-trex-green">Extended Warranties</a></li>
              <li><a href="#service" className="text-gray-400 hover:text-trex-green">Service Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2">
              <div className="flex items-start text-gray-400">
                <i className="fas fa-map-marker-alt mr-2 text-trex-green mt-1"></i>
                <span>1300 South 9th St<br />Richmond, IN 47374</span>
              </div>
              <div className="flex items-center text-gray-400">
                <i className="fas fa-phone mr-2 text-trex-green"></i>
                <span>(765) 238-2887</span>
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
          <p>&copy; 2025 T-Rex Motors. All rights reserved. | <a href="/privacy-policy" className="hover:text-trex-green">Privacy Policy</a> | <a href="/terms-of-service" className="hover:text-trex-green">Terms of Service</a></p>
          <p className="mt-2">Website designed and hosted by <a href="https://keanonbiz.com" target="_blank" rel="noopener noreferrer" className="hover:text-trex-green">keanonbiz.com</a></p>
        </div>
      </div>
    </footer>
  );
}
