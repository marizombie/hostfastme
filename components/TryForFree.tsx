import Image from "next/image";
import ButtonGradient from "./ButtonGradient";
import basicImage from "@/public/basic-guide.jpg";
import extImage from "@/public/extended-guide.jpg";

const TryForFree = () => {
    return (
      <section className="bg-base-100">
        <div className="max-w-5xl mx-auto px-8 py-12 md:py-16 ">
          <h2 className="text-center font-extrabold text-3xl md:text-5xl tracking-tight md:mb-5">
            How does it look like?<br/>
          </h2>

          <div  className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 md:gap-10 py-8">
            <div className="relative flex flex-col h-full w-full md:p-6">
                <Image 
                    src={basicImage}
                    alt="Product Demo"
                    className="w-full"
                    priority={true}
                    width={500}
                    height={500}
                />            
            </div>
            <div className="relative flex flex-col h-full w-full md:p-6">
                <Image 
                    src={extImage}
                    alt="Product Demo"
                    className="w-full"
                    priority={true}
                    width={500}
                    height={500}
                />
            </div>
          </div>
  
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 py-4 mb-4 ">
            <ButtonGradient title="Try for free!"/>
          </div>
        </div>
      </section>
    );
  };
  
  export default TryForFree;
  