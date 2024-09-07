"use client";
import { ICategory } from "@/components/blog/types";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";

interface ICategoriesProps {
  categories: ICategory[];
}

export default function Categories(props: ICategoriesProps) {
  const { categories } = props;
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  return (
    <div className="gap-2 grid grid-flow-col auto-cols-max">
      <Link className="w-fit" href={`/blog`}>
        <Badge
          className={`${
            selectedCategory ? "bg-pink-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          All
        </Badge>
      </Link>

      {categories?.map((category) => (
        <div key={category.id} className="">
          <Link className="w-fit" href={`/blog?category=${category.title}`}>
            <Badge
              className={`${
                selectedCategory == category.title
                  ? "bg-gray-200 text-black"
                  : "bg-pink-500 text-white"
              }`}
            >
              {category.title}
            </Badge>
          </Link>
        </div>
      ))}
    </div>
  );
}
