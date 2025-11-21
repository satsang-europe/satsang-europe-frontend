import { useEffect, useState } from "react";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const images = [
    { src: "/borda_1.png", alt: "Borda", title: "SREE SREE BORDA" },
    { src: "/thakur_1.png", alt: "Thakur", title: "SREE SREE THAKUR" },
    { src: "/boroma_1.png", alt: "Boroma", title: "SREE SREE BOROMA" },
    {
      src: "/acharyaDeb_1.png",
      alt: "Acharyadeb",
      title: "SREE SREE ACHARYADEV",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentSlide === images.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
      }, 500); // Match the transition duration

      setTimeout(() => {
        setIsTransitioning(true);
      }, 550);
    }
  }, [currentSlide, images.length]);

  return (
    <section className="px-4 py-2 mt-2 ">
      {/** Desktop view */}
      <div className="hidden max-w-6xl px-4 md:grid md:grid-cols-4 mx-auto">
        {images.map((image, index) => (
          <div
            key={index}
            className="border-2 rounded-md overflow-hidden border-amber-300 w-full"
          >
            <img src={image.src} alt={image.alt} className="w-full h-auto" />
            <p className="w-full text-center py-1 font-bold bg-gray-600">
              {image.title}
            </p>
          </div>
        ))}
      </div>
      {/** Mobile view */}
      <div className="md:hidden relative w-full max-w-sm mx-auto overflow-hidden">
        <div
          className={`flex ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="min-w-full shrink-0">
              <div className="border-2 rounded-md overflow-hidden border-amber-300 mx-4">
                <img src={image.src} alt={image.alt} className="w-full" />
                <p className="w-full text-center py-1 font-bold bg-gray-600">
                  {image.title}
                </p>
              </div>
            </div>
          ))}
          <div className="min-w-full shrink-0">
            <div className="border-2 rounded-md overflow-hidden border-amber-300 mx-4">
              <img src={images[0].src} alt={images[0].alt} className="w-full" />
              <p className="w-full text-center py-1 font-bold bg-gray-600">
                {images[0].title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
