import React from "react";
import Head from "next/head";
import Menu from "../components/Menu";

export default function Jobcoaching() {
  return (
    <>
      <Head>
        <title>Jobcoaching - Facility Finder</title>
        <meta name="description" content="Persoonlijke begeleiding voor jouw carrière in de facilitaire sector" />
      </Head>
      <div className="flex flex-col h-screen bg-background">
        <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 px-6 flex justify-between items-center z-50 shadow-md">
          <span className="text-2xl font-semibold">Facility Finder</span>
          <div className="flex items-center space-x-4">
            <a href="/over" className="text-sm text-white hover:underline">
              Over Facility Finder
            </a>
            <a href="https://www.undsqvrd.nl/facility-finder" target="_blank" rel="noopener noreferrer" className="text-sm text-white hover:underline">
              Powered by UNDSQVRD
            </a>
          </div>
        </header>

        <div className="flex h-screen pt-[60px]">
          <Menu isOpen={true} />
          <div className="flex-1 overflow-y-auto p-8 ml-[280px]">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Jobcoaching
              </h1>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <p className="text-lg text-gray-700 mb-4">
                  Persoonlijke begeleiding voor jouw carrière in de facilitaire sector.
                </p>
                <p className="text-gray-600">
                  Deze pagina is binnenkort beschikbaar. We werken aan een uitgebreid jobcoaching programma om je te helpen bij het vinden van de perfecte baan in de facilitaire branche.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

