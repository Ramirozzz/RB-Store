import { Link } from "react-router-dom";
interface CategoryCardProps {
  title: string;
  image: string;
  categoryId: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  image,
  categoryId,
}) => {
  return (
    <Link
      to={`/shop?category=${categoryId}`}
      className="group relative overflow-hidden"
    >
      <img
        src={image}
        alt={`${title} eyewear`}
        loading="lazy"
        className="h-100 w-full object-cover object-center sm:h-125"
      />

      <div className="absolute inset-0 flex items-end bg-black/10 p-5">
        <span className="text-sm font-bold uppercase tracking-wider text-white">
          {title}
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
