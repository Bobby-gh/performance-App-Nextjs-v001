import Link from "next/link";
import Image from "next/image";
import notAvailable from "../images/notAvailable.png";

export default function NotAuthorized() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <Image src={notAvailable} alt="not found" width={156} height={156} />
        <h1 className="text-8xl font-bold">401</h1>
        <p className="text-xl mt-4">
          Oops! It looks like you have no Authorization, Kindly Login!.
        </p>
        <Link href="/" className="text-blue-500 mt-4">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
