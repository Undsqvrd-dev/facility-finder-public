import React from "react";
import Head from "next/head";
import Menu from "../components/Menu";

export default function Matching() {
  return (
    <>
      <Head>
        <title>Wat past bij mij? - Facility Finder</title>
        <meta name="description" content="Vind jouw ideale match in de facilitaire sector" />
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
                Wat past bij mij?
              </h1>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <p className="text-lg text-gray-700 mb-4">
                  Ontdek welke rol in de facilitaire sector het beste bij jou past!
                </p>
                <p className="text-gray-600 mb-6">
                  Deze pagina is binnenkort beschikbaar. We ontwikkelen een interactieve tool om je te helpen ontdekken welke functie of organisatie het beste aansluit bij jouw talenten en ambities.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">🎯 Persoonlijkheidstest</h3>
                    <p className="text-sm text-gray-600">Ontdek welke facilitaire rol bij jouw persoonlijkheid past</p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">💼 Carrièrepad</h3>
                    <p className="text-sm text-gray-600">Verken mogelijke carrièrepaden in de sector</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">🏢 Organisatie match</h3>
                    <p className="text-sm text-gray-600">Vind organisaties die bij jouw waarden passen</p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">📚 Ontwikkeling</h3>
                    <p className="text-sm text-gray-600">Krijg aanbevelingen voor je persoonlijke ontwikkeling</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

