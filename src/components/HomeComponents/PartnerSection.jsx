import React from 'react';
import Marquee from 'react-fast-marquee';
import { FaGithub, FaFacebook, FaTwitter, FaLinkedin, FaGoogle, FaInstagram, FaYoutube, FaSlack, FaPinterest, FaReddit, FaDropbox, FaApple, FaSpotify, FaVimeo } from 'react-icons/fa';

const partners = [
    { name: 'GitHub', icon: <FaGithub size={50} /> },
  { name: 'Facebook', icon: <FaFacebook size={50} /> },
  { name: 'Twitter', icon: <FaTwitter size={50} /> },
  { name: 'LinkedIn', icon: <FaLinkedin size={50} /> },
  { name: 'Google', icon: <FaGoogle size={50} /> },
  { name: 'Instagram', icon: <FaInstagram size={50} /> },
  { name: 'YouTube', icon: <FaYoutube size={50} /> },
  { name: 'Slack', icon: <FaSlack size={50} /> },
  { name: 'Pinterest', icon: <FaPinterest size={50} /> },
  { name: 'Reddit', icon: <FaReddit size={50} /> },
  { name: 'Dropbox', icon: <FaDropbox size={50} /> },
  { name: 'Apple', icon: <FaApple size={50} /> },
  { name: 'Spotify', icon: <FaSpotify size={50} /> },
  { name: 'Vimeo', icon: <FaVimeo size={50} /> },
  // Add more partners as needed
];

const PartnerSection = () => {
  return (
    <section className="bg-white py-20 pt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center pb-20">
          <div className="">
            <h2 className="text-4xl font-semibold text-teal-600 px-4">
            Our Trusted Partners
            </h2>
            <p className="my-4">We’re proud to partner with industry leaders who help us achieve excellence.</p>
            <div className="text-center  border-b-2 border-teal-600 w-28 mx-auto "></div>
          </div>
        </div>

        {/* Marquee for partner logos */}
        <div className="overflow-hidden">
          
        <Marquee gradient={false} speed={30} className="flex space-x-8 py-5">
            {partners.map((company, index) => (
              <div
                key={index}
                className="flex items-center justify-center ml-5"
              >
                <div className="p-5 rounded-full text-gray-500  shadow-md">
                  {company.icon}
                </div>
              </div>
            ))}
          </Marquee>
          
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
