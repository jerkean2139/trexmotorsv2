import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { CheckCircle, ArrowLeft, Phone, Mail } from "lucide-react";

export default function ThankYou() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Thank You!
              </h1>
              <p className="text-xl text-gray-600">
                Your submission has been received successfully.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-green-800 mb-2">
                What happens next?
              </h2>
              <ul className="text-left text-green-700 space-y-2">
                <li>• Our team will review your information within 1 business day</li>
                <li>• We'll contact you to discuss financing options or answer questions</li>
                <li>• You can schedule a test drive at your convenience</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Phone className="w-6 h-6 text-trex-green mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Call Us</h3>
                <p className="text-gray-600">(804) 555-TREX</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Mail className="w-6 h-6 text-trex-green mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Email Us</h3>
                <p className="text-gray-600">sales@trexmotors.com</p>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={() => setLocation('/')}
                className="bg-trex-green hover:bg-green-600 text-white px-8 py-3 text-lg"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Return to Vehicle Inventory
              </Button>
              
              <div className="text-sm text-gray-500">
                <p>Need immediate assistance?</p>
                <p>Visit us at 1234 Main Street, Richmond, VA 23220</p>
                <p>Monday - Saturday: 9 AM - 7 PM | Sunday: 12 PM - 5 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}