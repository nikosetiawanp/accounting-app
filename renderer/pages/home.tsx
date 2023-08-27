import React, { useEffect } from "react";
import Head from "next/head";
import { Stack, Typography, styled } from "@mui/material";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import MiniDrawer from "../components/MiniDrawer";
import AccountingTable from "../components/AccountingTable";
import { Prisma, PrismaClient } from "@prisma/client";

const Root = styled("div")(({ theme }) => {
  return {
    textAlign: "center",
    paddingTop: theme.spacing(0),
  };
});

interface CashFlow {
  id: string;
  account: string;
  accountCode: string;
  date: Date;
  description: string;
  debit: number;
  credit: number;
}

const prisma = new PrismaClient();
export async function getServerSideProps() {
  const data = await prisma.cashFlow.findMany({
    include: {
      account: true,
    },
  });
  const cashFlow = JSON.parse(JSON.stringify(data));

  console.log(cashFlow);
  return {
    props: {
      cashFlow,
    },
  };
}

function Home({
  cashFlow,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    console.log(cashFlow);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Accounting App</title>
      </Head>
      <Root>
        <Stack direction={"row"} overflow={"hidden"}>
          <MiniDrawer />
          <Stack
            alignItems={"start"}
            p={4}
            spacing={4}
            sx={{
              width: "100%",
              minWidth: 750,
            }}
            direction={"column"}
          >
            <Stack
              direction={"row"}
              justifyContent="space-between"
              sx={{
                width: "100%",
              }}
            >
              <Typography
                variant="h5"
                component="h5"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Dashboard
              </Typography>
            </Stack>
            <AccountingTable />
          </Stack>
        </Stack>
      </Root>
    </React.Fragment>
  );
}

export default Home;
