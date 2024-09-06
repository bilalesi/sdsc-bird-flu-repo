import { Heading, Paragraph } from "@sdsc/ui/typography";
import { Main } from "@sdsc/ui/main";
import { Header } from "@sdsc/ui/header";
import { Link } from "@sdsc/ui/link";
import { buttonVariants } from "@sdsc/ui/button";
import { cn } from "@sdsc/lib/clsx";
import { Twitter, Github, Linkedin } from "lucide-react";

export default function Page() {
  return (
    <div className="h-screen flex flex-col w-full">
      <div className="mx-auto w-full fixed top-0 left-0 bg-white shadow-md">
        <Header className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex flex-col items-start">
            <Heading level={2} render="h1" className="pb-1">
              Bilal MEDDAH
            </Heading>
            <Paragraph className="text-sm font-light italic">
              It's all about consistency
            </Paragraph>
          </div>
          <div className="flex flex-row gap-4 text-sm mb-1 ">
            <Link
              className="text-sub-text"
              href="https://www.linkedin.com/in/bx93tn/"
              target="_blank"
            >
              <Linkedin />
            </Link>
            <Link
              href="https://x.com/bx93tn"
              target="_blank"
              className="text-sub-text"
            >
              <Twitter />
            </Link>
            <Link
              href="https://github.com/bilalesi"
              target="_blank"
              className="text-sub-text"
            >
              <Github />
            </Link>
          </div>
        </Header>
      </div>
      <div className="w-full overflow-y-auto">
        <Main className="max-w-3xl mt-24">
          <Paragraph className="text-justify py-2">
            I work as an software engineer at{" "}
            <Link
              href="https://www.epfl.ch/research/domains/bluebrain/"
              target="_blank"
              icon
            >
              Blue Brain Project/EPFL
            </Link>{" "}
            where I build and maintain a suite of high traffic web applications,
            alongside internal tools for neuroscience data management,
            engineering and design teams.
          </Paragraph>
          <Paragraph className="py-2 text-justify">
            As a seasoned software engineer, I excel in designing and leading
            the development of cutting-edge software solutions that drive
            organizational success in the digital era.
          </Paragraph>
          <Paragraph className="py-2 text-justify">
            With proficiency in advanced technology stacks—including TypeScript,
            React, Next.js, Node.js, Python, Docker, and Kubernetes—I develop
            responsive, high-performance applications. My expertise also
            encompasses DevOps services such as K8S, AWS, enabling the
            deployment of scalable and robust solutions.
          </Paragraph>
          <Paragraph className="py-2 text-justify">
            I am committed to modern development practices and architectures
            that streamline application delivery and optimize efficiency. My
            extensive experience in both front-end and back-end technologies
            ensures the creation of innovative, user-centric solutions.
          </Paragraph>
          <Paragraph className="py-2 text-justify">
            Collaboration is at the heart of my work ethic, as I actively engage
            with cross-functional teams and stakeholders to align technology
            solutions with strategic objectives. I am dedicated to building
            systems that are not only scalable and robust but also adhere to
            industry best practices, ensuring their longevity and adaptability
            for future success.
          </Paragraph>
          <Paragraph className="py-2">
            feel free to reach out or connect with me, links below
          </Paragraph>
          <Heading level={1}>Recent Projects</Heading>
          <ul className="list-disc">
            <li>
              <Link
                href="https://openbluebrain.com/static/coming-soon/index.html"
                target="_blank"
                icon
              >
                The Blue Brain Open Platform
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/BlueBrain/virtual-lab-api"
                target="_blank"
                icon
              >
                BBOP maestro
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/BlueBrain/thumbnail-generation-api"
                target="_blank"
                icon
              >
                BBOP image service
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/BlueBrain/Bluenaas"
                target="_blank"
                icon
              >
                BBOP single neuron cell as service
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/BlueBrain/nexus-web"
                target="_blank"
                icon
              >
                BBOP fusion
              </Link>
            </li>
            <li>
              <Link href="https://www.beesiha.com/fr" target="_blank" icon>
                Beesiha
              </Link>
            </li>
          </ul>
          <div className="flex w-full justify-end my-10">
            <Link
              href="/login"
              className={cn(
                "hover:text-white",
                buttonVariants({ variant: "default" }),
              )}
            >
              Go to SDSC Bird flu application
            </Link>
          </div>
        </Main>
      </div>
    </div>
  );
}
