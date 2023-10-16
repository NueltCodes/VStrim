import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { signIn, useSession } from "next-auth/react";
import { Logo } from "./icons/Logo";
import AnimateHome from "../../public/Home.json";
import AnimateLike from "../../public/Likes.json";
import AnimateHistory from "../../public/historyClock.json";
import AnimatePlayVideo from "../../public/Animation-play.json";
import AnimateLibrary from "../../public/video-libray.json";
import AnimateFollowing from "../../public/userFollow.json";
import AnimateHelp from "../../public/help.json";
import AnimateSettings from "../../public/Settings.json";

// Mobile Lottie export
import AnimateCamera from "../../public/mobileLottie/Camera.json";
import AnimateProfile from "../../public/mobileLottie/profile.json";
import AnimateFeedback from "../../public/mobileLottie/Feedback.json";
import Animateterms from "../../public/mobileLottie/terms&condition.json";
import AnimatePrivacy from "../../public/mobileLottie/Privacy.json";

import {
  FollowIcon,
  HistoryIcon,
  HomeIcon,
  LibraryIcon,
  LikeIcon,
  VideoIcon,
} from "../../public/DestopSidebarIcons/home";

import Link from "next/link";
import { useRouter } from "next/router";
import { UserImage } from "./Component";
import {
  AiOutlineLogout,
  AiOutlineSetting,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";
import { MdOutlinePrivacyTip, MdOutlineFeedback } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import Button from "./button/Button";
import Lottie from "lottie-react";
import { Photograph } from "public/mobileIcon/SidebarSvg";

interface NavigationItem {
  name: string;
  path?: string;
  icon: (className: string, index?: number) => JSX.Element;
  current: boolean;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface SidebarProps {
  isOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  closeSidebar?: boolean;
}

export default function Sidebar({
  isOpen,
  setSidebarOpen,
  closeSidebar,
}: SidebarProps) {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isSettings, setIsSettings] = useState<boolean>(false);
  const [ifhelp, setIfhelp] = useState<boolean>(false);
  const [ifPrivacy, setIfPrivacy] = useState<boolean>(false);
  const [ifTos, setIfTos] = useState<boolean>(false);

  const DesktopNavigation: NavigationItem[] = [
    {
      name: "Home",
      path: `/`,
      icon: (className: string, index?: number) =>
        hoveredIndex === index || router.asPath === `/` ? (
          <Lottie
            animationData={AnimateHome}
            loop
            autoplay
            style={{ height: 35, width: 35 }}
            className={className}
          />
        ) : (
          <HomeIcon className={className} />
        ),
      current: router.pathname === `/`,
    },
    {
      name: "Liked Videos",
      path: userId ? `/playLists/LikedVideos` : "sign-in",
      icon: (className: string, index?: number) =>
        hoveredIndex === index || router.asPath === `/playLists/LikedVideos` ? (
          <Lottie
            animationData={AnimateLike}
            loop
            autoplay
            style={{ height: 25, width: 25 }}
            className={className}
          />
        ) : (
          <LikeIcon className={className} />
        ),
      current: router.pathname === `/playLists/LikedVideos`,
    },
    {
      name: "History",
      path: userId ? `/playLists/HistoryPage` : "sign-in",
      icon: (className: string, index?: number) =>
        hoveredIndex === index ||
        router.pathname === `/playLists/HistoryPage` ? (
          <Lottie
            animationData={AnimateHistory}
            loop
            autoplay
            style={{ height: 25, width: 25 }}
            className={className}
          />
        ) : (
          <HistoryIcon className={className} />
        ),
      current: router.pathname === `/playLists/HistoryPage`,
    },
    {
      name: "Your Videos",
      path: userId ? `/${String(userId)}/ProfileVideos` : "sign-in",
      icon: (className: string, index?: number) =>
        hoveredIndex === index ||
        router.asPath === `/${String(userId)}/ProfileVideos` ? (
          <Lottie
            animationData={AnimatePlayVideo}
            loop
            autoplay
            style={{ height: 25, width: 25 }}
            className={className}
          />
        ) : (
          <VideoIcon className={className} />
        ),
      current: router.asPath === `/${String(userId)}/ProfileVideos`,
    },
    {
      name: "Library",
      path: userId ? `/${String(userId)}/ProfilePlaylist` : "sign-in",
      icon: (className: string, index?: number) =>
        hoveredIndex === index ||
        router.asPath === `/${String(userId)}/ProfilePlaylist` ? (
          <Lottie
            animationData={AnimateLibrary}
            loop
            autoplay
            style={{ height: 25, width: 25 }}
            className={className}
          />
        ) : (
          <LibraryIcon className={className} />
        ),
      current: router.asPath === `/${String(userId)}/ProfilePlaylist`,
    },
    {
      name: "Following",
      path: userId ? `/${String(userId)}/ProfileFollowing` : "sign-in",
      icon: (className: string, index?: number) =>
        hoveredIndex === index ||
        router.asPath === `/${String(userId)}/ProfileFollowing` ? (
          <Lottie
            animationData={AnimateFollowing}
            loop
            autoplay
            style={{ height: 25, width: 25 }}
            className={className}
          />
        ) : (
          <FollowIcon className={className} />
        ),
      current: router.asPath === `/${String(userId)}/ProfileFollowing`,
    },
  ];
  const SignedInMobileNavigation: NavigationItem[] = [
    {
      name: "Profile",
      path: `/${String(userId)}/ProfileVideos`,
      icon: (className: string, index?: number) =>
        hoveredIndex === index ||
        router.asPath === `/${String(userId)}/ProfileVideos` ? (
          <Lottie
            animationData={AnimateProfile}
            loop
            autoplay
            style={{ height: 25, width: 25 }}
            className={className}
          />
        ) : (
          <FaRegUserCircle className={className} />
        ),
      current: router.asPath === `/${String(userId)}/ProfileVideos`,
    },
    {
      name: "Creator Studio",
      path: `/Dashboard`,
      icon: (className: string, index?: number) =>
        hoveredIndex === index || router.pathname === `/Dashboard` ? (
          <Lottie
            animationData={AnimateCamera}
            loop
            autoplay
            style={{ height: 25, width: 25 }}
            className={className}
          />
        ) : (
          <Photograph className={className} />
        ),
      current: router.pathname === `/Dashboard`,
    },
    {
      name: "Help",
      path: `/Blog/Help`,
      icon: (className: string, index?: number) =>
        hoveredIndex === index || router.asPath === `/Blog/Help` ? (
          <Lottie
            animationData={AnimateHelp}
            loop
            autoplay
            style={{ height: 25, width: 25 }}
            className={className}
          />
        ) : (
          <FiHelpCircle className={className} />
        ),
      current: router.pathname === `/Blog/Help`,
    },
    {
      name: "Settings",
      path: `/Settings`,
      icon: (className: string, index?: number) =>
        hoveredIndex === index || router.pathname === `/Settings` ? (
          <Lottie
            animationData={AnimateSettings}
            loop
            autoplay
            style={{ height: 25, width: 25 }}
          />
        ) : (
          <AiOutlineSetting className={className} />
        ),

      current: router.pathname === `/Settings`,
    },
    {
      name: "Feedback",
      path: `mailto:olaniranemmanuet@gmail.com`,
      icon: (className: string, index?: number) =>
        hoveredIndex === index ||
        router.pathname === `mailto:olaniranemmanuet@gmail.com` ? (
          <Lottie
            animationData={AnimateFeedback}
            loop
            autoplay
            style={{ height: 30, width: 25 }}
          />
        ) : (
          <MdOutlineFeedback className={className} />
        ),
      current: router.pathname === `/Feedback`,
    },
  ];
  const SignedOutMobileNavigation: NavigationItem[] = [
    {
      name: "Help",
      path: `/Blog/Help`,
      icon: (className: string, index?: number) =>
        hoveredIndex === index || router.asPath === `/Blog/Help` ? (
          <Lottie
            animationData={AnimateHelp}
            loop
            autoplay
            style={{ height: 25, width: 25 }}
            className={className}
          />
        ) : (
          <FiHelpCircle className={className} />
        ),
      current: router.pathname === `/Blog/Help`,
    },

    {
      name: "Feedback",
      path: `mailto:olaniranemmanuet@gmail.com`,
      icon: (className: string, index?: number) =>
        hoveredIndex === index ||
        router.pathname === `mailto:olaniranemmanuet@gmail.com` ? (
          <Lottie
            animationData={AnimateFeedback}
            loop
            autoplay
            style={{ height: 30, width: 25 }}
          />
        ) : (
          <MdOutlineFeedback className={className} />
        ),
      current: router.pathname === `/Feedback`,
    },
  ];

  const mobileNavigation = sessionData
    ? SignedInMobileNavigation
    : SignedOutMobileNavigation;

  useEffect(() => {
    DesktopNavigation.forEach((nav) => {
      nav.current = nav.path === router.pathname;
    });
    mobileNavigation.forEach((nav) => {
      nav.current = nav.path === router.pathname;
    });
  }, [router.pathname]);

  return (
    <>
      {/* sidebar for desktop */}
      <div
        className={classNames(
          closeSidebar ? "lg:w-20" : "lg:w-56",
          "bottom-0 top-16  hidden lg:fixed lg:z-40 lg:flex lg:flex-col",
        )}
      >
        {/*  Sidebar component FOR DESKTOP*/}

        <div className="flex grow flex-col gap-y-5 overflow-y-auto border border-gray-200 bg-white px-6 pb-4">
          <nav className="flex flex-1 flex-col pt-8">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1 ">
                  {DesktopNavigation.map((item, index) => (
                    <li key={item.name}>
                      <Link
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        href={item.path ?? "/"}
                        onClick={(e) => {
                          e.preventDefault();
                          if (item.path === "sign-in") {
                            void signIn();
                          } else {
                            void router.push(item.path ?? "/");
                          }
                        }}
                        className={classNames(
                          item.current
                            ? " bg-slate-100 text-primary-600"
                            : " text-gray-700 hover:bg-slate-100 hover:text-[#54429f]",
                          "group flex h-[50px] items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition duration-300 ease-in-out",
                        )}
                      >
                        {item.current
                          ? item.icon(
                              "h-5 w-5 shrink-0 stroke-primary-600",
                              index,
                            )
                          : item.icon(
                              "h-5 w-5 shrink-0 stroke-gray-500 group-hover:stroke-primary-600",
                              index,
                            )}
                        <p className={classNames(closeSidebar ? "hidden" : "")}>
                          {item.name}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="mt-auto">
                <Link
                  onMouseEnter={() => setIsSettings(true)}
                  onMouseLeave={() => setIsSettings(false)}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    {
                      sessionData
                        ? void router.push("/Settings")
                        : void signIn();
                    }
                  }}
                  className={` ${
                    router.pathname === "/Settings"
                      ? " bg-slate-100 text-primary-600"
                      : " text-gray-700 hover:bg-slate-100 hover:text-[#54429f]"
                  } group -mx-2 mb-1 flex h-[50px] items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 transition duration-300 ease-in-out hover:bg-slate-100 hover:text-[#54429f]`}
                >
                  {isSettings || router.pathname === `/Settings` ? (
                    <Lottie
                      animationData={AnimateSettings}
                      loop
                      autoplay
                      style={{ height: 25, width: 25 }}
                    />
                  ) : (
                    <AiOutlineSetting
                      className={
                        "h-[25px] w-[25px] shrink-0 stroke-gray-500 group-hover:text-[#54429f]"
                      }
                    />
                  )}
                  <p className={classNames(closeSidebar ? "hidden" : "")}>
                    Settings
                  </p>
                </Link>
                <Link
                  onMouseEnter={() => setIfhelp(true)}
                  onMouseLeave={() => setIfhelp(false)}
                  href="/Blog/Help"
                  className={` ${
                    router.pathname === "/Blog/Help"
                      ? " bg-slate-100 text-primary-600"
                      : " text-gray-700 hover:bg-slate-100 hover:text-[#54429f]"
                  } group  -mx-2 flex h-[50px] items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 transition duration-300 ease-in-out hover:bg-slate-100 hover:text-[#54429f]`}
                >
                  {ifhelp || router.pathname === `/Blog/Help` ? (
                    <Lottie
                      animationData={AnimateHelp}
                      loop
                      autoplay
                      style={{ height: 25, width: 25 }}
                    />
                  ) : (
                    <FiHelpCircle
                      className={
                        "h-[25px] w-[25px] shrink-0 stroke-gray-500 group-hover:text-[#54429f]"
                      }
                    />
                  )}

                  <p className={classNames(closeSidebar ? "hidden" : "")}>
                    Help
                  </p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/*  sidebar for Mobile Animation */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex w-[75%]">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="z-50 -m-2.5 p-2.5"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>

                    <AiOutlineCloseCircle
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                {/* Sidebar component FOR MOBILE,*/}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r  border-gray-200 bg-white px-4 pb-4">
                  <nav className="flex flex-1 flex-col pt-4">
                    <ul role="list" className="flex flex-1 flex-col gap-y-4">
                      <Link href="/" aria-label="Home">
                        <div className="flex items-center justify-center gap-1 font-bold">
                          <Logo />
                          <span className="text-[13px] text-gray-700 sm:text-[15px]">
                            Vstrim
                          </span>
                        </div>
                      </Link>{" "}
                      <li className="border-t">
                        <ul role="list" className="-mx-2 space-y-1 pt-3 ">
                          {mobileNavigation.map((item, index) => (
                            <li key={item.name}>
                              <Link
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                href={item.path ?? "/"}
                                onClick={(e) => {
                                  e.preventDefault();
                                  void router.push(item.path ?? "/");
                                }}
                                className={classNames(
                                  item.current
                                    ? " bg-slate-100 text-primary-600"
                                    : " text-gray-700 hover:bg-slate-100 hover:text-[#54429f]",
                                  "group flex h-[50px] items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition duration-300 ease-in-out",
                                )}
                              >
                                {item.current
                                  ? item.icon(
                                      "h-[25px] w-[25px] shrink-0 stroke-[#9147ff]",
                                      index,
                                    )
                                  : item.icon(
                                      "h-[25px] w-[25px] shrink-0  stroke-gray-500  group-hover:stroke-[#54429f]",
                                      index,
                                    )}
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="mt-auto border-y ">
                        <Link
                          onMouseEnter={() => setIfPrivacy(true)}
                          onMouseLeave={() => setIfPrivacy(false)}
                          href="/Blog/Privacy"
                          className={` ${
                            router.pathname === "/Blog/Privacy"
                              ? " bg-slate-100 text-primary-600"
                              : " text-gray-700 hover:bg-slate-100 hover:text-[#54429f]"
                          } group  -mx-2 flex h-[50px] items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 transition duration-300 ease-in-out hover:bg-slate-100 hover:text-[#54429f]`}
                        >
                          {ifPrivacy || router.pathname === `/Blog/Privacy` ? (
                            <Lottie
                              animationData={AnimatePrivacy}
                              loop
                              autoplay
                              style={{ height: 25, width: 25 }}
                            />
                          ) : (
                            <MdOutlinePrivacyTip
                              className={
                                "h-[25px] w-[25px] shrink-0 stroke-gray-500 group-hover:text-[#54429f]"
                              }
                            />
                          )}
                          Privacy
                        </Link>
                        <Link
                          onMouseEnter={() => setIfTos(true)}
                          onMouseLeave={() => setIfTos(false)}
                          href="/Blog/TOS"
                          className={` ${
                            router.pathname === "/Blog/TOS"
                              ? " bg-slate-100 text-primary-600"
                              : " text-gray-700 hover:bg-slate-100 hover:text-[#54429f]"
                          } group  -mx-2 flex h-[50px] items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 transition duration-300 ease-in-out hover:bg-slate-100 hover:text-[#54429f]`}
                        >
                          {ifTos || router.pathname === `/Blog/TOS` ? (
                            <Lottie
                              animationData={Animateterms}
                              loop
                              autoplay
                              style={{ height: 25, width: 25 }}
                            />
                          ) : (
                            <CgFileDocument
                              className={
                                "h-[25px] w-[25px] shrink-0 stroke-gray-500 group-hover:text-[#54429f]"
                              }
                            />
                          )}
                          Terms of Service
                        </Link>
                      </li>
                      {sessionData ? (
                        <div className="my-2 flex">
                          <div>
                            <UserImage image={sessionData?.user.image ?? ""} />
                          </div>
                          <div className="ml-2 flex w-full flex-col  justify-start truncate text-sm ">
                            <p className="font-semibold text-gray-700">
                              {sessionData && (
                                <span>{sessionData.user?.name}</span>
                              )}
                            </p>
                            <p className=" text-gray-600">
                              {sessionData && (
                                <span>{sessionData.user?.email}</span>
                              )}
                            </p>
                          </div>
                          <Button variant="tertiary-gray" href="#" size="lg">
                            <AiOutlineLogout className="w-5 stroke-gray-600" />
                          </Button>
                        </div>
                      ) : (
                        <li className="space-y-2">
                          <Button
                            variant="primary"
                            size="2xl"
                            className="w-full"
                            onClick={(e) => {
                              e.preventDefault();
                              {
                                void signIn();
                              }
                            }}
                          >
                            {" "}
                            Sign Up
                          </Button>
                          <Button
                            variant="secondary-gray"
                            size="2xl"
                            className="w-full"
                            onClick={(e) => {
                              e.preventDefault();
                              {
                                void signIn();
                              }
                            }}
                          >
                            {" "}
                            Log In
                          </Button>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
