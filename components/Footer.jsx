/* eslint-disable eol-last */
import Image from 'next/image';
import { useTheme } from 'next-themes';

import images from '../assets';
import Button from './Button';

const FooterLinks = ({ heading, items, extraClasses }) => (
  <div className={`flex-1 justify-start items-start ${extraClasses}`}>
    <h3 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl mb-10">{heading}</h3>
    {items.map((item, index) => <p key={item + index} className="font-poppins dark:text-white text-nft-black-1 font-normal text-base cursor-pointer dark:hover:text-nft-gray-1 hover:text-nft-black-1 my-3">{item}</p>)}
  </div>
);

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="flexCenter flex-col border-t dark:border-nft-black-1 border-nft-gray-1 sm:py-8 py-16">
      <div className="w-full minmd:w-4/5 flex flex-row md:flex-col sm:px-4 px-16">
        <div className="flexStart flex-1 flex-col">
          <div className="flexCenter cursor-pointer">
            <Image src={images.logo02} objectFit="contain" width={32} height={32} alt="logo" />
            <p className=" dark:text-white text-nft-dark font-semibold text-lg ml-1">Pokemon Market</p>
          </div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base mt-6">Get the latest updates</p>
          <div className="flexBetween md:w-full minlg:w-557 w-357 mt-6 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 rounded-md">
            <input type="email" placeholder="Your Email" className="h-full flex-1 w-full dark:bg-nft-black-2 bg-white px-4 rounded-md font-poppins dark:text-white text-nft-black-1 font-normal text-xs minlg:text-lg outline-none" />
            <div className="flex-initial">
              <Button
                btnName="UPDATES"
                btnType="primary"
                classStyles="rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 flexBetweenStart flex-wrap ml-10 md:ml-0 md:mt-8">
          <FooterLinks heading="Pokemon Market" items={['Explore', 'How it Works', 'Contact Us']} />
          <FooterLinks heading="Support" items={['Help Center', 'Terms of service', 'Legal', 'Privacy policy']} extraClasses="ml-4" />
        </div>
      </div>

      <div className="flexCenter w-full mt-5 border-t dark:border-nft-black-1 border-nft-gray-1 sm:px-4 px-16">
        <div className="flexBetween flex-row w-full minmd:w-4/5 sm:flex-col mt-7">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base">© 2023 Pokemon Market. All Rights Reserved.</p>
          <div className="flex flex-row sm:mt-4">
           <a href="https://github.com/querylab" target="_blank"  rel="noopener noreferrer"> <Image src={images.instagram} alt="social" width={40} height={40} alt="social" className={theme === 'light' ? 'filter invert' : undefined} /> </a>
           <a href="https://twitter.com/querylab_" target="_blank"  rel="noopener noreferrer"> <Image src={images.twitter} alt="social" width={40} height={40} alt="social" className={theme === 'light' ? 'filter invert' : undefined} /> </a>
           <a href="https://medium.com/@querylab" target="_blank"  rel="noopener noreferrer"> <Image src={images.discord} alt="social" width={40} height={40} alt="social" className={theme === 'light' ? 'filter invert' : undefined} /> </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;