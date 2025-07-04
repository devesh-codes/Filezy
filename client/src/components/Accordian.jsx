import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    question: "Is this service free?",
    answer: "Yes, it's completely free to upload and download as much as you would like."
  },
  {
    question: "How do you keep this service running for free?",
    answer: "I refuse to plaster this site with ads. I choose to accept Bitcoin donations: 1tempVmHht82iqsejLskASLSCehDTFZyh"
  },
  {
    question: "What is the file size limit?",
    answer: "The current file size limit is 2 GB. HTTP uploads become unstable when files reach too large of a size."
  },
  {
    question: "Is registration required?",
    answer: "No, anyone can upload or download without registration."
  },
  {
    question: "Are the files private/secure?",
    answer: "Yes, files are not listed publicly. AES-256 encryption is used at rest, and TLS secures transit. TempSend proudly holds an A+ HTTPS configuration."
  },
  {
    question: "Is JavaScript required for uploading or downloading?",
    answer: "No. You can upload via Incognito, Tor, or even terminal tools!"
  },
  {
    question: "Does this site work with Tor?",
    answer: "Yes. Onion address: http://4tdb2oju6nrrp77en6opmyfucvycs22y5ohuizfgjvbyjqjovltooyyd.onion"
  },
  {
    question: "What is Ygg/Yggdrasil and Alfis?",
    answer: "Yggdrasil is a mesh IPv6 network; Alfis is a blockchain DNS project. TempSend supports experiments with both."
  },
  {
    question: "Are copyrighted or illegal files allowed?",
    answer: "No. They will be removed immediately upon detection."
  },
  {
    question: "Who do I contact for DMCA/reports/issues?",
    answer: "Send inquiries to tempsendcontact@gmail.com."
  },
  {
    question: "What file types are accepted?",
    answer: "Any common file extension including zip, tar, mp4, exe, iso, pdf, docx, png, json, etc."
  }
];

const FaqAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">📚 Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-300 rounded-xl bg-white shadow-sm">
  <button
    onClick={() => toggle(index)}
    className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-gray-800 hover:bg-gray-100 transition-all"
  >
    <span className="text-base">{item.question}</span>
    {activeIndex === index ? (
      <ChevronUp className="w-5 h-5 text-gray-500" />
    ) : (
      <ChevronDown className="w-5 h-5 text-gray-500" />
    )}
  </button>

  <AnimatePresence>
    {activeIndex === index && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 text-sm text-gray-700 leading-relaxed">
          {item.answer}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>
        ))}
      </div>
    </div>
  );
};

export default FaqAccordion;
