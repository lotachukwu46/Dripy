import Link from "next/link";

const page = () => {
  return (
    <div>
      <Link href="/login" className="text-blue-600 hover:text-blue-500">
        Create an account
      </Link>
    </div>
  );
};

export default page;
