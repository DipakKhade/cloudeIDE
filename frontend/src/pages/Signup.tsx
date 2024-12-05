import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react"
export default function Signup() {
  const [email, SetEmail] = useState<string>('');
  const [password, SetPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const sign_up = async () => {

  }

  return <>

    <div className="w-full min-h-min justify-center align-middle flex pb-64 pt-24">
      <Card className="w-[650px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in to CloudeIDE</CardTitle>
          <div className="w-full justify-center flex">
            <div className="w-56 justify-middle agine-centre space-y-1">
              <Input onChange={(e) => SetEmail(e.target.value)} placeholder="Enter email" type="email" />
              <Input onChange={(e) => SetPassword(e.target.value)} placeholder="Enter password" type="password" />
              <Input onChange={(e) => setConfirmPassword(e.target.value)} placeholder="ReEnter password" type="password" />

              <div className="flex w-full">
                <Button onClick={sign_up} className="ml-20">Signup</Button>
              </div>
            </div>
          </div>
          <CardDescription className="text-center"> have an Account ? <a href="/signin">signin</a>
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  </>
}
