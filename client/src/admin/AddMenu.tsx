import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Edit2 } from "lucide-react";
import React, { FormEvent, useState } from "react";
import EditMenu from "./EditMenu";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";

const AddMenu = () => {
  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<any>();
  const [error, setError] = useState<Partial<MenuFormSchema>>({});
  const { loading, createMenu } = useMenuStore();
  const { restaurant } = useRestaurantStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<MenuFormSchema>);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
      if (input.image) {
        formData.append("image", input.image);
      }
      await createMenu(formData);
      setInput({ name: "", description: "", price: 0, image: undefined });
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Available Menus
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="bg-purple hover:bg-hoverPurple flex items-center gap-2">
              <Plus /> Add Menu
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add A New Menu</DialogTitle>
              <DialogDescription>
                Create a menu that will make your restaurant stand out.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder="Enter menu name"
                />
                {error.name && <span className="text-xs text-red-600">{error.name}</span>}
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Enter menu description"
                />
                {error.description && <span className="text-xs text-red-600">{error.description}</span>}
              </div>
              <div>
                <Label>Price (₹)</Label>
                <Input
                  type="number"
                  name="price"
                  value={input.price}
                  onChange={changeEventHandler}
                  placeholder="Enter menu price"
                />
                {error.price && <span className="text-xs text-red-600">{error.price}</span>}
              </div>
              <div>
                <Label>Upload Image</Label>
                <Input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setInput({ ...input, image: e.target.files?.[0] || undefined })
                  }
                />
                {error.image && <span className="text-xs text-red-600">{error.image.name}</span>}
              </div>
              <DialogFooter>
                <Button className="bg-purple hover:bg-hoverPurple w-full mt-4 flex justify-center items-center">
                  {loading && <Loader2 className="animate-spin mr-2 w-4 h-4" />}
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Menu Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {restaurant?.menus.map((menu: any) => (
          <div
            key={menu._id}
            className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative">
              <img
                src={menu.image}
                alt={menu.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3 bg-yellow-400 dark:bg-yellow-600 text-gray-900 dark:text-white px-3 py-1 rounded-full font-semibold text-sm shadow">
                Popular
              </div>
              <div className="absolute bottom-3 right-3 bg-violet-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                ₹{menu.price}
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {menu.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm line-clamp-3">
                {menu.description}
              </p>
              <Button
                onClick={() => {
                  setSelectedMenu(menu);
                  setEditOpen(true);
                }}
                className="mt-4 bg-purple hover:bg-hoverPurple flex items-center justify-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Menu Dialog */}
      <EditMenu
        selectedMenu={selectedMenu}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
    </div>
  );
};

export default AddMenu;
