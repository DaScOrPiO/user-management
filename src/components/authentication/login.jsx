export default function Login() {
  return (
    <div className="w-full py-2 px-2 h-auto flex justify-center flex-col">
      <h1 className="text-slate-700 font-bold text-center text-2xl">
        Login using your orgainsation&apos;s account
      </h1>
      <form action="#" className="py-4">
        <div className="w-full">
          <div className="mt-6 w-full flex flex-col items-center">
            <input
              type="email"
              className="w-full py-2 outline-none border-none focus:outline focus:outline-slate-700 px-2 rounded-md"
              placeholder="organisation's email"
            />
          </div>
          <div className="mt-6 w-full flex flex-col items-center">
            <input
              type="password"
              className="w-full py-2 outline-none border-none focus:outline focus:outline-slate-700 px-2 rounded-md"
              placeholder="password"
            />
          </div>

          <div className="mt-4 flex justify-center w-full">
            <button className="bg-slate-700 px-5 py-3 rounded-lg text-white">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
