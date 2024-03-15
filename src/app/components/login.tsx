import Link from "next/link";

export default async function Login() {


    return (
        <div className="relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover">
            <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
                <div className="text-center">
                    <h2 className="mt-5 text-3xl font-bold text-gray-900">
                        Login to Upload a Recipe!
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">Welcome to UrRecipe. Where you can share your favorite recipes and meals that define who you are.</p>
                </div>
                <div>
                    <Link href={'/api/auth/signin'}>
                    <button  className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                        font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                        Login
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}