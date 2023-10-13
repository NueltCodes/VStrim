import Link from "next/link";
import { Logo } from "./icons/Logo";
import {
  type ChangeEvent,
  Fragment,
  type KeyboardEvent,
  useState,
} from "react";
import { useRouter } from "next/router";
import { LiaSearchSolid } from "react-icons/lia";

import {
  MdSlowMotionVideo,
  MdOutlinePrivacyTip,
  MdOutlineFeedback,
} from "react-icons/md";
import { AiOutlineLogout, AiOutlineSetting } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { UserImage } from "./Component";
import { Menu, Transition } from "@headlessui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./button/Button";
import { type Videos } from "~/types";
import Lottie from "lottie-react";
import AnimatePlayVideo from "../../public/Animation-play.json";
import { FaRegUserCircle } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
interface NavbarProps {
  children?: JSX.Element;
  searchInput?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

interface NavigationItem {
  icon: (className: string) => JSX.Element;
  name: string;
  path: string;
  lineAbove: boolean;
}

// Navigation
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({
  children,
  handleChange,
  searchInput,
}: NavbarProps) {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id;
  const [searchData, setSearchData] = useState<Videos[]>([]);

  const signedInNavigation: NavigationItem[] = [
    {
      icon: (className) => <FaRegUserCircle className={className} />,
      name: "View Profile",
      path: `/${String(userId)}/ProfileVideos`,
      lineAbove: true,
    },
    {
      icon: (className) => <MdSlowMotionVideo className={className} />,
      name: "Creator Studio",
      path: "/Dashboard",
      lineAbove: false,
    },
    {
      icon: (className) => <FiHelpCircle className={className} />,
      name: "Help",
      path: "/Blog/Help",
      lineAbove: true,
    },
    {
      icon: (className) => <AiOutlineSetting className={className} />,
      name: "Settings",
      path: "/Settings",
      lineAbove: false,
    },
    {
      icon: (className) => <MdOutlineFeedback className={className} />,
      name: "Feedback",
      path: "#",
      lineAbove: false,
    },
    {
      icon: (className) => <CgFileDocument className={className} />,
      name: "Terms of Service",
      path: "/Blog/TOS",
      lineAbove: true,
    },
    {
      icon: (className) => <MdOutlinePrivacyTip className={className} />,
      name: "Privacy",
      path: "/Blog/Privacy",
      lineAbove: false,
    },
    {
      icon: (className) => <AiOutlineLogout className={className} />,
      name: "Log Out",
      path: "sign-out",
      lineAbove: true,
    },
  ];

  const signedOutNavigation: NavigationItem[] = [
    {
      icon: (className) => <FiHelpCircle className={className} />,
      name: "Help",
      path: "/Blog/Help",
      lineAbove: true,
    },
    {
      icon: (className) => <MdOutlineFeedback className={className} />,
      name: "Feedback",
      path: `mailto:vidchill@vidchill.com`,
      lineAbove: false,
    },
    {
      icon: (className) => <CgFileDocument className={className} />,
      name: "Terms of Service",
      path: "/Blog/TOS",
      lineAbove: true,
    },
    {
      icon: (className) => <MdOutlinePrivacyTip className={className} />,
      name: "Privacy",
      path: "/Blog/Privacy",
      lineAbove: false,
    },
  ];

  const Navigation = sessionData ? signedInNavigation : signedOutNavigation;

  const router = useRouter();

  // const { data, isLoading, error } = api.video.getRandomVideos.useQuery(40);

  const handleSearchClick = async () => {
    if (router.pathname !== "/SearchPage") {
      await router.push("/SearchPage");
    }
  };

  // // };

  // const handleSearch = async () => {
  //   try {
  //     await router.push({
  //       pathname: "/SearchPage",
  //       query: { q: searchInput },
  //     });
  //   } catch (error) {
  //     console.error("Error navigating to search page:", error);
  //   }
  // };

  // const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  //   router.push({
  //     pathname: "/SearchPage",
  //   });
  // };

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     if (searchInput.trim() !== '') {
  //       void handleSearch();
  //     }
  //   }, 300); // Adjust the delay as needed

  //   return () => clearTimeout(timeout);
  // }, [searchInput]);

  return (
    <>
      <div className=" fixed z-50 w-full border border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-full px-6 lg:px-16 xl:grid xl:grid-cols-12">
          <div className="flex flex-shrink-0 items-center lg:static xl:col-span-2">
            <Link href="/#" aria-label="Home">
              <div className="flex items-center justify-center gap-1 font-bold">
                <Lottie
                  animationData={AnimatePlayVideo}
                  loop
                  autoplay
                  style={{ height: 25, width: 25 }}
                />
                <span className="text-[13px] text-gray-700 sm:text-[15px]">
                  Vstrim
                </span>
              </div>
              {/* <Logo className=" w-16" /> */}
            </Link>
          </div>
          <div className="w-full min-w-0 flex-1 lg:px-0 xl:col-span-8">
            {/*  */}
            <div className=" g:mx-0 flex items-center px-6 py-4 lg:max-w-none xl:mx-0 xl:px-0">
              <div className="w-full">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <LiaSearchSolid className="h-5 w-5 stroke-gray-400" />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline focus:outline-[3px] focus:outline-[#9147ff] sm:text-sm sm:leading-6 "
                    placeholder="Search"
                    type="search"
                    onChange={handleChange}
                    onClick={() => void handleSearchClick()}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center lg:hidden">
            {/* Mobile menu button */}
            {children}
          </div>
          <div className="m-0 hidden w-max px-0 lg:flex lg:items-center lg:justify-end xl:col-span-2">
            <Menu as="div" className="relative ml-5 flex-shrink-0">
              <div>
                <Menu.Button className="flex rounded-full focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2">
                  {sessionData ? (
                    <UserImage image={sessionData?.user.image ?? ""} />
                  ) : (
                    <BsThreeDotsVertical className="w-5 stroke-gray-700 " />
                  )}
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {sessionData ? (
                    <div className="mx-4 my-2 flex ">
                      <div>
                        <UserImage image={sessionData?.user.image ?? ""} />
                      </div>
                      <div className="ml-2 flex w-full flex-col justify-start truncate ">
                        <p className="truncate text-sm font-semibold text-gray-700">
                          {sessionData && <span>{sessionData.user?.name}</span>}
                        </p>
                        <p className=" truncate text-sm text-gray-600">
                          {sessionData && (
                            <span className="">{sessionData.user?.email}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="mx-4 my-2 flex text-center text-sm font-semibold text-gray-700 ">
                      Menu
                    </p>
                  )}
                  {Navigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <Link
                          onClick={(e) => {
                            e.preventDefault();
                            if (item.path === "sign-out") {
                              void signOut();
                            } else {
                              void router.push(item.path || "/");
                            }
                          }}
                          href={item.path || "/"}
                          className={classNames(
                            active ? "bg-slate-100 text-primary-600 " : "",
                            "block px-4 py-2 text-sm text-gray-700",
                            item.lineAbove ? "border-t border-gray-200" : "",
                          )}
                        >
                          <div className="flex items-center ">
                            {item.icon("h-4 w-4 stroke-gray-700")}
                            <div className="pl-2">{item.name}</div>
                          </div>
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
            {/*Sign up login buttons*/}
            {sessionData ? (
              ""
            ) : (
              <div className="flex flex-row space-x-3 ">
                <Button
                  variant="tertiary-gray"
                  size="md"
                  onClick={!sessionData ? () => void signIn() : () => ""}
                >
                  Log in
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={!sessionData ? () => void signIn() : () => ""}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
