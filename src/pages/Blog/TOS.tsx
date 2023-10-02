import { type NextPage } from "next";
import Head from "next/head";
import { Layout } from "~/component/Component";
import { Content } from "~/component/Content";

const TOS: NextPage = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      content:
        "By using Vstrim, you agree to our Terms of Service (ToS). We provide the service to you, but in return, you must adhere to certain rules. Non-compliance with these rules may result in actions against your account, including possible termination.",
    },
    {
      title: "Changes to Our Service",
      content:
        "As the digital landscape evolves, so does Vstrim. We're constantly working on enhancing and expanding our services. This may involve adding or removing features, or suspending or terminating certain aspects of our service.",
    },
    {
      title: "Your Vstrim Account",
      content:
        "A Vstrim account is required to upload content, comment on videos, or engage in most platform activities. You are responsible for safeguarding your account and any activities that occur through your account. If you notice unauthorized use of your account, please notify us immediately.",
    },
    {
      title: "Vstrim’s Licensing Agreement",
      content:
        "When you upload content to Vstrim, you retain your rights to your content. However, by uploading, you grant Vstrim a worldwide, non-exclusive, royalty-free license to use, reproduce, distribute, display, and publish your content in connection with the service. This license continues even if you stop using our services, primarily due to shared or embedded content on other websites.",
    },
    {
      title: "Content Restrictions",
      content:
        "Vstrim is a platform for diverse content, but certain types of content are not allowed. This includes content that promotes hate speech, violence, illegal activities, or infringes on others' rights. We will remove such content and may take action against the account, including termination.",
    },
    {
      title: "Copyright Infringement",
      content:
        "Vstrim adheres to copyright laws. We will remove content that infringes on others' copyright. If you believe your copyright has been violated on Vstrim, you can file a copyright infringement notification.",
    },
    {
      title: "Liability for Vstrim Content",
      content:
        "While we strive to ensure all content on Vstrim adheres to our Community Guidelines, Vstrim isn't liable for any content uploaded by users. You understand that when using Vstrim, you may be exposed to content that you may find offensive, indecent, or objectionable.",
    },
    {
      title: "Advertising on Vstrim",
      content:
        "Some of our services are supported by advertising. In exchange for access to free content, you agree that we can display ads on the Vstrim service.",
    },
    {
      title: "Using Vstrim on Your Devices",
      content:
        "Vstrim is accessible on various devices. Do not use our services in a way that distracts you and prevents you from obeying traffic or safety laws.",
    },
    {
      title: "Age Requirements",
      content:
        "You must be at least 13 years old to create a Vstrim account. If you are under 18, you must have your parent or legal guardian's permission to use Vstrim.",
    },
    {
      title: "Termination",
      content:
        "If you violate the ToS, we may terminate or suspend your access to Vstrim. We also reserve the right to terminate or suspend your access at any time, without notice, for operational, regulatory, legal or other reasons.",
    },
    {
      title: "Applicable Law and Jurisdiction",
      content:
        "Your relationship with Vstrim is governed by U.S. law. Any legal suit, action or proceeding arising out of or related to these ToS or the Vstrim service will be instituted exclusively in the federal courts of the United States.",
    },
    {
      title: "Conclusion",
      content:
        "At Vstrim, our goal is to cultivate a space that encourages creativity, collaboration, and community. Adherence to our Terms of Service by users like you is crucial to this endeavor. While our ToS may seem extensive, they are vital for creating a digital environment where everyone feels secure and welcome. Usage of Vstrim's services is always subject to these Terms of Service. For any queries or concerns, our dedicated support team is ready to assist you.",
    },
  ];

  return (
    <>
      <Head>
        <title>Terms and conditions - VidChill</title>
        <meta
          name="description"
          content="By accessing our website, you are agreeing to be bound by these
              terms of service, and agree that you are responsible for
              compliance with any applicable local laws."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout closeSidebar={true}>
        <div className="mt-4">
          <div className="mx-auto max-w-2xl text-center ">
            <p className="text-base font-semibold leading-7 text-primary-600">
              Current as of{" "}
              {new Date().toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Terms and conditions{" "}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              By accessing our website, you are agreeing to be bound by these
              terms of service, and agree that you are responsible for
              compliance with any applicable local laws.
            </p>
          </div>
          <Content sections={sections} />
        </div>
      </Layout>
    </>
  );
};

export default TOS;
