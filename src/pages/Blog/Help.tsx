import { type NextPage } from "next";
import Head from "next/head";
import { Layout } from "~/component/Component";
import { Disclosure } from "@headlessui/react";
import Button from "~/component/button/Button";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/Bi";

const Help: NextPage = () => {
  const faqs = [
    {
      question: "How Do I Create a Vstrim Account?",
      answer:
        "Creating a Vstrim account is straightforward. Simply click on the 'Sign Up' button on the Vstrim homepage. You'll be prompted to enter your email, create a password, and provide other details such as your name. After filling out the necessary fields, click 'Submit'. A confirmation link will be sent to your email. Clicking this link completes your account setup!",
    },
    {
      question: "How Do I Upload a Video?",
      answer:
        "To upload a video on Vstrim, first log into your account. Then, click on the 'Upload' button located in the top-right corner of the screen. Choose the video you want to upload from your device. You can add a title, description, and tags for your video. Once you've finalized these details, click 'Publish'. Please note that upload times may vary based on the video's file size and your internet connection speed.",
    },
    {
      question: "How Do I Edit My Profile?",
      answer:
        "Editing your Vstrim profile is easy. Click on your profile icon in the top-right corner of the screen to access your account. In the dropdown menu, select 'My Channel'. Here you can update your profile picture, channel description, and other settings. Don't forget to save any changes before leaving the page!",
    },
    {
      question: "Can I Download Videos from Vstrim?",
      answer:
        "Vstrim does not support direct video downloads due to copyright considerations. However, users can save videos for offline viewing within the Vstrim app. Please respect the copyrights of video creators.",
    },
    {
      question: "Is Vstrim Free to Use?",
      answer:
        "Absolutely! Vstrim is free to use. We also offer Vstrim Premium, a subscription service that provides additional features such as ad-free viewing, background play, and access to exclusive content.",
    },
    {
      question: "How Does Vstrim Handle Privacy and Security?",
      answer:
        "Vstrim places high importance on user privacy and data security. We have stringent policies and measures in place to protect user data. For more detailed information, please refer to our Privacy Policy.",
    },
    {
      question: "How Do I Report Inappropriate Content or a Violation?",
      answer:
        "If you encounter content that appears to violate our Community Guidelines, you can report it using the 'Report' button located beneath the video player. Our team reviews reported content and takes appropriate actions.",
    },
    {
      question: "How Can I Monetize My Vstrim Channel?",
      answer:
        "Vstrim offers a Partner Program that allows you to earn revenue from ads shown on your videos and from Vstrim Premium subscribers watching your content. To qualify for the Partner Program, your channel must meet certain criteria including a minimum number of subscribers and watch hours.",
    },
    {
      question: "What Types of Videos Are Prohibited on Vstrim?",
      answer:
        "Vstrim does not permit content that is illegal, harmful, threatening, abusive, defamatory, or in violation of our Community Guidelines. For more detailed information, please refer to our Community Guidelines.",
    },
    {
      question: "What is Vstrim's Policy on Copyright?",
      answer:
        "Vstrim respects copyright laws and has zero tolerance for copyright infringement. If you believe that copyrighted work has been used on Vstrim without authorization, you can file a copyright infringement notice.",
    },
  ];

  return (
    <>
      <Head>
        <title>Help - Vstrim </title>
        <meta
          name="description"
          content="Official Vstrim Help Center where you can find tips and tutorials on using Vstrim and other answers to frequently asked questions."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout closeSidebar={true}>
        <div className="mt-4">
          <div className="mx-auto max-w-3xl text-center ">
            <p className="text-base font-semibold leading-7 text-primary-600">
              FAQ
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              We’re here to help{" "}
            </h1>
            <p className="mb-4 mt-6  text-lg leading-8 text-gray-600">
              Have questions? We’re here to help.
            </p>
            <Button
              className="mt-6"
              variant="primary"
              size="2xl"
              href="mailto:vidchill@vidchill.com"
            >
              Contact
            </Button>
          </div>
          <dl className="mx-auto mt-10 max-w-3xl  space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <BiMinus className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <BsPlus className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </Layout>
    </>
  );
};

export default Help;
