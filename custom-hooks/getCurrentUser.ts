import { useEffect,useState } from "react";
import { authClient } from "@/lib/client";

// Custom hook to get the current user
export function useGetCurrentUser(){
  const [user, setUser] = useState<Record<string,string|null> | null>(null);

  useEffect(() => {
    // Get login user;
    const userDetail =  async() => {
      const getUser = await authClient.getSession();
      setUser({
              userImage:getUser.data?.user.image ?? null,
              userName:getUser.data?.user.name ?? null
            });
    }

    userDetail();
  },[]);

  return user;
}