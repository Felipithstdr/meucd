"use client";

import AOS from "aos";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

const Hero = () => {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: false,
      offset: 50,
      mirror: true,
    });
  }, []);

  return (
    <section
      id="hero"
      className="hero section bg-white dark:bg-gray-900"
      data-aos="fade-up"
    >
      <Image
        className="opacity-40 dark:opacity-30"
        src="/img/hero.jpg"
        alt="Hero"
        data-aos="fade-up"
        height={1090}
        width={1920}
        priority
      />
      <div className="z-40 mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
        <h1
          className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-amber-50"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <span className="text-blue-700 dark:text-blue-700">
            Certificado Digital
          </span>
        </h1>
        <p className="mb-8 text-lg font-normal text-black sm:px-16 lg:text-xl xl:px-48 dark:text-gray-950">
          De um jeito simples e rápido
        </p>
        <div
          className="mb-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:mb-16"
          data-aos="fade-up"
          data-aos-delay="210"
        >
          <Button
            asChild
            className="focus:ring-primary-300 inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-center text-base font-medium text-white focus:ring-4 sm:w-1/5 dark:bg-gray-800 dark:text-white"
          >
            <Link href="#certificates">
              Comprar
              <ArrowDown
                className="animate-bounce"
                style={{
                  width: "22px",
                  height: "22px",
                  animationDuration: "0.6s",
                }}
              />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
export default Hero;
