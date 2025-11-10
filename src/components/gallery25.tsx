"use client";

import { motion } from "framer-motion";
import React, { useMemo } from "react";

const Gallery25 = () => {
  // Base image columns
  const column1Images = [
    {
      type: "image" as const,
      src: "https://framerusercontent.com/images/AP8MxsVwC0m6aUew627Uzl3PlY.jpeg",
      alt: "Gallery Image 1",
      height: "23rem",
    },
    {
      type: "image" as const,
      src: "https://framerusercontent.com/images/OKAPNp5NBx92XHoAfb2IJe5GaE.jpg",
      alt: "Gallery Image 2",
      height: "28rem",
    },
    {
      type: "image" as const,
      src: "https://framerusercontent.com/images/jTk7xlHHF1IGEJbjQzmPMpmxz84.jpeg",
      alt: "Gallery Image 3",
      height: "12rem",
    },
  ];

  const column2Images = [
    {
      type: "image" as const,
      src: "https://framerusercontent.com/images/Sl9EJQTfoycU8fTKPQzTCSt7wI.jpg",
      alt: "Gallery Image 4",
      height: "13rem",
    },
    {
      type: "image" as const,
      src: "https://framerusercontent.com/images/D9TgLVUKJBPyEFgeH5cU1lj9W3A.jpeg",
      alt: "Gallery Image 5",
      height: "32rem",
    },
    {
      type: "image" as const,
      src: "https://framerusercontent.com/images/A3YTpd3ihmlKdXxeXm0pBEueA.jpg",
      alt: "Gallery Image 6",
      height: "18rem",
    },
  ];

  const column3Images = [
    {
      type: "image" as const,
      src: "https://framerusercontent.com/images/grEtdsKRFf8M8oKPm7RzOw0uAfg.jpg",
      alt: "Gallery Image 7",
      height: "32rem",
    },
    {
      type: "image" as const,
      src: "https://framerusercontent.com/images/Tw5d4QXO8KrpmBh9B9bEy8oWm1g.jpg",
      alt: "Gallery Image 8",
      height: "32rem",
    },
  ];

  const column4Images = [
    {
      type: "image" as const,
      src: "https://framerusercontent.com/images/IIwrTUEKmVA8Bc0vqQYJIoYqps.jpg",
      alt: "Gallery Image 9",
      height: "13rem",
    },
    {
      type: "image" as const,
      src: "https://framerusercontent.com/images/IF4Acwwh9jwUUCkAQHXQyyXDiGM.jpeg",
      alt: "Gallery Image 10",
      height: "22.5rem",
    },
    {
      type: "image" as const,
      src: "https://framerusercontent.com/images/07lRVxK2iyJbSLDBNZxgTnhtlk.jpeg",
      alt: "Gallery Image 11",
      height: "22rem",
    },
  ];

  const column5Images = [
    {
      type: "image" as const,
      src: "https://framerusercontent.com/images/PkU3Gw8pAzmi2niiMrnBcHuu8I.png",
      alt: "Gallery Image 12",
      height: "28rem",
    },
    {
      type: "image" as const,
      src: "https://framerusercontent.com/images/tAX01Ow9zlh8EUCDGAfh3hpdQ0.png",
      alt: "Gallery Image 13",
      height: "18rem",
    },
    {
      type: "image" as const,
      src: "https://framerusercontent.com/images/qwVnKblygARf7tiZx5lUDJWpY.png",
      alt: "Gallery Image 14",
      height: "17rem",
    },
  ];

  // Videos used in the Hero (added to gallery, randomized)
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

  // Randomly distribute hero videos across different columns
  const columns = useMemo(() => {
    const cols = [
      [...column1Images],
      [...column2Images],
      [...column3Images],
      [...column4Images],
      [...column5Images],
    ];

    // Shuffle column indices to spread videos across unique columns
    const colIndices = [0, 1, 2, 3, 4];
    for (let i = colIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [colIndices[i], colIndices[j]] = [colIndices[j], colIndices[i]];
    }

    heroVideos.forEach((video, idx) => {
      const colIndex = colIndices[idx % colIndices.length];
      const col = cols[colIndex];
      const insertAt = Math.floor(Math.random() * (col.length + 1));
      col.splice(insertAt, 0, video);
    });

    return cols;
  }, []);

  return (
    <section className="pb-32">
      <div className="w-full px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {/* Column 1 */}
          <div className="grid gap-4">
            {columns[0].map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="bg-muted w-full overflow-hidden rounded-2xl"
                style={{ height: item.height }}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    className="h-full w-full rounded-2xl object-cover"
                    muted
                    playsInline
                    autoPlay
                    loop
                  />
                ) : (
                  <img
                    className="h-full w-full rounded-2xl object-cover"
                    src={item.src}
                    alt={item.alt}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="grid gap-4">
            {columns[1].map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: -50,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="bg-muted w-full overflow-hidden rounded-2xl"
                style={{ height: item.height }}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    className="h-full w-full rounded-2xl object-cover"
                    muted
                    playsInline
                    autoPlay
                    loop
                  />
                ) : (
                  <img
                    className="h-full w-full rounded-2xl object-cover"
                    src={item.src}
                    alt={item.alt}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="grid gap-4">
            {columns[2].map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="bg-muted w-full overflow-hidden rounded-2xl"
                style={{ height: item.height }}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    className="h-full w-full rounded-2xl object-cover"
                    muted
                    playsInline
                    autoPlay
                    loop
                  />
                ) : (
                  <img
                    className="h-full w-full rounded-2xl object-cover"
                    src={item.src}
                    alt={item.alt}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Column 4 */}
          <div className="grid gap-4">
            {columns[3].map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: -50,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="bg-muted w-full overflow-hidden rounded-2xl"
                style={{ height: item.height }}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    className="h-full w-full rounded-2xl object-cover"
                    muted
                    playsInline
                    autoPlay
                    loop
                  />
                ) : (
                  <img
                    className="h-full w-full rounded-2xl object-cover"
                    src={item.src}
                    alt={item.alt}
                  />
                )}
              </motion.div>
            ))}
            <div className="h-17 bg-muted w-full rounded-2xl"></div>
          </div>

          {/* Column 5 */}
          <div className="grid gap-4">
            {columns[4].map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="bg-muted w-full overflow-hidden rounded-2xl"
                style={{ height: item.height }}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    className="h-full w-full rounded-2xl object-cover"
                    muted
                    playsInline
                    autoPlay
                    loop
                  />
                ) : (
                  <img
                    className="h-full w-full rounded-2xl object-cover"
                    src={item.src}
                    alt={item.alt}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Gallery25 };
