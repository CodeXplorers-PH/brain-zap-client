import { Input } from "@/components/ui/input";
import SectionHeading from "@/components/ui/SectionHeading";
import { Search } from "lucide-react";

const Blog = () => {
  return (
    <div className="bg-[#F6F5F1] min-h-[900px] pt-20 pb-60">
      {/* Heading */}
      <SectionHeading
        heading="BrainZap Articles"
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
    </div>
  );
};

export default Blog;
