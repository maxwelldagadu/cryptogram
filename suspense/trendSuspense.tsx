import { Skeleton } from "@/components/ui/skeleton";


export default function TrendSuspense() {
  return (
    <div className="w-full p-2 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-5">
      {Array.from({length:4},(_,index) => (
        <div key={index} className="w-full rounded-2xl flex flex-col justify-between items-center gap-4 p-2 
            hover:cursor-pointer transition-transform hover:-translate-y-2 duration-400">
          <div className="flex justify-between items-center gap-5 w-full">
            <div className="relative rounded-full size-8 md:size-10 flex items-center justify-center shrink-0">
              <Skeleton className="h-full w-full rounded-full"/>
            </div>
            <div className="flex flex-col justify-center items-start gap-2">
              <Skeleton className="h-2 w-15"/>
              <Skeleton className="h-2 w-15"/>
            </div>
            <div className={"size-7 md:size-10 shrink-0 rounded-full flex justify-center items-center"}>
              <Skeleton className="h-full w-full rounded-full"/>
            </div>
          </div>
    
          <div className="w-full flex justify-between items-center">
            <div className="h-full w-full flex flex-col justify-between items-start font-mono gap-2">
              <Skeleton className="h-2 w-2/3"/>
              <Skeleton className="h-2 w-1/3"/>
            </div>
            <div className="relative h-12 w-full">
              <Skeleton className="h-full w-full"/>
            </div>
          </div>
        </div>
      ))}
    </div> 
  )
}
