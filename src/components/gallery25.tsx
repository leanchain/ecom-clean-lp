"use client";

import { motion } from "framer-motion";
import React from "react";
// Button handled via AnimatedBorderButton overlay
import AnimatedBorderButton from "@/components/animated-border-button";
import { Play } from "lucide-react";

const Gallery25 = () => {
  const column1Images = [
    {
      src: "https://framerusercontent.com/images/AP8MxsVwC0m6aUew627Uzl3PlY.jpeg",
      alt: "Gallery Image 1",
      height: "23rem",
    },
    {
      src: "https://framerusercontent.com/images/OKAPNp5NBx92XHoAfb2IJe5GaE.jpg",
      alt: "Gallery Image 2",
      height: "28rem",
    },
    {
      src: "https://framerusercontent.com/images/jTk7xlHHF1IGEJbjQzmPMpmxz84.jpeg",
      alt: "Gallery Image 3",
      height: "12rem",
    },
  ];

  const column2Images = [
    {
      src: "https://framerusercontent.com/images/Sl9EJQTfoycU8fTKPQzTCSt7wI.jpg",
      alt: "Gallery Image 4",
      height: "13rem",
    },
    {
      src: "https://framerusercontent.com/images/D9TgLVUKJBPyEFgeH5cU1lj9W3A.jpeg",
      alt: "Gallery Image 5",
      height: "32rem",
    },
    {
      src: "https://framerusercontent.com/images/A3YTpd3ihmlKdXxeXm0pBEueA.jpg",
      alt: "Gallery Image 6",
      height: "18rem",
    },
  ];

  const column3Images = [
    {
      src: "https://framerusercontent.com/images/grEtdsKRFf8M8oKPm7RzOw0uAfg.jpg",
      alt: "Gallery Image 7",
      height: "32rem",
    },
    {
      src: "https://framerusercontent.com/images/Tw5d4QXO8KrpmBh9B9bEy8oWm1g.jpg",
      alt: "Gallery Image 8",
      height: "32rem",
    },
  ];

  const column4Images = [
    {
      src: "https://framerusercontent.com/images/IIwrTUEKmVA8Bc0vqQYJIoYqps.jpg",
      alt: "Gallery Image 9",
      height: "13rem",
    },
    {
      src: "https://framerusercontent.com/images/IF4Acwwh9jwUUCkAQHXQyyXDiGM.jpeg",
      alt: "Gallery Image 10",
      height: "22.5rem",
    },
    {
      src: "https://framerusercontent.com/images/07lRVxK2iyJbSLDBNZxgTnhtlk.jpeg",
      alt: "Gallery Image 11",
      height: "22rem",
    },
  ];

  const column5Images = [
    {
      src: "https://framerusercontent.com/images/PkU3Gw8pAzmi2niiMrnBcHuu8I.png",
      alt: "Gallery Image 12",
      height: "28rem",
    },
    {
      src: "https://framerusercontent.com/images/tAX01Ow9zlh8EUCDGAfh3hpdQ0.png",
      alt: "Gallery Image 13",
      height: "18rem",
    },
    {
      src: "https://framerusercontent.com/images/qwVnKblygARf7tiZx5lUDJWpY.png",
      alt: "Gallery Image 14",
      height: "17rem",
    },
  ];

  // Videos used in the Hero
  const heroVideos = [
    {
      type: "video" as const,
      src: "https://cdn-front.freepik.com/home/anon-rvmp/features/designs/mockup-logo-hover.mp4",
      height: "18rem",
    },
    {
      type: "video" as const,
      src: "https://framerusercontent.com/assets/XX4yEVUD0cQvRpu54Cu7ZwJwGZs.mp4",
      height: "22rem",
    },
    {
      type: "video" as const,
      src: "https://res.papir.cc/assets/v/nano_spinning_fall_0509.mp4",
      height: "28rem",
    },
    {
      type: "video" as const,
      src: "https://framerusercontent.com/assets/Vb7xAqRZpCMTPZp1kkCLENR7ooI.mp4",
      height: "32rem",
    },
  ];

  // Extra requested video
  const extraVideo = {
    type: "video" as const,
    src: "https://res.papir.cc/assets/v/trimmed_Red_Bag.mp4",
    height: "20rem",
  };

  // Build per-column mixed media arrays with fixed placement (no randomness)
  const toImage = (item: { src: string; alt: string; height: string }) => ({
    type: "image" as const,
    ...item,
  });

  // Place some videos at the very top of their columns
  const col1 = [toImage(column1Images[0]), heroVideos[0], ...column1Images.slice(1).map(toImage)];
  const col3 = [heroVideos[1], ...column3Images.map(toImage)];
  const col5 = [toImage(column5Images[0]), heroVideos[2], ...column5Images.slice(1).map(toImage)];
  const col2 = [heroVideos[3], ...column2Images.map(toImage)];
  const col4 = [extraVideo, ...column4Images.map(toImage)];

  const handleGenerate = (item: { type: "image" | "video"; src: string }) => {
    // TODO: wire up to real generation action
    console.log("Generate clicked:", item);
  };

  return (
    <section className="pb-32">
      <div className="w-full px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {/* Column 1 */}
          <div className="flex flex-col gap-4 items-stretch">
            {col1.map((item, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="group bg-muted relative w-full overflow-hidden rounded-2xl"
                style={{ height: item.height }}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    className="absolute inset-0 h-full w-full object-cover"
                    muted
                    playsInline
                    autoPlay
                    loop
                  />
                ) : (
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={item.src}
                    alt={item.alt}
                  />
                )}
                <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100 bg-gradient-to-t from-black/40 to-transparent">
                  <div className="pointer-events-auto">
                    <AnimatedBorderButton
                      className="[&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
                      onClick={() => handleGenerate(item)}
                    >
                      Generate <Play />
                    </AnimatedBorderButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4 items-stretch">
            {col2.map((item, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="group bg-muted relative w-full overflow-hidden rounded-2xl"
                style={{ height: item.height }}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    className="absolute inset-0 h-full w-full object-cover"
                    muted
                    playsInline
                    autoPlay
                    loop
                  />
                ) : (
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={item.src}
                    alt={item.alt}
                  />
                )}
                <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100 bg-gradient-to-t from-black/40 to-transparent">
                  <div className="pointer-events-auto">
                    <AnimatedBorderButton
                      className="[&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
                      onClick={() => handleGenerate(item)}
                    >
                      Generate <Play />
                    </AnimatedBorderButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4 items-stretch">
            {col3.map((item, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="group bg-muted relative w-full overflow-hidden rounded-2xl"
                style={{ height: item.height }}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    className="absolute inset-0 h-full w-full object-cover"
                    muted
                    playsInline
                    autoPlay
                    loop
                  />
                ) : (
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={item.src}
                    alt={item.alt}
                  />
                )}
                <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100 bg-gradient-to-t from-black/40 to-transparent">
                  <div className="pointer-events-auto">
                    <AnimatedBorderButton
                      className="[&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
                      onClick={() => handleGenerate(item)}
                    >
                      Generate <Play />
                    </AnimatedBorderButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-4 items-stretch">
            {col4.map((item, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="group bg-muted relative w-full overflow-hidden rounded-2xl"
                style={{ height: item.height }}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    className="absolute inset-0 h-full w-full object-cover"
                    muted
                    playsInline
                    autoPlay
                    loop
                  />
                ) : (
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={item.src}
                    alt={item.alt}
                  />
                )}
                <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100 bg-gradient-to-t from-black/40 to-transparent">
                  <div className="pointer-events-auto">
                    <AnimatedBorderButton
                      className="[&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
                      onClick={() => handleGenerate(item)}
                    >
                      Generate <Play />
                    </AnimatedBorderButton>
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Decorative spacer removed to keep tight masonry spacing */}
          </div>

          {/* Column 5 */}
          <div className="flex flex-col gap-4 items-stretch">
            {col5.map((item, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="group bg-muted relative w-full overflow-hidden rounded-2xl"
                style={{ height: item.height }}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    className="absolute inset-0 h-full w-full object-cover"
                    muted
                    playsInline
                    autoPlay
                    loop
                  />
                ) : (
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={item.src}
                    alt={item.alt}
                  />
                )}
                <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100 bg-gradient-to-t from-black/40 to-transparent">
                  <div className="pointer-events-auto">
                    <AnimatedBorderButton
                      className="[&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
                      onClick={() => handleGenerate(item)}
                    >
                      Generate <Play />
                    </AnimatedBorderButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Gallery25 };
