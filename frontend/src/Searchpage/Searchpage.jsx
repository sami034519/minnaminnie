import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { garments, shoes, sportswear, toys } from "../data/Product";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";

const SearchPage = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const queryParam = new URLSearchParams(search).get("q");
  const query = queryParam?.trim().toLowerCase() || "";

  const allProducts = [
    ...garments.map((p) => ({ ...p, type: "garment" })),
    ...shoes.map((p) => ({ ...p, type: "shoe" })),
    ...sportswear.map((p) => ({ ...p, type: "sportswear" })),
    ...toys.map((p) => ({ ...p, type: "toy" })),
  ];

  const parsePrice = (price) =>
    typeof price === "string"
      ? parseInt(price.replace(/Rs\.?\s?/, "").replace(/,/g, ""))
      : price;

  // Split the query into individual keywords
  const keywords = query.split(" ").filter(Boolean);

  // Token-based filter (matches if ANY keyword appears in title/type/features/sizes)
  const filtered = keywords.length
    ? allProducts.filter((product) => {
        const searchText = `
          ${product.title}
          ${product.type}
          ${(product.features || []).join(" ")}
          ${(product.sizes || []).join(" ")}
        `.toLowerCase();

        return keywords.some((word) => searchText.includes(word));
      })
    : [];

  const handleAddToCart = (product) => {
    const numericPrice = parsePrice(product.discountPrice || product.price);
    dispatch(
      addToCart({
        ...product,
        price: numericPrice,
        quantity: 1,
        type: product.type,
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-myPink mb-8 text-center">
        {query ? `Search Results for "${query}"` : "Please enter a search term"}
      </h2>

      {query === "" ? (
        <p className="text-center text-gray-500">
          No search term provided. Try typing something like "toy" or "shoes".
        </p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found for "{query}".
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filtered.map((product) => {
            const price = parsePrice(product.discountPrice || product.price);
            const oldPrice = parsePrice(product.price);

            return (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg overflow-hidden group relative hover:scale-[1.02] transition-transform duration-300"
              >
                <NavLink
                  to={
                    product.type === "shoe"
                      ? `/shoe/${product.id}`
                      : product.type === "toy"
                      ? `/toy/${product.id}`
                      : product.type === "sportswear"
                      ? `/sportswear/${product.id}`
                      : `/product/${product.id}`
                  }
                  className="block"
                >
                  <div className="bg-productscolor h-48 relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain z-10 relative"
                    />
                    {product.hoverImage && (
                      <img
                        src={product.hoverImage}
                        alt="hover"
                        className="absolute top-0 left-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                      />
                    )}
                  </div>
                </NavLink>

                <div className="p-3 text-center">
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">
                    {product.title}
                  </h4>

                  <div className="flex justify-center gap-2 text-sm mb-2">
                    {product.discountPrice && (
                      <p className="line-through text-gray-400">
                        Rs. {oldPrice.toLocaleString()}
                      </p>
                    )}
                    <p className="text-pink-600 font-semibold">
                      Rs. {price.toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-myPink hover:bg-mypurple text-white px-3 py-1 rounded text-xs flex items-center gap-2 justify-center"
                  >
                    <FaCartPlus size={12} />
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
