import { type NextPage } from "next";
import Head from "next/head";
import { Layout } from "~/component/Component";
import { Content } from "~/component/Content";

const Privacy: NextPage = () => {
  const sections = [
    {
      title: "Our Commitment to Your Privacy",
      content:
        "In the dynamic digital age, Vstrim remains steadfast in its commitment to your privacy. We understand its importance and strive to respect it at all times. This post simplifies our privacy policy, highlighting our dedication to adapt and strengthen our privacy commitment in the evolving digital landscape. Vstrim, a platform for sharing and viewing videos, is designed with robust privacy protections.",
    },
    {
      title: "Information Collection at Vstrim",
      content:
        "Vstrim collects data to enhance, provide, and secure our services. This includes account details like your name, email address, and phone number; usage data such as the videos you watch and your interactions with our services; and device information like hardware specifications, operating system, IP address, and browser type.",
    },
    {
      title: "Usage of Collected Information",
      content:
        "We use the collected data to improve your experience by personalizing video recommendations and creating features that align with your interests. It also helps us maintain our services by identifying and fixing glitches, optimizing our platform, and planning future enhancements. Additionally, we use your contact information for communication purposes.",
    },
    {
      title: "Information Sharing at Vstrim",
      content:
        "Vstrim is committed to protecting your privacy. We do not sell or rent your personal data to third parties for marketing purposes. We share your data only with your consent or for external processing by our affiliates or trusted businesses or persons, in compliance with our privacy policy and appropriate confidentiality and security measures.",
    },
    {
      title: "Protecting Your Information",
      content:
        "Vstrim employs strict security measures like data encryption, secure server networks, and regular security audits to prevent unauthorized access or alteration of your information. We also conduct privacy training for our staff to ensure responsible handling of your information.",
    },
    {
      title: "Controlling Your Information on Vstrim",
      content:
        "You can manage your Vstrim account information and settings, control who can view your shared content, and opt-out of personalized ads through your privacy controls. For transparency, we offer a data export option that allows you to download a copy of your data on Vstrim anytime.",
    },
    {
      title: "Children's Privacy",
      content:
        "Vstrim is designed for users aged 13 and above. We do not knowingly collect personal data from children under 13. If we learn that a child under 13 has provided us with personal data, we will delete it promptly.",
    },
    {
      title: "Policy Updates",
      content:
        "Our privacy policy may change occasionally. We will post any changes on this page and provide a prominent notice if the changes are significant.",
    },
    {
      title: "Conclusion",
      content:
        "At Vstrim, your privacy is paramount. We're committed to transparency about our privacy practices and to helping you understand how your data is used and protected. With robust privacy protections, we aim to provide a seamless and secure video sharing experience. Your use of Vstrim's services is subject to our Terms of Service, which includes this Privacy Policy. For any privacy-related questions or concerns, please contact our support team. Your trust fuels our commitment to privacy, and we promise to strive tirelessly to maintain it.",
    },
  ];

  return (
    <>
      <Head>
        <title>Privacy Policy - Vstrim </title>
        <meta
          name="description"
          content="Your privacy is important to us at Vstrim . We respect your privacy regarding any information we may collect from you across our website."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout closeSidebar={true}>
        <div className="mt-4">
          <div className="mx-auto max-w-3xl text-center ">
            <p className="text-base font-semibold leading-7 text-primary-600">
              Privacy Policy
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              We care about your privacy{" "}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Your privacy is important to us at Vidchill . We respect your
              privacy regarding any information we may collect from you across
              our website.
            </p>
          </div>
          <Content sections={sections} />
        </div>
      </Layout>
    </>
  );
};

export default Privacy;
