import { createClient, SanityClient } from "next-sanity";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import Image from "next/image";
import React from "react";
import Refractor from "react-refractor";

import typescript from "refractor/lang/typescript";
import javascript from "refractor/lang/javascript";
import css from "refractor/lang/css";
import bash from "refractor/lang/bash";
import go from "refractor/lang/go";
import json from "refractor/lang/json";

import c from "refractor/lang/c";
import ruby from "refractor/lang/ruby";
import rust from "refractor/lang/rust";
import cpp from "refractor/lang/cpp";
import java from "refractor/lang/java";
import lua from "refractor/lang/lua";
import elixir from "refractor/lang/elixir";
import haskell from "refractor/lang/haskell";

import yaml from "refractor/lang/yaml";
import toml from "refractor/lang/toml";

import sql from "refractor/lang/sql";

[
  typescript,
  javascript,
  css,
  bash,
  go,
  json,
  c,
  ruby,
  rust,
  cpp,
  java,
  lua,
  elixir,
  haskell,
  yaml,
  toml,
  sql,
].forEach((lang: any): void => {
  Refractor.registerLanguage(lang);
});

const sanityConfig: {
  projectId: string;
  dataset: string;
  apiVersion: string;
  useCdn: boolean;
} = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  apiVersion: "2023-05-05",
  useCdn: true,
};

const client: SanityClient = createClient(sanityConfig);

async function getData(slug: string) {
  return await client.fetch(`*[_type == "post" && slug.current == $slug]`, {
    slug,
  });
}

const builder: ImageUrlBuilder = imageUrlBuilder(client);

function urlFor(source: any): ImageUrlBuilder {
  return builder.image(source);
}

const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative">
          <Image
            src={urlFor(value).toString()}
            alt={""}
            height={800}
            width={800}
          />
        </div>
      );
    },
    cdnImage: ({ value }: any) => {
      return (
        <div className="relative">
          <Image src={value.src} alt={""} height={800} width={800} />
        </div>
      );
    },
    code: ({ value }: any) => {
      return <Refractor language={value.language} value={value.code} />;
    },
  },
};

export default async function BlogPost({ params }: any) {
  const data = await getData(params.slug);
  return data[0] ? (
    <div className="flex flex-col gap-5">
      {data[0].draft && (
        <div className="z-30 bg-red-200 p-4 rounded-md border border-red-600 fixed w-full max-w-[38rem] bottom-5">
          This is a draft post
        </div>
      )}
      <h2 className="font-semibold text-3xl">{data[0].title}</h2>

      <p>
        Published:{" "}
        {new Date(data[0].publishDate).toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        {new Date(data[0].publishDate).toLocaleDateString() !==
          new Date(data[0]._updatedAt).toLocaleDateString() && (
          <>
            (Last edited:{" "}
            {new Date(data[0]._updatedAt).toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {")"}
          </>
        )}
      </p>

      <div>
        <PortableText
          value={data[0].bodyCopy}
          components={myPortableTextComponents}
        />
      </div>
    </div>
  ) : (
    <div>
      <button className="text-blue-600 hover:text-white hover:bg-blue-600 font-medium flex gap-2 items-center mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <g className="url(#clip0_9_2121)">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.25-7.25a.75.75 0 000-1.5H8.66l2.1-1.95a.75.75 0 10-1.02-1.1l-3.5 3.25a.75.75 0 000 1.1l3.5 3.25a.75.75 0 001.02-1.1l-2.1-1.95h4.59z"
              clipRule="evenodd"
            />
          </g>
          <defs>
            <clipPath id="clip0_9_2121">
              <path d="M0 0h20v20H0z" />
            </clipPath>
          </defs>
        </svg>

        <a href="/">Go back home</a>
      </button>

      <div>
        <h2 className="font-semibold text-3xl mb-3 text-red-800">
          404 not found
        </h2>
        <p className="mb-8 text-red-600">
          The page you are looking for could not be found.
          <br />
          Either the link is misspelled or the page has been removed.
        </p>
      </div>

      <h3 className="font-semibold text-xl mb-3">Popular posts</h3>
      <p className="text-gray-500">Not enough data for finding popular posts</p>
    </div>
  );
}
