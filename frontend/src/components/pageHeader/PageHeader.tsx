import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  description: string;
}
const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="text-sm text-text px-4 sm:px-8 lg:px-10 xl:px-15  ">
      <div className="flex items-center gap-2">
        <Link to={"/"}>
          <span className="underline">Home</span>
        </Link>
        <span>/</span>
        <span className="text-muted">{title}</span>
      </div>

      <h1 className="mt-4 md:mt-8 text-3xl uppercase tracking-tight text-text sm:text-5xl">
        {title}
      </h1>
      <p className="mt-3 md:mt-5 max-w-md text-sm leading-6 text-text sm:text-base">
        {description}
      </p>
      <hr className="text-border mt-8 lg:mt-20" />
    </div>
  );
};

export default PageHeader;
