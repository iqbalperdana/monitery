import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Simplify Your Finances with Monitery
          </h1>
          <p className="text-xl mb-8">
            The Smarter Way to Manage Invoices and Track Your Money
          </p>
          <a
            href="/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all"
          >
            Sign Up Now
          </a>
        </div>
      </section>

      {/* What is Monitery? */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">
            What is Monitery?
          </h2>
          <p className="text-lg text-center max-w-2xl mx-auto">
            Monitery is a powerful financial management tool built to help
            businesses and individuals stay on top of their finances. Whether
            you're managing invoices, tracking expenses, or planning for the
            future, Monitery makes it easy to stay organized and informed.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">
                Invoice Management Made Easy
              </h3>
              <p className="text-gray-700">
                Create, manage, and organize your invoices in one place. Say
                goodbye to messy spreadsheets and hello to a streamlined system
                that saves you time and effort.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">
                Share Invoices Effortlessly
              </h3>
              <p className="text-gray-700">
                Need to send an invoice? Share it instantly as a PDF or via a
                secure web link. Your clients will appreciate the
                professionalism and convenience.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">
                Future Developments – Coming Soon!
              </h3>
              <p className="text-gray-700">
                Track expenses, monitor income, and get monthly financial
                reports. Monitery is constantly evolving to meet your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Monitery? */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Monitery?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Reason 1 */}
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">
                User-Friendly Interface
              </h3>
              <p className="text-gray-700">
                Designed with simplicity in mind, Monitery is easy to use for
                everyone, from freelancers to small business owners.
              </p>
            </div>
            {/* Reason 2 */}
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Time-Saving Tools</h3>
              <p className="text-gray-700">
                Automate repetitive tasks and focus on what matters most –
                growing your business.
              </p>
            </div>
            {/* Reason 3 */}
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Secure and Reliable</h3>
              <p className="text-gray-700">
                Your data is safe with us. Monitery uses advanced security
                measures to protect your financial information.
              </p>
            </div>
            {/* Reason 4 */}
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Always Evolving</h3>
              <p className="text-gray-700">
                We’re committed to adding new features and improvements to help
                you stay ahead.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Today */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Get Started Today</h2>
          <p className="text-xl mb-8">
            Ready to take control of your finances? Sign up for Monitery today
            and experience the future of financial management.
          </p>
          <a
            href="/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all"
          >
            Sign Up Now
          </a>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                "Monitery has completely transformed how I manage my invoices.
                It’s simple, efficient, and saves me hours every week!"
              </p>
              <p className="font-bold">– [User Name], Small Business Owner</p>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                "I can’t wait for the expense tracking feature! Monitery is
                already a game-changer for my finances."
              </p>
              <p className="font-bold">– [User Name], Freelancer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Stay Updated</h2>
          <p className="text-xl mb-8">
            Be the first to know about new features and updates! Subscribe to
            our newsletter and never miss a thing.
          </p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-4">© 2023 Monitery. All rights reserved.</p>
          <div className="space-x-4">
            <a href="/privacy-policy" className="hover:text-blue-400">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="hover:text-blue-400">
              Terms of Service
            </a>
            <a href="/contact-us" className="hover:text-blue-400">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
