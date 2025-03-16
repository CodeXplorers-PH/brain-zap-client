import BlogCard from "@/components/Blog/BlogCard";
import { Input } from "@/components/ui/input";
import SectionHeading from "@/components/ui/SectionHeading";
import { blogs } from "@/data/Blogs";
import { categories } from "@/data/Categories";
import { Search } from "lucide-react";
const Blog = () => {
  return (
    <div className="bg-[#F6F5F1] min-h-[900px] pb-20 pt-60">
      <div className="!max-w-[1240px] mx-auto">
        {/* Heading */}
        <SectionHeading
          heading="Brain Zap Articles"
          subHeading="Helpful articles with all the information you need to raise happy, healthy children!"
        ></SectionHeading>

        {/* Searchbar */}
        <div className="relative lg:w-[30%] md:w-[50%] w-[80%] mx-auto mt-20">
          <Search className="absolute left-4 top-1/2 w-5 transform -translate-y-1/2 text-[#7E66F5]" />
          <Input
            type="search"
            placeholder="Search"
            className="pl-10 pr-4 py-6 rounded-full focus:ring-0 focus:outline-0 focus:ring-[#7E66F5] focus-visible:border-[#7E66F5] focus-visible:ring-0 bg-white placeholder:text-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center mt-10 gap-4 w-fit mx-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white border cursor-pointer rounded-full text-center px-5 py-2 w-fit hover:text-[#9681FE] transition duration-200"
            >
              {category.category}
            </div>
          ))}
        </div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 max-w-[1240px] mx-auto">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              publishDate={blog.publish_date}
              title={blog.title}
              description={blog.description}
              img={blog.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
