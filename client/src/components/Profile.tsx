import {
  Loader2,
  LocateIcon,
  Mail,
  MapPin,
  MapPinnedIcon,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FormEvent, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";

const Profile = () => {
  const { user, updateProfile } = useUserStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    profilePicture: user?.profilePicture || "",
  });
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedProfilePicture, setSelectedProfilePicture] =
    useState<string>(profileData.profilePicture || "");

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfilePicture(result);
        setProfileData((prev) => ({
          ...prev,
          profilePicture: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const updateProfileHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await updateProfile(profileData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={updateProfileHandler}
      className="max-w-3xl mx-auto my-10 p-6 bg-white dark:bg-gray-800 dark:text-red-500 rounded-2xl shadow-xl border border-gray-200 transition-all"
    >
      {/* Top Section: Profile Picture + Name */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <div className="relative group w-28 h-28 md:w-32 md:h-32 flex-shrink-0">
          <Avatar className="w-full h-full rounded-full shadow-md">
            <AvatarImage src={selectedProfilePicture} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <input
            ref={imageRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={fileChangeHandler}
          />
          <div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 rounded-full cursor-pointer transition-opacity group-hover:opacity-100"
            onClick={() => imageRef.current?.click()}
          >
            <Plus className="text-white w-6 h-6" />
          </div>
        </div>
        <Input
          type="text"
          name="fullname"
          value={profileData.fullname}
          onChange={changeHandler}
          placeholder="Full Name"
          className="text-xl md:text-2xl font-semibold w-full md:w-96 focus:ring-2 focus:ring-purple-400 rounded-lg border border-gray-200 px-4 py-2 transition-all"
        />
      </div>

      {/* Grid Section: Email, Address, City, Country */}
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        {/** Email */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
          <Mail className="text-gray-400 w-5 h-5" />
          <div className="flex-1 flex flex-col">
            <Label>Email</Label>
            <Input
              value={profileData.email}
              disabled
              className="bg-transparent border-none focus:ring-0 focus:border-none text-gray-700"
            />
          </div>
        </div>
        {/** Address */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
          <LocateIcon className="text-gray-400 w-5 h-5" />
          <div className="flex-1 flex flex-col">
            <Label>Address</Label>
            <Input
              name="address"
              value={profileData.address}
              onChange={changeHandler}
              className="bg-transparent border-none focus:ring-0 focus:border-none"
            />
          </div>
        </div>
        {/** City */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
          <MapPin className="text-gray-400 w-5 h-5" />
          <div className="flex-1 flex flex-col">
            <Label>City</Label>
            <Input
              name="city"
              value={profileData.city}
              onChange={changeHandler}
              className="bg-transparent border-none focus:ring-0 focus:border-none"
            />
          </div>
        </div>
        {/** Country */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
          <MapPinnedIcon className="text-gray-400 w-5 h-5" />
          <div className="flex-1 flex flex-col">
            <Label>Country</Label>
            <Input
              name="country"
              value={profileData.country}
              onChange={changeHandler}
              className="bg-transparent border-none focus:ring-0 focus:border-none"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-10 text-center">
        <Button
          type="submit"
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-2 rounded-xl hover:scale-105 transition-transform shadow-lg"
          disabled={isLoading}
        >
          {isLoading && (
            <Loader2 className="w-5 h-5 mr-2 inline-block animate-spin" />
          )}
          {isLoading ? "Please wait..." : "Update Profile"}
        </Button>
      </div>
    </form>
  );
};

export default Profile;
