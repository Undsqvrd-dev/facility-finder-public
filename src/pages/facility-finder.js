import React from "react";
import Layout from "../components/Layout";
import FacilityFinder from "../components/FacilityFinder";

export default function FacilityFinderPage({ user }) {
  return (
    <Layout user={user}>
      <FacilityFinder mode="platform" user={user} />
    </Layout>
  );
} 