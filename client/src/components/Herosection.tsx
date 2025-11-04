import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import HeroImg from '@/assets/ccefcb5f40d3927a92f3232c8491e531-removebg-preview.png';
import { useNavigate } from "react-router-dom";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { debounce } from "lodash";

const Herosection = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();
  const { restaurant , getRestaurant } = useRestaurantStore();

  useEffect(() => {
    if(!restaurant) getRestaurant();
  }, []);


  const handleSearch = debounce((text: string) => {
    if (!text) return setSuggestions([]);

    const filtered = (restaurant || [])
      .filter(r => r.restaurantName.toLowerCase().includes(text.toLowerCase()))
      .map(r => r.restaurantName)
      .slice(0, 5);

    setSuggestions(filtered);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchText(val);
    handleSearch(val);
  };

  const handleSelect = (selected: string) => {
    setSearchText(selected);
    setSuggestions([]);
    navigate(`/search/${selected}`);
  };

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20">
      <div className="flex flex-col gap-10 md:w-[40%]">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl">
            Order Food anytime & anywhere
          </h1>
          <p className="text-gray-500">
            Hey! Our Delicious food is waiting to serve you
          </p>
        </div>

        {/* Search Input with suggestions */}
        <div className="relative flex flex-col gap-2">
          <div className="flex items-center gap-2 w-full">
            <Input
              type="text"
              placeholder="Search restaurant by name, city & country"
              value={searchText}
              onChange={handleChange}
              className="pl-10 shadow-xl w-full"
            />
            <Search className="text-gray-500 absolute inset-y-2 left-2" />
            <Button
              onClick={() => navigate(`/search/${searchText}`)}
              className="bg-purple hover:bg-hoverPurple"
            >
              Search
            </Button>
          </div>

          {/* Dropdown Suggestions */}
          {suggestions.length > 0 && (
            <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 overflow-hidden">
              {suggestions.map((s, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleSelect(s)}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <img
          className="object-cover w-full max-h-[500px]"
          src={HeroImg}
          alt="under maintenance"
        />
      </div>
    </div>
  );
};

export default Herosection;
