import { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/app/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "SDSC Login",
  description: "Login to Bird flu control system",
};

export default function Login() {
  return (
    <div className="h-screen w-full">
      <div className="relative w-full grid grid-cols-2 items-center justify-center h-full">
        <div className="relative h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-yellow-400" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 36 36"
              className="transform -scale-x-100"
            >
              <path
                fill="#FFFFFF"
                d="M8.916 12.88c-.111 1.652 1.768 3.126-.712 2.959S.368 13.306.436 12.309s3.708-2.757 6.188-2.59c2.48.166 2.404 1.508 2.292 3.161m20.122 16.049a.97.97 0 0 0-.564.095c-2.325.232-3.225-1.885-3.225-1.885c-.439-.336-.981-2.009-1.589-1.215l.187 1.402c.187 1.402 2.57 3.224 2.57 3.224l-1.215 1.589a1 1 0 1 0 1.589 1.215l.673-.88l-.039.249a1 1 0 1 0 1.976.314l.47-2.963a1.003 1.003 0 0 0-.833-1.145m-6.278.623a1 1 0 0 0-.572.018c-2.335-.082-2.944-2.3-2.944-2.3c-.39-.392-.703-2.123-1.412-1.417l-.003 1.414c-.003 1.414 2.115 3.539 2.115 3.539l-1.417 1.412a.999.999 0 1 0 1.411 1.417l.785-.782l-.073.242a1 1 0 0 0 1.916.576l.862-2.873a.996.996 0 0 0-.668-1.246"
              />
              <path
                fill="#0d9488"
                d="M35.009 6.729c-.383-.17-.758-.057-1.05.244c-.054.056-4.225 6.306-14.532 4.944c-.34-.045 3.139 11.968 3.199 11.962c.124-.014 3.07-.368 6.14-2.553c2.818-2.005 6.284-5.991 6.797-13.598c.028-.418-.171-.828-.554-.999"
              />
              <path
                fill="#0d9488"
                d="M34.477 21.108c-.204-.336-.59-.56-.979-.471c-1.293.295-3.197.543-4.53.453c-6.357-.428-9.361-4.129-9.392-4.16c-.275-.282.466 11.552.816 11.576c9.194.62 13.862-6.027 14.057-6.31c.222-.326.233-.751.028-1.088"
              />
              <path
                fill="#0d9488"
                d="M24.586 19.016c-.371 5.51 1.316 9.861-4.194 9.489s-10.145-4.92-9.774-10.431s14.34-4.568 13.968.942"
              />
              <path
                fill="#0d9488"
                d="M23.257 12.412c-.353 5.235-3.922 9.257-9.156 8.904c-5.235-.353-9.193-4.882-8.84-10.117s4.832-8.444 10.067-8.091c4.001.269 8.24 4.683 7.929 9.304"
              />
              <circle cx="10.67" cy="8.989" r="2" fill="#fff" />
              <path
                fill="#0d9488"
                d="M18.179 16.645s7.63 5.648 12.387-4.459c.396-.842 1.685.793.099 4.162s-8.175 6.44-12.04 1.536c-.815-1.035-.446-1.239-.446-1.239"
              />
              <path
                fill="#0d9488"
                d="M15.327 3.107s6.246.254 7.798-.477s.136 2.932-3.262 3.789s-4.536-3.312-4.536-3.312"
              />
              <path
                fill="#0d9488"
                d="M17.428 5.788s4.501.136 6.054-.594s.136 2.932-3.262 3.789s-2.792-3.195-2.792-3.195"
              />
            </svg>
            <div className="flex flex-col items-start justify-start ml-2">
              <div className="font-extrabold text-3xl">
                The Swiss Data Science Center
              </div>
              <div className="font-light text-base">
                Bird flu control system
              </div>
            </div>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg text-justify">
                &ldquo;This control dashboard integrates diverse open data into
                a user-friendly interface, allowing stakeholders to easily
                visualize and analyze bird flu. Designed with FAIR and ORD
                principles, it ensures that complex geospatial data and domain
                data is accessible and actionable for informed
                decision-making..&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        <div className="h-full flex items-center justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <LoginForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
