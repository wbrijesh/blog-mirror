import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold mb-3">Weblog</h1>
        <p>Hi, I am Brijesh, student and web developer</p>
        <div className="flex flex-wrap gap-1.5">
          <p>If you are looking for my projects and got here accidentally, please visit</p>
          <Link href="https://brijesh.dev" className="flex items-center gap-1 hover:text-orange-600 bg-gray-100 hover:bg-orange-50 border border-gray-300 px-1.5 py-0.5 rounded-md">
            <ArrowUpRightIcon height={14} fill="gray" />
            <p>this site</p>
          </Link>
        </div>
        <div>
          <p>I am planning on writing blog posts consistently on this site, and am currently buildig this site</p>
          <p>Please check back after a few days, hopefully there will more than just some HTML here</p>
        </div>
        <p>20 April</p>
      </div>
    </>
  )
}

export default Home;
