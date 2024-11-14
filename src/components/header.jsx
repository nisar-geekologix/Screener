import Image from 'next/image';

const Header = () => {
    return (
        <>
            <header>
                <nav className="bg-[#11111180]">
                    <div className="mx-auto px-4 sm:px-6 lg:px-[70px] lg:py-4">
                        <div className="h-16 flex justify-between items-center">
                            <div className="flex items-center">
                                <Image src="/images/logo.svg" width={155} height={35} alt="Logo" className="md:w-[200px] md:h-[45px]" />
                            </div>
                            <button type="button" className="rounded-md font-semibold border border-white px-6 py-2 text-white hover:bg-white hover:text-black ">
                                <span className="text-[14px] md:text-base"> Visit Website </span>
                            </button>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;


