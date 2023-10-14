import { Dialog, Transition } from "@headlessui/react";
import {
  Facebook,
  Linkedin,
  Twitter,
  WhatsApp,
} from "public/social-icons/Socials";
import React, { Fragment } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { MdCopyAll } from "react-icons/md";
import { PiShareFatLight } from "react-icons/pi";

export default function ShareBtn({
  videoId,
  ifShare,
  setIfShare,
}: {
  videoId: string;
  ifShare?: boolean;
  setIfShare?: (ifShare: boolean) => void;
}) {
  const closeShareOption = () => {
    if (setIfShare) {
      setIfShare(false);
    }
  };

  const videoUrl = "https://v-strim.vercel.app/video/" + videoId;

  const onCopy = () => {
    void navigator.clipboard.writeText(videoUrl);
    toast.success("video url copied to clipboard.");
  };

  return (
    <div>
      <button
        className="group flex w-full items-center rounded-md border px-2 py-2 text-sm shadow-sm ring-1 ring-inset ring-gray-300"
        onClick={() => setIfShare && setIfShare(true)}
      >
        <PiShareFatLight className="mr-2 h-5 w-5" aria-hidden="true" />
        Share
      </button>

      <Transition.Root show={ifShare} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeShareOption}>
          {" "}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-100"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className=" relative m-2 flex !max-w-xs transform flex-col items-start justify-start overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-center shadow-xl transition-all sm:my-8 sm:w-full sm:p-6">
                  <div className="absolute right-0 top-0  hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      onClick={closeShareOption}
                    >
                      <span className="sr-only">Close </span>
                      <IoMdClose className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mb-2 mt-5 text-center sm:mt-0">
                    <Dialog.Title
                      as="h3"
                      className=" text-base font-semibold leading-6 text-gray-900"
                    >
                      Share video to your Socials?
                    </Dialog.Title>
                  </div>

                  <div className="mt-5 flex w-full flex-col gap-2 text-left">
                    <div>
                      <button
                        className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-slate-200"
                        onClick={() => {
                          const videoUrl =
                            "https://v-strim.vercel.app/video/" + videoId;
                          const text = encodeURIComponent(
                            `Check out this video: ${videoUrl}`,
                          );
                          const whatsappUrl = `https://wa.me/?text=${text}`;
                          window.open(whatsappUrl, "_blank");
                        }}
                      >
                        <WhatsApp className="mr-2 h-5 w-5" aria-hidden="true" />
                        WhatsApp
                      </button>
                      <button
                        className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-slate-200"
                        onClick={() => {
                          const videoUrl =
                            "https://v-strim.vercel.app/video/" + videoId;
                          const text = encodeURIComponent(
                            `Check out this video: ${videoUrl}`,
                          );
                          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                            "Check out this video: " + videoUrl,
                          )}`;
                          window.open(twitterUrl, "_blank");
                        }}
                      >
                        <Twitter className="mr-2 h-5 w-5" aria-hidden="true" />
                        Twitter
                      </button>
                      <button
                        className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-slate-200"
                        onClick={() => {
                          const videoUrl =
                            "https://v-strim.vercel.app/video/" + videoId;
                          const text = encodeURIComponent(
                            `Check out this video: ${videoUrl}`,
                          );
                          const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            videoUrl,
                          )}`;
                          window.open(facebookUrl, "_blank");
                        }}
                      >
                        <Facebook className="mr-2 h-5 w-5" aria-hidden="true" />
                        Facebook
                      </button>
                      <button
                        className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-slate-200"
                        onClick={() => {
                          const videoUrl =
                            "https://v-strim.vercel.app/video/" + videoId;
                          const text = encodeURIComponent(
                            `Check out this video: ${videoUrl}`,
                          );
                          const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                            videoUrl,
                          )}`;
                          window.open(linkedinUrl, "_blank");
                        }}
                      >
                        <Linkedin className="mr-2 h-5 w-5" aria-hidden="true" />
                        Linkedin
                      </button>

                      <div
                        onClick={() => {
                          onCopy();
                        }}
                        className="flex w-full cursor-pointer items-center gap-3 rounded-md bg-slate-100 px-1"
                      >
                        <div className="w-[100%] whitespace-nowrap">
                          {videoUrl}
                        </div>
                        <MdCopyAll className="h-8 w-8" />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
