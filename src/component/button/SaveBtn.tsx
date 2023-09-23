import { Fragment } from "react";
import Button from "./Button";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { Dialog, Transition } from "@headlessui/react";

export default function SaveBtn({ videoId }: { videoId: string }) {
  const { data: sessionData } = useSession();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        variant="secondary-gray"
        size="2xl"
        onClick={sessionData ? () => setOpen(true) : () => void signOut()}
      >
        <AiOutlineSave /> Save
      </Button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
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
                      onClick={() => setOpen(false)}
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
                      Save Video To Playlist
                    </Dialog.Title>
                  </div>

                  {/* 9 End */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
