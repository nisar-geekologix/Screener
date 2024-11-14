import Image from 'next/image';

const Footer = () => {
  return (
    <footer>
      <div className="py-4 bg-black mx-auto px-2 sm:px-6 lg:px-14 w-full">
        <div className="container flex justify-between max-md:justify-center max-md:flex-wrap  max-md:max-w-full">
          <div className="flex gap-3">
            <Image className="" src="/images/facebook.svg" width={36} height={36} alt="" />
            <Image className="" src="/images/x.svg" width={36} height={36} alt="" />
            <Image className="" src="/images/youtube.svg" width={36} height={36} alt="" />
            <Image className="" src="/images/linkedin.svg" width={36} height={36} alt="" />
            <Image className="" src="/images/Instagram.svg" width={36} height={36} alt="" />
            <Image className="" src="/images/telegram.svg" width={36} height={36} alt="" />
          </div>
          <div className="">
            <p className="text-xl font-semibold underline underline-offset-8 text-white " >www.niftytrader.in</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
