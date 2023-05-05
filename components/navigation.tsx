import Link from "next/link";
import React from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

const Navigation = () => {
  return (
    <NavContainer>
      {/* <ProfilePicture /> */}
      <NavSection>
        <NavLink active href="https://brijesh.blog" label="Brijesh's Blog" />
      </NavSection>

      <NavSection>
        <NacSectionTitle label="External links" />
        <NavLink href="#" label="Github" external />
        <NavLink href="#" label="Linkedin" external />
        <NavLink
          href="https://www.goodreads.com/user/show/162236489-brijesh-wawdhane"
          label="Goodreads"
          external
        />
      </NavSection>
    </NavContainer>
  );
};

export default Navigation;

const NavLink = (props: any) => {
  return (
    <Link
      className={`text-[16px]
        ${props.active
          ? "text-orange-600 font-medium"
          : "text-gray-500 hover:text-orange-600 transition"
        }
        ${props.external ? "flex items-center gap-2 mr-4" : "block"}
      `}
      href={props.href}
      target="_blank"
    >
      <>
        {props.external ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-external-link"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </>
        ) : (
          <></>
        )}
      </>
      <p>{props.label}</p>
    </Link>
  );
};

const _ProfilePicture = () => {
  return <div className="w-14 h-14 bg-gray-200 rounded-sm mb-5 lg:mb-0"></div>;
};

const NavSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-4 flex flex-row lg:flex-col lg:gap-1.5">{children}</div>
  );
};

const NacSectionTitle = ({ label }: { label: String }) => {
  return (
    <p className="text-gray-400 text-[14px] font-medium uppercase hidden lg:block hover:text-gray-800 transition cursor-alias">
      {label}
    </p>
  );
};

const NavContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="lg:fixed">
      <div className="hidden lg:block">
        <div className="relative z-0">
          <div className="absolute top-0 left-0 w-[200px]">{children}</div>
        </div>
      </div>

      <div className="pl-0 pt-0 block lg:hidden">
        <div className="block max-w-[38rem] mx-auto">
          <div className="block lg:hidden">{children}</div>
        </div>
      </div>
    </div>
  );
};
