import React from 'react';
import { NextPage } from 'next';
// import { useUser } from '../../hooks/useUser'
import Layout from '../../layout/MainLayout'

const UberEatsImportData: NextPage<{ data: string }> = () => {
  // const user = useUser({ redirectTo: '/login', redirectIfFound: false })
  return (
    <Layout>
      <h1>This is UberEats import page</h1>
    </Layout>
  );
};

export default UberEatsImportData;
