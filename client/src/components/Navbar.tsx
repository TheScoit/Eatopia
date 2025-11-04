import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  HandPlatter,
  Loader2,
  Menu,
  Moon,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import { useThemeStore } from "@/store/useThemeStore";

const Navbar = () => {
  const { user, loading, logout } = useUserStore();
  const { cart } = useCartStore();
  const { setTheme } = useThemeStore();

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <Link to="/">
          <h1 className="font-extrabold text-2xl text-red-600">PashaEats</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-6 font-medium text-gray-700">
            <Link className="hover:text-red-600 transition" to="/">Home</Link>
            <Link className="hover:text-red-600 transition" to="/profile">Profile</Link>
            <Link className="hover:text-red-600 transition" to="/order/status">Order</Link>

            {user?.admin && (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger className="hover:text-red-600 transition">Dashboard</MenubarTrigger>
                  <MenubarContent className="bg-white rounded-lg shadow-lg border border-gray-200">
                    <Link to="/admin/restaurant"><MenubarItem>Restaurant</MenubarItem></Link>
                    <Link to="/admin/menu"><MenubarItem>Menu</MenubarItem></Link>
                    <Link to="/admin/orders"><MenubarItem>Orders</MenubarItem></Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
          </div>

          {/* Right side: theme toggle, cart, avatar, logout */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="p-2 rounded-full hover:bg-gray-100 transition">
                  <Sun className="h-5 w-5 dark:hidden" />
                  <Moon className="h-5 w-5 hidden dark:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-lg shadow-lg border border-gray-200">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-red-600 transition" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 text-xs rounded-full flex items-center justify-center bg-red-500 text-white">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Avatar */}
            <Avatar className="w-9 h-9">
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            {/* Logout */}
            {loading ? (
              <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg transition"
              >
                Logout
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// Mobile Navbar (Drawer/Sheet)
const MobileNavbar = () => {
  const { user, logout, loading } = useUserStore();
  const { setTheme } = useThemeStore();
  const { cart } = useCartStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full p-2 bg-gray-200 hover:bg-gray-300">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col p-4">
        <SheetHeader className="flex justify-between items-center mb-4">
          <SheetTitle className="text-xl font-bold text-red-600">PashaEats</SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="p-2 rounded-full hover:bg-gray-100 transition">
                <Sun className="h-5 w-5 dark:hidden" />
                <Moon className="h-5 w-5 hidden dark:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-lg shadow-lg border border-gray-200">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>

        <Separator className="my-2" />

        <SheetDescription className="flex flex-col gap-2">
          <Link to="/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
            <User className="w-5 h-5" />
            Profile
          </Link>
          <Link to="/order/status" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
            <HandPlatter className="w-5 h-5" />
            Orders
          </Link>
          <Link to="/cart" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
            <ShoppingCart className="w-5 h-5" />
            Cart ({cart.length})
          </Link>
          {user?.admin && (
            <>
              <Link to="/admin/menu" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
                <SquareMenu className="w-5 h-5" />
                Menu
              </Link>
              <Link to="/admin/restaurant" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
                <UtensilsCrossed className="w-5 h-5" />
                Restaurant
              </Link>
              <Link to="/admin/orders" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition">
                <PackageCheck className="w-5 h-5" />
                Orders
              </Link>
            </>
          )}
        </SheetDescription>

        <SheetFooter className="mt-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="w-9 h-9">
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="font-bold">{user?.fullname || "User"}</span>
          </div>

          <SheetClose asChild>
            {loading ? (
              <Button className="bg-red-500 hover:bg-red-600 text-white w-full flex justify-center items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white w-full transition"
              >
                Logout
              </Button>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
