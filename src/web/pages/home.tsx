import React from 'react';
import { NextPage } from 'next';
// import { useUser } from '../hooks/useUser'
import Layout from '../layout/MainLayout'

const Home: NextPage<{ data: string }> = () => {
  // const user = useUser({ redirectTo: '/login', redirectIfFound: false })
  return (
    <Layout>
      <h1>Hello World</h1>
    </Layout>
  );
};

export default Home;
