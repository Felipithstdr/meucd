"use client";

const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <footer className="fixed bottom-0 left-0 flex w-full justify-between border-t-2 border-sky-500 bg-[#F5F7FB] px-4 py-4 text-[0.925rem] opacity-95 dark:bg-black md:px-8">
      <div>
        © {currentYear}
        <span className="font-semibold"> Meu Certificado Digital. </span>
        Todos direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
