import Link from "next/link";


export default function AuthToggle() {
  return (
    <div  className="w-100 lg:w-200 flex justify-end items-center rounded-4xl">
      <div className="flex justify-end items-center gap-2 w-full font-mono font-medium">
        <Link href="/signin" className="btn">
          SignIn
        </Link>
        <Link href="/signup" className="btn">
          SignUp
        </Link>
      </div>
    </div>
  )
}
