import { Button } from "@/components/ui/button";
import { myStore } from "@/store/zodstore";


export default function UserAuthError({error}: {error: string | null}){
   // Getting the currentUserSession and the setter from store
    const setAuthError = myStore(state => state.setAuthError);

  return(
    <div className="min-h-screen min-w-screen flex justify-center items-center absolute left-0 top-0 z-10 bg-black/70 backdrop-blur-xs">
      <div className="mb-80 bg-primary-gray/20 w-1/3 h-40 rounded-4xl flex flex-col gap-10 justify-center items-center p-3">
        <p className=" text-muted-foreground text-sm md:text-base font-mono">
          {error}
        </p>
        <Button onClick={() => setAuthError(null)} className="btn">Close</Button>
      </div>
    </div>
  )
}