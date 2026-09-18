import { Button } from "@/components/ui/button";
import { myStore } from "@/store/zodstore";


export default function UserAuthError({error}: {error: string | null}){
   // Getting the currentUserSession and the setter from store
    const setAuthError = myStore(state => state.setAuthError);

  return(
    <div className="autherror_container">
      <div className="autherror_container-error">
        <p className=" text-muted-foreground text-sm md:text-base font-mono">
          {error}
        </p>
        <Button onClick={() => setAuthError(null)} className="btn">Close</Button>
      </div>
    </div>
  )
}