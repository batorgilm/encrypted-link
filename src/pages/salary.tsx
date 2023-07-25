import { decrypt } from "@/utils/crypto";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";

export default function Salary({ data }: any) {
  return <div>{JSON.stringify(data, null, 2)}</div>;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { hash } = query;
  const data = decrypt(hash);
  return {
    props: {
      data,
    },
  };
};
