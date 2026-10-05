import { Link } from "react-router-dom";
import hero from "../../assets/images/hero/hero.jpg";
import { MdArrowRightAlt } from "react-icons/md";

const Hero = () => {
  return (
    <section className="relative flex min-h-[calc(100vh-310px)] items-end overflow-hidden bg-surface md:min-h-[calc(100vh-110px)]">
      <img
        src={hero}
        alt="RB Store eyewear"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 w-full px-4 pb-8 text-white sm:px-8 lg:px-10 lg:pb-10 xl:px-15">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            See things
            <br />
            differently.
          </h1>

          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-1 text-sm uppercase tracking-wider text-white transition hover:text-neutral-200"
          >
            Shop now <MdArrowRightAlt size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
