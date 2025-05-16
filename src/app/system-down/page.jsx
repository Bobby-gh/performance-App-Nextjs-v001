import Link from "next/link";
import Image from "next/image";
import notAvailable from "../images/notAvailable.png";

export default function SystemDown() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <Image src={notAvailable} alt="not found" width={156} height={156} />
        <h1 className="text-8xl font-bold">500</h1>
        <p className="text-xl mt-4">
          Oops! System Down, Kindly Contact Admin or try logging into the Application Later!.
        </p>
        <Link href="/" className="text-blue-500 mt-4">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
