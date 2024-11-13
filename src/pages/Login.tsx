import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { loginThunk } from "@/slice/authSlice";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { toast } = useToast();
  const user = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    const payload = {
      username: email,
      password: password,
      expiresInMins: 30,
    };

    try {
      await dispatch(loginThunk(payload)); // Make sure to await the dispatch
      toast({
        title: "Login success!",
        variant: "success",
        description: "You have successfully logged in.",
        duration: 1000,
      });
    } catch (error) {
      toast({
        description: "Login failed. Please try again.",
        variant: "destructive",
        duration: 1000,
      });
    }
    console.log("Login clicked");
  };
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center flex-col gap-5">
          <Input
            type="text"
            placeholder="Username"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" onClick={handleLogin}>
            Login
          </Button>
        </CardContent>
        <CardFooter className="justify-center p-4 pt-0">
          <a href="/forgot-password" className=" text-blue-900">
            Forgot Password?
          </a>
        </CardFooter>
        <Separator className="w-[80%] justify-center mx-auto" />
        <CardFooter className="justify-center p-4">
          <p className="text-base px-2">Don't have an account?</p>
          <a className="text-base cursor-pointer text-blue-900 underline underline-offset-3">
            Sign-Up
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
