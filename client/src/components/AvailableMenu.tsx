import { MenuItem } from "@/types/restaurantType";
import { useCartStore } from "@/store/useCartStore";
import { useNavigate } from "react-router-dom";

const AvailableMenu = ({ menus }: { menus: MenuItem[] }) => {
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  return (
    <div className="md:p-1 sm:p-3 lg:p-2">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-gray-100">
        Available Menus
      </h1>
      <div className="grid md:grid-cols-3 gap-8">
        {menus.map((menu: MenuItem) => (
          <div
            key={menu._id}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl   duration-300 overflow-hidden cursor-pointer flex flex-col"
          >
            {/* Image with overlay */}
            <div className="relative">
              <img
                src={menu.image}
                alt={menu.name}
                className="w-full h-52 object-cover"
              />
              <div className="absolute top-3 left-3 bg-yellow-400 dark:bg-yellow-600 text-gray-900 dark:text-white px-3 py-1 rounded-full font-semibold text-sm shadow">
                Popular
              </div>
              <div className="absolute bottom-3 right-3 bg-violet-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                ₹{menu.price}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {menu.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm line-clamp-3">
                {menu.description}
              </p>

              {/* Badges (optional) */}
              {menu.badges?.length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {menu.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-red-100 dark:bg-red-700 text-red-700 dark:text-red-100 rounded-full font-semibold"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              {/* Add to Cart button */}
              <button
                onClick={() => {
                  addToCart(menu);
                  navigate("/cart");
                }}
                className="mt-auto bg-violet-500 hover:bg-violet-700 text-white py-3 rounded-xl font-bold shadow-lg transition-transform transform hover:scale-105"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableMenu;
