import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import styled from 'styled-components';
const RedirectUser: NextPage = () => {
  useEffect(() => {
    window.open('https://www.1umatch.com')?.focus();
  }, []);
  return (
    <RedirectWrapper>
      <Head>
        <title>Right - Muslim Social App</title>
        <meta name='description' content='A muslim social app created by 1umatch.com' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <RedirectText>Redirecting</RedirectText>
    </RedirectWrapper>
  );
};
const RedirectWrapper = styled.div`
  display: flex;
  padding: 10px;
`;
const RedirectText = styled.h5`
  margin: 0px;
`;
export default RedirectUser;
