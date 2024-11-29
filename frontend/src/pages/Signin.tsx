import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Github, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, SetEmail] = useState<string>("");
  const [password, SetPassword] = useState<string>("");
  const navigate = useNavigate();

  async function handleSignin() {
    if (!email || !password) return;
    const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
      email,
      password,
    });
    console.log(res);
    if (res.data.token) {
      localStorage.setItem("token", `Bearer ${res.data.token}`);
      localStorage.setItem("userId", res.data.user_id);
      navigate("/dashboard");
    }
  }
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 text-gray-100 border-gray-700">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Code2 className="h-10 w-10 text-blue-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Sign in to DevPlatform
          </CardTitle>
          <CardDescription className="text-gray-400 text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="bg-gray-700 border-gray-600 text-gray-100"
              onChange={(e) => SetEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              className="bg-gray-700 border-gray-600 text-gray-100"
              onChange={(e) => SetPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm">
              Remember me
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={handleSignin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Sign In
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-800 px-2 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="outline"
              className="bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-600"
            >
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
          </div>
          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
