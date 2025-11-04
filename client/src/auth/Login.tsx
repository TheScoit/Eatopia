// Component is in Capital Letter
// Login Form

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LoginInputState, userLoginSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// there are 2 types to define typescript 
// interface LoginInputState{
//   email:string;
//   password:string;
// }

// type LoginInputState = {
//   email:string;
//   password:string;
// }

// Login Page

const Login = () => {
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginInputState>>({});
  const { loading, login } = useUserStore();
  const navigate = useNavigate();

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  
  const loginSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const result = userLoginSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<LoginInputState>);
      return;
    }
    try {
      await login(input);
      navigate("/");
    } catch (error) {console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={loginSubmitHandler} className="md:p-8 w-full max-w-md md:border border-gray-200 rounded-lg mx-4">
        <div className="mb-4 text-center">
          <h1 className="font-bold text-2xl">PashaEats</h1>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            { 
            errors && <span className="text-xs text-red-500">{errors.email}</span>
          }
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={input.password}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
              />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
              { 
              errors && <span className="text-xs text-red-500">{errors.password}</span>
            }
          </div>
        </div>
        <div className="mb-10">
          {loading ? (
            <Button disabled className="bg-purple hover:hoverPurple w-full">
              <Loader2 className="mr-2 w-4 animate-spin h-4" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="bg-purple hover:bg-hoverPurple w-full">Login</Button>
          )}
          <div className="mt-4 text-center">
          <Link to='/forgot-password' className="hover:text-blue-500 hover:underline ">Forgot password?</Link>
          </div>
        </div>
        <Separator/>
        <p className="mt-2 text-center">
          Don't have any account ? {" "}
         <Link to="/signup" className="text-blue-500">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
