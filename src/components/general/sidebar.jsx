import { Link} from "react-router-dom";
import {
  PersonIcon,
  GearIcon,
  BarChartIcon,
  AvatarIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";

export default function Sidebar() {

  return (
    <div
      className="flex flex-col items-center justify-center w-full py-5 px-2 min-h-screen"
    >
      <nav className="px-2 py-5 flex justify-center flex-col w-full">
        <li className="list-none my-3 px-4 py-2 flex items-center text-white text-2xl">
          <span className="mx-2">
            <PersonIcon color="white" width={25} height={25} />
          </span>
          <Link to="/">All users</Link>
        </li>
        <li className="list-none my-3 px-4 py-2 flex items-center text-white text-2xl">
          <span className="mx-2">
            <AvatarIcon color="white" width={25} height={25} />
          </span>
          <Link to="/auth">Login</Link>
        </li>
        <li className="list-none my-3 px-4 py-2 flex items-center text-white text-2xl">
          <span className="mx-2">
            <InfoCircledIcon color="white" width={25} height={25} />
          </span>
          <Link to="#">About</Link>
        </li>
        <li className="list-none my-3 px-4 py-2 flex items-center text-white text-2xl">
          <span className="mx-2">
            <BarChartIcon color="white" width={25} height={25} />
          </span>
          <Link to="#">Stat</Link>
        </li>
        <li className="list-none my-3 px-4 py-2 flex items-center text-white text-2xl">
          <span className="mx-2">
            <GearIcon color="white" width={25} height={25} />
          </span>
          <Link to="#">Setting</Link>
        </li>
      </nav>
    </div>
  );
}
