import Image from "next/image";
import ButtonGradient from "./ButtonGradient";
import basicImage from "@/public/basic-guide.jpg";
import extImage from "@/public/extended-guide.jpg";

const TryForFree = () => {
    return (
      <section className="bg-base-100">
        <div className="max-w-5xl mx-auto px-8 py-8 md:py-12 ">
          <h2 className="text-center font-extrabold text-3xl md:text-5xl tracking-tight mb-12 md:mb-20">
            How does it look like?<br/>
          </h2>

          <div  className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 md:gap-10">
            <div className="relative flex flex-col h-full w-full md:p-10">
                <Image 
                    src={basicImage}
                    alt="Product Demo"
                    className="w-full"
                    priority={true}
                    width={500}
                    height={500}
                />            
            </div>
            <div className="relative flex flex-col h-full w-full md:p-10">
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
  
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-12">
            <ButtonGradient title="Try for free!"/>
          </div>
        </div>
      </section>
    );
  };
  
  export default TryForFree;
  