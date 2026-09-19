import { useEffect,useState } from "react";
import { authClient } from "@/lib/client";

// Custom hook to get the current user
export function useGetCurrentUser(){
  const [username, setUsername] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Get login user;
    const userDetail =  async() => {
      const getUser = await authClient.getSession();
      setUsername(getUser.data?.user.name);
    }

    userDetail();
  },[]);

  return {username};
}