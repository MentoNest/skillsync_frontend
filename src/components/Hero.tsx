import { motion } from "motion/react"



const heroImg = "src/assets/hero-img.svg"
const star = "src/assets/Star.svg"
const lines = "src/assets/lines.svg"



export default function Hero() {
    return (
        <section className="font-sans  w-full min-h-screen md:min-h-[50vh] lg:min-h-screen bg-[linear-gradient(171.73deg,_#FFFFFF_78.22%,_rgba(9,80,123,0)_295.94%)] pt-[100px] flex flex-col md:flex-row justify-between gap-10 items-center md:items-end lg:items-center px-[4%]   relative  ">


            <div className=" flex items-start justify-center flex-col gap-5 md:gap-4 max-w-[535px]  p-1 overflow-hidden " >


                <  motion.div
                    variants={{
                        hidden: { opacity: 0, y: 75 },
                        visible: { opacity: 1, y: 0 }
                    }}

                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: 0.5,
                        delay: 0.5
                    }}
                >

                    <h1 className=" text-[#05283E] font-semibold text-[32px] lg:text-5xl lg:leading-[62px] relative  p-1 mb-3  " >
                        <span> Give your kids the</span>
                        <span>  academic direction</span>

                        <span className="flex flex-row items-start" >
                            <span>
                                they need.
                            </span>
                            <span className="  w-[32px] h-[32px] flex items-center justify-center" >
                                <img src={star} alt="image" className=" object-cover w-full h-full" />
                            </span>



                        </span>



                    </h1>
                    <p className="max-w-[484px] text-[#999c9e] text-base md:text-lg font-normal mb-3 " >Explore our trusted catalogs of verified, trusted
                        and welcoming mentors.</p>

                    <div className=" bg-[#ffffff] flex items-center justify-between w-full max-w-[450px] px-3 py-2 border-[1px] border-[#09507B] rounded-[40px]  " >
                        <input
                            placeholder="Enter a university name to begin"
                            type="search" name="search" id="search"
                            className=" w-full max-w-[268px] outline-none border-none rounded-[8px] py-[3px] px-1 text-[#879196] text-sm md:text-base font-normal bg-[#ffffff] " />
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onHoverStart={() => console.log('hover started!')}
                            className=" cursor-pointer bg-[#09507B] py-[10px] px-4 rounded-[43px] text-[#FFFFFF] text-sm font-normal   "  >Search</motion.button>
                    </div>
                </motion.div>


            </div>



            <div

                className=" h-full max-h-[725px]  w-full max-w-[450px] overflow-hidden z-10 " >
                <motion.img
                    variants={{
                        hidden: { opacity: 0, x: 100 },
                        visible: { opacity: 1, x: 0 }
                    }}

                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: 0.5,
                        delay: 0.25
                    }}
                    src={heroImg} alt="image" className=" object-cover w-full h-full" />
            </div>



            <div className="flex items-center justify-center absolute bottom-0 right-0  w-[350px] h-[300px]  lg:w-[800px]  lg:h-[350px]  " >

                <img src={lines} alt="ilnes" className=" w-full h-full object-cover " />

            </div>
        </section>
    )
}