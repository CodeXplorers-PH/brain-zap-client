import { ChevronRight } from "lucide-react";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

const BlogCard = ({ publishDate, title, description, img }) => {
  return (
    <div className="bg-white rounded-3xl flex flex-col h-full">
      {/* Image */}
      <img
        src={img}
        alt="Blog"
        className="w-full h-60 object-cover rounded-t-3xl"
      />
      {/* Content */}
      <div className="px-6 pb-6 mt-6 flex flex-col grow">
        <div>
          <p className="text-sm text-[#413E54]">
            {new Date(publishDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <h3 className="font-medium transition-all duration-300 text-2xl mt-2 text-[#413E54] hover:text-[#7E66F5]">
          {title}
        </h3>
        <p className="text-[#646173] text-lg font-light mt-6 grow">
          {description}
        </p>
        {/* Button */}
        <Link className="mt-auto">
          <Button className="mt-6 border-0 relative">
            Read More
            <ChevronRight
              strokeWidth={1.5}
              className="absolute opacity-0 transition-all group-hover:translate-x-14 ml-2 group-hover:opacity-100"
            />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
