import { userAtom } from "@/states/atoms";
import { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

export const AuthProvider = ({ children }: {
  children: ReactNode
}) => {
  const navigator = useNavigate();
  const user = useRecoilValue(userAtom);
  console.log('user--', user)
  useEffect(() => {
    if (!user || !user.isLoggedin) {
      navigator('/signin')
    }

  })
  return <>
    {children}
  </>
}
