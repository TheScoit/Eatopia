import { useEffect, useState } from "react";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { debounce } from "lodash";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { useNavigate } from "react-router-dom";

export default function SearchInputWithSuggestions() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("recentSearches") || "[]");
  });

  const { restaurant, searchRestaurant } = useRestaurantStore();
  const navigate = useNavigate();

  const handleSearch = debounce(async (text: string) => {
    if (!text) {
      setSuggestions([]);
      return;
    }

    // Filter locally from fetched restaurants for autocomplete
    const allRestaurants = restaurant || [];
    const filtered = allRestaurants
      .filter((r) =>
        r.restaurantName.toLowerCase().includes(text.toLowerCase())
      )
      .map((r) => r.restaurantName)
      .slice(0, 5); // top 5 suggestions

    setSuggestions(filtered);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    handleSearch(val);
  };

  const handleSelect = (selected: string) => {
    setQuery(selected);
    setSuggestions([]);

    // Save recent searches
    const updatedRecent = [selected, ...recentSearches.filter(s => s !== selected)].slice(0, 5);
    setRecentSearches(updatedRecent);
    localStorage.setItem("recentSearches", JSON.stringify(updatedRecent));

    navigate(`/search/${selected}`);
    searchRestaurant(selected, selected, []); // empty filter for simplicity
  };

  return (
    <div className="relative w-full md:w-96">
      <Input
        value={query}
        onChange={handleChange}
        placeholder="Search restaurants or cuisines"
      />
      {(suggestions.length > 0 || recentSearches.length > 0) && (
        <Card className="absolute top-full mt-1 w-full z-50 max-h-60 overflow-y-auto shadow-lg">
          <div className="flex flex-col">
            {suggestions.map((s, idx) => (
              <div
                key={idx}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(s)}
              >
                {s}
              </div>
            ))}
            {suggestions.length === 0 && recentSearches.length > 0 && (
              <>
                <div className="px-4 py-2 text-gray-500 font-semibold">
                  Recent Searches
                </div>
                {recentSearches.map((s, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelect(s)}
                  >
                    {s}
                  </div>
                ))}
              </>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
