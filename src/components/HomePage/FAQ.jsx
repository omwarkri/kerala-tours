import React, { useState } from "react";

const FAQ = ({ id = "faq" }) => {
  const faqs = [
    {
      question: "How much does a Kerala holiday cost?",
      answer:
        "A week in Kerala usually costs between ₹15,000 and ₹25,000 per person, depending on where you stay and the activities chosen. For the most accurate pricing, ask for a personalized quote.",
    },
    {
      question: "Which month is best for Kerala?",
      answer:
        "The best time to explore Kerala is from September to March when the weather is cool and pleasant. During these months, you can enjoy beautiful greenery, vibrant festivals, and comfortable sightseeing.",
    },
    {
      question: "Which travel agent is best in Kerala?",
      answer:
        "Several reliable travel agencies operate in Kerala. To pick the best, check customer reviews, package variety, and pricing. Also, consider their reputation for service quality and trustworthiness.",
    },
    {
      question: "Which is the best tour company for Kerala?",
      answer:
        "The best Kerala tour company can vary, but focus on those with strong reputations and expertise in Kerala tours. Look for excellent customer service and packages that match your interests.",
    },
    {
      question: "Which tour package is the best?",
      answer:
        "The best Kerala tour package depends on your preferences and budget. Some travellers opt for adventure tours, while others prefer cultural or honeymoon packages.",
    },
    {
      question: "How do I choose a tour package?",
      answer:
        "To pick the right Kerala tour package, start by identifying your interests and budget. Consider the trip length and what's included, like accommodation and activities.",
    },
    {
      question: "What are the 3 main types of package tours?",
      answer:
        "Package tours have three main types: Group Tours with fixed itineraries, Private Tours with flexibility, and Custom Tours that are entirely tailored to your preferences.",
    },
    {
      question: "How is the tour cost calculated?",
      answer:
        "Tour costs are calculated based on trip length, accommodation type, included activities, meals, transport, and additional services like guide fees and entrance tickets.",
    },
    {
      question: "Is it cheaper to book a tour?",
      answer:
        "Booking a tour can often be cheaper due to group rates and pre-negotiated deals. It also saves time by including meals, transport, and activities.",
    },
    {
      question: "What are the must visit tourism places in Kerala?",
      answer:
        "Top must-visit places include Munnar's tea gardens, backwaters with houseboats, Periyar wildlife sanctuary, Kovalam beaches, Fort Kochi, and Wayanad's greenery.",
    },
  ];

  
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section 
      id={id} 
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-24 md:py-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 ">
        {/* Header - Compact */}
           <div className="text-center mb-6 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-white mb-1 md:mb-6 tracking-wider uppercase">
          Frequently Asked Questions
        </h2>
        <p className="text-sm md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
          Everything you need to know about planning your Kerala trip with Omkar
          Tour and Travels
        </p>
      </div>

        {/* FAQ Items - Compact */}
        <div className="space-y-2 md:space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg md:rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm"
            >
              <button
                className="w-full px-4 py-3 md:px-5 md:py-4 text-left hover:bg-gray-700/50 transition duration-200 flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span className="font-medium text-white text-sm md:text-base pr-4">
                  {faq.question}
                </span>
                <span className="text-emerald-400 text-lg flex-shrink-0 ml-2">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-4 py-3 md:px-5 md:py-4 bg-gray-800/30 border-t border-gray-700">
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA - Compact */}
        <div className="text-center mt-6 md:mt-8 pt-4 border-t border-gray-700">
          <p className="text-xs md:text-sm text-gray-300 mb-3">
            Still have questions?
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <a
              href="https://wa.me/919028803309"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 font-medium transition duration-200 flex items-center justify-center text-xs md:text-sm"
            >
              <span className="mr-2">💬</span>
              WhatsApp Us
            </a>
            <a
              href="tel:+919028803309"
              className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2  font-medium transition duration-200 flex items-center justify-center text-xs md:text-sm"
            >
              <span className="mr-2">📞</span>
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;