import { type NextPage } from "next";
import Head from "next/head";
import { Layout, LoadingMessage } from "~/component/Component";
import { useSession } from "next-auth/react";
import { Button } from "~/component/button/Buttons";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { ImageCropper } from "~/component/button/EditBtn";
import { api } from "~/utils/api";
import { env } from "~/env.mjs";
import AnimateInfo from "../../public/info.json";
import Lottie from "lottie-react";

const Settings: NextPage = () => {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id;
  const addUserUpdateMutation = api.user.updateUser.useMutation();
  const { data, refetch } = api.user.getChannelById.useQuery({
    id: userId!,
  });
  const [loading, setLoading] = useState(false);
  const channel = data?.user;
  const [user, setUser] = useState({
    name: "",
    email: "",
    handle: "",
    description: "",
  });

  useEffect(() => {
    if (channel) {
      setUser({
        name: channel.name ?? "",
        email: channel.email ?? "",
        handle: channel.handle ?? "",
        description: channel.description ?? "",
      });
    }
  }, [channel]);

  if (!channel) {
    return (
      <div>
        <LoadingMessage />
      </div>
    );
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    const userData = {
      id: channel.id,
      name: channel.name ?? undefined,
      email: channel.email,
      handle: channel.handle ?? undefined,
      image: channel.image ?? undefined,
      backgroundImage: channel.backgroundImage ?? undefined,
      description: channel.description ?? undefined,
    };

    if (
      user.name !== channel.name ||
      user.description !== channel.description ||
      user.handle !== channel.handle ||
      user.email !== channel.email
    ) {
      const newUserData = {
        ...userData,
      };
      if (user.name && user.name !== channel.name) newUserData.name = user.name;
      if (user.description && user.description !== channel.description)
        newUserData.description = user.description;
      if (user.handle && user.handle !== channel.handle)
        newUserData.handle = user.handle;
      if (user.email && user.email !== channel.email)
        newUserData.email = user.email;

      addUserUpdateMutation.mutate(newUserData, {
        onSuccess: () => {
          setLoading(false);
          void refetch();
        },
      });
    }
  };

  return (
    <>
      <Head>
        <title>Vstrim </title>
        <meta name="description" content="Settings for Vstrim" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout closeSidebar={false}>
        <div className="w-full">
          <div className="w-full">
            <CropImageModal
              iconType="background"
              channel={{
                id: channel.id || "",
                image: channel.image ?? "",
                backgroundImage: channel.backgroundImage ?? "/background.jpg",
              }}
              refetch={refetch}
              imageType="backgroundImage"
            />

            <div className="mx-auto  px-4 sm:px-6 lg:px-8">
              <div className="!-mt-6 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                <div className="flex">
                  <CropImageModal
                    iconType="profile"
                    channel={{
                      id: channel.id || "",
                      image: channel.image ?? "",
                      backgroundImage: channel.backgroundImage ?? "",
                    }}
                    refetch={refetch}
                    imageType="image"
                  />
                </div>
                <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                  <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
                    <h1 className="truncate text-2xl font-bold text-gray-900">
                      {channel.name}
                    </h1>
                    <p className="text-regular text-gray-600">
                      {channel.handle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-10 divide-y divide-gray-900/10">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
              <div className="px-4 sm:px-0">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Info
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Update your photo and personal details.
                </p>
                <Lottie
                  animationData={AnimateInfo}
                  loop
                  autoplay
                  style={{ height: 100, width: 200 }}
                />
              </div>

              <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                  <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          autoComplete="family-name"
                          value={user.name || ""}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={user.email || ""}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
              <div className="px-4 sm:px-0">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Profile
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>

              <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                  <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="handle"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Handle
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600 sm:max-w-md">
                          <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                            Vsrtim.com/
                          </span>
                          <input
                            type="text"
                            name="handle"
                            id="handle"
                            className="block flex-1 border-0 bg-transparent px-2 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            value={user.handle || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        About
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                          value={user.description || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        Write a short description about your page.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                  <Button
                    type="reset"
                    variant="primary"
                    size="lg"
                    disabled={loading}
                    onClick={() => handleSubmit()}
                  >
                    {loading ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

// Interface for CropImageModal props
interface CropImageModalProps {
  iconType?: string;
  channel: {
    id: string;
    image?: string;
    backgroundImage?: string;
  };
  refetch: () => Promise<unknown>;
  imageType: "backgroundImage" | "image";
}

export function CropImageModal({
  iconType,
  channel,
  refetch,
  imageType,
}: CropImageModalProps) {
  const [image, setImage] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const addUserUpdateMutation = api.user.updateUser.useMutation();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0] ? e.target.files[0] : null);
      setOpen(true);
    }
  };
  const handleSubmit = (croppedDataUrl: string) => {
    // setOpen(false);
    setLoading(true);
    type UploadResponse = {
      secure_url: string;
    };
    const userData = {
      id: channel?.id,
      [imageType]: channel[imageType] ?? undefined,
    };

    const formData = new FormData();
    formData.append("upload_preset", "vstrim_user_uploads");
    formData.append("file", croppedDataUrl);

    fetch(
      "https://api.cloudinary.com/v1_1/" +
        env.NEXT_PUBLIC_CLOUDINARY_NAME +
        "/image/upload",

      {
        method: "POST",
        body: formData,
      },
    )
      .then((response) => response.json() as Promise<UploadResponse>)
      .then((data) => {
        if (data.secure_url !== undefined) {
          const newUserData = {
            ...userData,
            ...(data.secure_url && { [imageType]: data.secure_url }), // Updated this line
          };
          addUserUpdateMutation.mutate(newUserData, {
            onSuccess: () => {
              void refetch();
              setOpen(false);
              // setImage(null);
              setLoading(false);
            },
          });
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  return (
    <>
      {imageType === "image" ? (
        <>
          <label htmlFor="file-upload-image">
            <input
              id="file-upload-image"
              name="image"
              type="file"
              className="sr-only"
              onChange={onFileChange}
            />
            <Image
              className="h-24 w-24 cursor-pointer rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              width="2000"
              height="2000"
              src={channel?.image ?? "/profile.jpg"}
              alt="error"
            />
          </label>
        </>
      ) : (
        <>
          <label htmlFor="file-upload-backgroundImage">
            <input
              id="file-upload-backgroundImage"
              name="backgroundImage"
              type="file"
              className="sr-only"
              onChange={onFileChange}
            />
            <Image
              className="h-32 w-full cursor-pointer object-cover lg:h-64"
              src={channel.backgroundImage ?? "/background.jpg"}
              width={2000}
              height={2000}
              alt="error"
            />
          </label>
        </>
      )}
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
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-[100] overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <>
                    <ImageCropper
                      setCroppedImage={setCroppedImage}
                      image={image}
                      loading={loading}
                      imageType={imageType}
                      handleSubmit={handleSubmit}
                      setOpen={setOpen}
                    />
                  </>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default Settings;
