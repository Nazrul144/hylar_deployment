"use client";
import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { CiBookmark } from "react-icons/ci";
import { BASE_URL } from "../../config/config";
import { WishlistContext } from "../../providers/WishlistContext";
import { UserContext } from "../../providers/UserProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const StorageItem = () => {
  const { user } = useContext(UserContext);
  const { savedItems, loading, toggleSave } = useContext(WishlistContext);
  const router = useRouter();
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  const getImageUrl = (image) => {
    if (!image || image === "undefined" || image === "null") return "/fallback.jpg";
    if (image.startsWith("http")) return image;
    return `${BASE_URL}${image}`;
  };

  const handleRemove = async (productId) => {
    setRemovingId(productId);
    const result = await toggleSave(productId);
    if (result.success) {
      toast.success("Removed from wishlist.");
    } else {
      toast.error(result.message || "Failed to remove item.");
    }
    setRemovingId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="lg:w-7xl mx-auto mt-8 px-2">
      {savedItems.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500 text-lg font-medium bg-gray-50 border border-dashed border-gray-300 px-6 py-4 rounded-md shadow-sm">
            No bookmarks found
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 px-2 gap-3">
          {savedItems.map((entry) => {
            const item = entry.product;
            const isRemoving = removingId === item.id;

            return (
              <div className="shadow-xl p-4 rounded-sm" key={entry.id}>
                <Image
                  src={getImageUrl(item.image)}
                  width={400}
                  height={400}
                  alt={item.name || "Product Image"}
                  style={{ objectFit: "cover", width: "400px", height: "400px" }}
                />
                <h1 className="mt-2 font-semibold">{item.brand_name}</h1>
                {item.discount_percent && parseFloat(item.discount_percent) > 0 && (
                  <p className="text-red-500 font-bold mt-1">
                    {item.discount_percent}% OFF
                  </p>
                )}
                <div className="flex items-center gap-3 mt-3">
                  <Button className="border-2 rounded-none text-lg" variant="none">
                    <Link href={`/redeem_details/${item.id}`}>Redeem {">>"}</Link>
                  </Button>
                  <Button
                    onClick={() => handleRemove(item.id)}
                    disabled={isRemoving}
                    className={`border-2 rounded-none text-lg cursor-pointer text-red-500 hover:bg-red-100 transition-opacity ${
                      isRemoving ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    variant="none"
                  >
                    <CiBookmark />
                    {isRemoving ? "Removing..." : "Remove"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StorageItem;