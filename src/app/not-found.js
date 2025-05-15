
import Link from 'next/link'
import Image from "next/image";
import Cookies from "js-cookie";
import notAvailable from "./images/notAvailable.png";

export default function NotFound() {
    const Auth = Cookies.get("token");
  return (
    <div>
        <div className="flex flex-col items-center justify-center h-screen">
        <Image
          src={notAvailable}
          alt="not found"
          width={156}
          height={156}
        />
            <h1 className="text-8xl font-bold">404</h1>
            <p className="text-xl mt-4">Oops! The page you are looking for does not exist.</p>
            {Auth? (<Link href="/customs-uk" className='text-blue-500 mt-4'>Go back to Home</Link>): (<Link href="/" className='text-blue-500 mt-4'>Go back to Home</Link>)}
        </div>
    </div>
  )
}