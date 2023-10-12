import { api } from "~/utils/api";
import moment from "moment";
import { Fragment, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { UserImage } from "./Component";
import Button from "./button/Button";
import { FaPaperPlane, FaRegCommentDots } from "react-icons/fa";

import { type CommentParams, type UserCommentParams } from "~/types";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-hot-toast";

interface Comment {
  comment: CommentParams;
  user: UserCommentParams;
}

interface CommentProps {
  videoId: string;
  comments: Comment[];
  refetch: () => Promise<unknown>;
}

export default function Comment({ videoId, comments, refetch }: CommentProps) {
  const [commentInput, setCommentInput] = useState("");
  const addCommentMutation = api.comment.addComment.useMutation();
  const [open, setOpen] = useState<boolean>(false);

  const { data: sessionData } = useSession();

  if (!videoId) {
    return <div>Loading...</div>;
  }

  const addComment = (input: {
    videoId: string;
    userId: string;
    message: string;
  }) => {
    addCommentMutation.mutate(input, {
      onSuccess: () => {
        void refetch();
        setCommentInput("");
      },
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentInput && commentInput.length >= 3) {
      addComment({
        videoId: videoId,
        userId: sessionData ? sessionData.user.id : ("none" as string),
        message: commentInput,
      });
    } else {
      toast.error("Oops! Your comment must contain at least 3 words.");
    }
  };

  return (
    <>
      <div className="py-5 ">
        <div className="flex space-x-3 rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="min-w-0 flex-1 space-y-3">
            <button
              className="group flex w-auto cursor-pointer items-center gap-2 text-sm font-bold leading-6 text-gray-500 lg:hidden"
              onClick={() => setOpen(true)}
            >
              {comments.length}
              <span>
                {" "}
                <FaRegCommentDots className="h-5 w-5 text-primary-600 opacity-90 transition-all duration-200 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-70" />
              </span>
            </button>

            <button className="group hidden w-auto cursor-pointer items-center gap-2 text-sm font-bold leading-6 text-gray-500 lg:flex">
              {comments.length}
              <span>
                {" "}
                <FaRegCommentDots className="h-5 w-5 text-primary-600 opacity-90 transition-all duration-200 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-70" />
              </span>
            </button>

            {sessionData ? (
              <form onSubmit={handleCommentSubmit}>
                <div className="mt-2 flex  gap-2">
                  <div className="w-full">
                    <textarea
                      rows={1}
                      name="comment"
                      id="comment"
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      className="block w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      placeholder="Add A Comment"
                    />
                  </div>
                  <div className="group flex-shrink-0">
                    <Button variant="primary" size="xl" type="submit">
                      <FaPaperPlane className="text-xs opacity-90 transition-all duration-200 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-70" />
                    </Button>
                  </div>
                </div>
              </form>
            ) : (
              <button
                onClick={!sessionData ? () => void signIn() : () => ""}
                className="align block w-full rounded-md border-0 p-4 py-1.5 text-left text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
              >
                Add A Comment
              </button>
            )}
            <div className="block cursor-pointer lg:hidden">
              {comments
                .sort(
                  (a, b) =>
                    new Date(b.comment.createdAt).getTime() -
                    new Date(a.comment.createdAt).getTime(),
                )
                .slice(0, 1)
                .map(({ user, comment }) => (
                  <div
                    className="w-full"
                    key={comment.id}
                    onClick={() => setOpen(true)}
                  >
                    <div className="my-5 border-t border-gray-300" />
                    <div className="flex gap-2">
                      <div>
                        <UserImage image={user.image ?? ""} />
                      </div>
                      <div className="flex w-full flex-col text-sm ">
                        <div className="flex flex-col ">
                          <div className="flex flex-wrap items-center gap-2  ">
                            <p className="w-max font-semibold leading-6 text-gray-700">
                              {user.handle}
                            </p>
                            <p className="text-gray-500">●</p>
                            <p className=" font-semibold text-gray-600">
                              {(() => {
                                let timeAgo = moment(
                                  comment.createdAt,
                                ).fromNow();
                                timeAgo = timeAgo.replace("months", "mons");
                                timeAgo = timeAgo.replace("month", "mon");
                                timeAgo = timeAgo.replace("years", "yrs");
                                timeAgo = timeAgo.replace("year", "yr");
                                return timeAgo;
                              })()}
                            </p>
                          </div>
                          {/* <p className="text-gray-600">
                                      {user.handle}
                                    </p> */}
                        </div>
                        <p className="mt-1 line-clamp-2 w-full text-sm font-bold text-gray-600">
                          {comment.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <Transition.Root show={open && comments.length > 0} as={Fragment}>
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

                <div className="fixed left-0 right-0 top-[30%]  z-10 overflow-y-auto">
                  <div className="flex min-h-full items-end justify-center  text-center sm:items-center sm:p-0">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-100"
                      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      enterTo="opacity-100 translate-y-0 sm:scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                      <Dialog.Panel className="block h-[70vh] w-screen overflow-y-scroll bg-slate-100 p-2 lg:hidden">
                        {comments
                          .sort(
                            (a, b) =>
                              new Date(b.comment.createdAt).getTime() -
                              new Date(a.comment.createdAt).getTime(),
                          )
                          .map(({ user, comment }) => (
                            <div className="" key={comment.id}>
                              <div className="my-5 border-t border-gray-300" />
                              <div className="flex gap-2">
                                <div>
                                  <UserImage image={user.image ?? ""} />
                                </div>{" "}
                                <div className="flex w-full flex-col text-sm ">
                                  <div className="flex flex-col ">
                                    <div className="flex flex-wrap items-center gap-2  ">
                                      <p className="w-max font-semibold leading-6 text-gray-700">
                                        {user.handle}
                                      </p>
                                      <p className="text-gray-500">●</p>
                                      <p className=" font-semibold text-gray-600">
                                        {(() => {
                                          let timeAgo = moment(
                                            comment.createdAt,
                                          ).fromNow();
                                          timeAgo = timeAgo.replace(
                                            "months",
                                            "mons",
                                          );
                                          timeAgo = timeAgo.replace(
                                            "month",
                                            "mon",
                                          );
                                          timeAgo = timeAgo.replace(
                                            "years",
                                            "yrs",
                                          );
                                          timeAgo = timeAgo.replace(
                                            "year",
                                            "yr",
                                          );
                                          return timeAgo;
                                        })()}
                                      </p>
                                    </div>
                                    {/* <p className="text-gray-600">
                                      {user.handle}
                                    </p> */}
                                  </div>
                                  <p className="mt-1 text-left font-bold text-gray-600">
                                    {comment.message}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
            <div className="hidden lg:block">
              {comments
                .sort(
                  (a, b) =>
                    new Date(b.comment.createdAt).getTime() -
                    new Date(a.comment.createdAt).getTime(),
                )
                .map(({ user, comment }) => (
                  <div className="my-6" key={comment.id}>
                    <div className="my-4 border-t border-gray-200" />
                    <div className="flex gap-2">
                      <div>
                        <UserImage image={user.image ?? ""} />
                      </div>{" "}
                      <div className="flex w-full flex-col text-sm ">
                        <div className="flex flex-col ">
                          <div className="flex flex-row gap-2  ">
                            <p className="w-max font-semibold leading-6 text-gray-900">
                              {user.name}
                            </p>
                            <p className=" text-gray-600">
                              {moment(comment.createdAt).fromNow()}
                            </p>
                          </div>
                          <p className="text-gray-600">{user.handle}</p>
                        </div>
                        <p className="my-2 text-gray-600">{comment.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
