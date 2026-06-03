import { useRef } from "react";

import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Package,
  Sparkles,
} from "lucide-react";

export default function ProductCarousel({
  products = [],
}) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  if (!products.length) return null;

  return (
    <div className="mt-4 w-full">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles
            size={16}
            className="text-zinc-900 dark:text-white"
          />

          <h3 className="text-sm font-medium text-zinc-900 dark:text-white">
            Recommended Products
          </h3>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="
              rounded-xl
              border
              border-zinc-200
              bg-white
              p-2
              text-zinc-600
              transition-all

              hover:border-zinc-300
              hover:bg-zinc-100
              hover:text-zinc-900

              dark:border-zinc-800
              dark:bg-zinc-900
              dark:text-zinc-400
              dark:hover:border-zinc-600
              dark:hover:bg-zinc-800
              dark:hover:text-white
            "
            aria-label="Scroll left"
          >
            <ChevronLeft size={14} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="
              rounded-xl
              border
              border-zinc-200
              bg-white
              p-2
              text-zinc-600
              transition-all

              hover:border-zinc-300
              hover:bg-zinc-100
              hover:text-zinc-900

              dark:border-zinc-800
              dark:bg-zinc-900
              dark:text-zinc-400
              dark:hover:border-zinc-600
              dark:hover:bg-zinc-800
              dark:hover:text-white
            "
            aria-label="Scroll right"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        onWheel={(e) => {
          e.currentTarget.scrollLeft += e.deltaY;
        }}
        className="
          custom-scrollbar
          flex
          gap-3
          overflow-x-auto
          scroll-smooth
          pb-3
        "
      >
        {products.map((product) => {
          const hasValidPrices =
            typeof product.price === "number" &&
            typeof product.originalPrice === "number" &&
            product.originalPrice > 0;

          const discount =
            hasValidPrices &&
            product.originalPrice > product.price
              ? Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )
              : 0;

          return (
            <a
              key={product.id}
              href={`https://dripzoid.com/product/${product.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                min-w-[210px]
                overflow-hidden
                rounded-2xl
                border
                border-zinc-200
                bg-white
                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-zinc-300
                hover:shadow-xl
                hover:shadow-zinc-900/10

                dark:border-zinc-800
                dark:bg-zinc-900
                dark:hover:border-zinc-600
                dark:hover:shadow-black/30
              "
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="
                    h-44
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />

                {discount > 0 && (
                  <div
                    className="
                      absolute
                      left-2
                      top-2
                      rounded-full
                      bg-black/70
                      px-2
                      py-1
                      text-[10px]
                      font-semibold
                      text-white
                      backdrop-blur
                    "
                  >
                    {discount}% OFF
                  </div>
                )}

                <div
                  className="
                    absolute
                    right-2
                    top-2
                    rounded-full
                    bg-black/70
                    p-2
                    text-white
                    backdrop-blur
                  "
                >
                  <ArrowUpRight size={11} />
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <div
                  className="
                    mb-2
                    flex
                    items-center
                    gap-1
                    text-zinc-500
                    dark:text-zinc-400
                  "
                >
                  <Package size={11} />

                  <span className="text-[10px] uppercase tracking-wider">
                    {product.subcategory}
                  </span>
                </div>

                <h3
                  className="
                    line-clamp-2
                    text-sm
                    font-semibold
                    text-zinc-900
                    dark:text-white
                  "
                >
                  {product.name}
                </h3>

                <p
                  className="
                    mt-1
                    line-clamp-2
                    text-xs
                    text-zinc-600
                    dark:text-zinc-400
                  "
                >
                  {product.description}
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-base font-bold text-zinc-900 dark:text-white">
                    ₹{product.price}
                  </span>

                  <span className="text-xs line-through text-zinc-500 dark:text-zinc-500">
                    ₹{product.originalPrice}
                  </span>
                </div>

                <div
                  className="
                    mt-3
                    flex
                    items-center
                    gap-1
                    text-xs
                    font-medium
                    text-zinc-500
                    transition-colors

                    group-hover:text-zinc-900

                    dark:text-zinc-400
                    dark:group-hover:text-white
                  "
                >
                  View Product
                  <ArrowUpRight size={11} />
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}