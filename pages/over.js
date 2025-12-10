import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Over() {
  useEffect(() => {
    // Ensure body can scroll
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    // Cleanup on unmount
    return () => {
      document.body.style.height = '';
      document.body.style.overflow = '';
      document.documentElement.style.height = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <>
      <Head>
        <title>Over Facility Finder - Zet jouw organisatie op de kaart</title>
        <meta name="description" content="Ontdek hoe je binnen 5 minuten jouw plek op de interactieve Facility Finder kaart claimt, zodat studenten, starters, vakgenoten en potentiële opdrachtgevers jou gemakkelijk kunnen vinden." />
        <meta property="og:title" content="Over Facility Finder - Zet jouw organisatie op de kaart" />
        <meta property="og:description" content="Ontdek hoe je binnen 5 minuten jouw plek op de interactieve Facility Finder kaart claimt, zodat studenten, starters, vakgenoten en potentiële opdrachtgevers jou gemakkelijk kunnen vinden." />
        <meta property="og:image" content="https://www.facilityfinder.nl/logos/preview.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.facilityfinder.nl/over" />
      </Head>

      <div className="bg-gray-50" style={{ minHeight: '100vh', height: 'auto', overflow: 'auto' }}>
        {/* Header */}
        <header className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 px-6 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-semibold hover:opacity-80 transition-opacity">
              Facility Finder
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-sm text-white hover:underline">
                Terug naar kaart
              </Link>
              <a href="https://www.undsqvrd.nl/facility-finder" target="_blank" rel="noopener noreferrer" className="text-sm text-white hover:underline">
                Powered by UNDSQVRD
              </a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full"></div>
              <div className="absolute bottom-32 left-1/3 w-16 h-16 bg-white rounded-full"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-white">
                  <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    ZET JOUW FACILITAIRE ORGANISATIE OP DE KAART
                  </h1>
                  <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
                    Ontdek hoe je binnen 5 minuten jouw plek op de interactieve Facility Finder kaart claimt, zodat studenten, starters, vakgenoten en potentiële opdrachtgevers jou gemakkelijk kunnen vinden.
                  </p>
                  
                  <div className="flex items-center mb-8">
                    <a 
                      href="https://www.undsqvrd.nl/facility-finder" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-white text-blue-700 font-semibold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg mr-6"
                    >
                      Facility Finder uitproberen
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-8">
                    <div>
                      <div className="text-4xl font-bold text-white">75+</div>
                      <div className="text-blue-200 text-sm">Aantal organisaties</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-white">200+</div>
                      <div className="text-blue-200 text-sm">Bezoekers per week</div>
                    </div>
                  </div>

                  {/* User Avatars */}
                  <div className="flex items-center mt-6">
                    <div className="flex -space-x-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white flex items-center justify-center text-white font-semibold">A</div>
                      <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full border-2 border-white flex items-center justify-center text-white font-semibold">B</div>
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full border-2 border-white flex items-center justify-center text-white font-semibold">C</div>
                      <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-pink-400 rounded-full border-2 border-white flex items-center justify-center text-white font-semibold">D</div>
                    </div>
                    <span className="ml-3 text-blue-200 text-sm">75+ organisaties</span>
                  </div>
                </div>
                
                <div className="relative lg:ml-8">
                  <div className="relative bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <div className="bg-gray-100 rounded-xl h-80 flex items-center justify-center mb-4">
                      <img 
                        src="/logos/preview.png" 
                        alt="Facility Finder kaart voorbeeld" 
                        className="w-full h-full object-cover rounded-xl"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div style={{display: 'none'}} className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">🗺️</div>
                          <span className="text-gray-600 font-medium">Interactieve Kaart</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 mb-1">Facility Finder Platform</div>
                      <div className="text-gray-500 text-sm">Ontdek facilitaire organisaties</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Werkt voor jou, niet tegen je.</h2>
                <p className="text-xl text-gray-600">Ontdek waarom organisaties kiezen voor Facility Finder</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                <div>
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Zichtbaarheid</h3>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Zichtbaar voor duizenden FM talenten die op zoek zijn naar stages, bijbanen en carrièremogelijkheden in de facilitaire sector.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-2">Maandelijkse bezoekers</div>
                      <div className="text-3xl font-bold text-blue-600">200+</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Talent Aantrekken</h3>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Trek studenten en young professionals aan die op zoek zijn naar betekenisvolle werkplekken in facility management.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-2">Geregistreerde organisaties</div>
                      <div className="text-3xl font-bold text-green-600">75+</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Problem & Solution */}
              <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Het probleem</h3>
                    <p className="text-gray-600 mb-4">
                      De facilitaire branche is 'lekker breed'. Zó breed zelfs, dat studenten en young professionals vaak totaal niet weten waar ze moeten beginnen.
                    </p>
                    <p className="text-gray-600 mb-6">
                      Er is geen centraal overzicht, functies zijn verspreid over uiteenlopende branches, van zorg tot vastgoed en van schoonmaak tot hospitality.
                    </p>
                    <div className="bg-red-50 border-l-4 border-red-400 p-4">
                      <p className="text-red-800 font-semibold">
                        Talent raakt gefrustreerd, organisaties blijven onzichtbaar.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">De oplossing</h3>
                    <p className="text-gray-600 mb-6">
                      Daarom hebben we de Facility Finder ontwikkeld – een interactieve kaart die zichtbaar maakt waar facilitaire organisaties zich bevinden.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Letterlijk op de kaart</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Per branche georganiseerd</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Inclusief functies en contactinfo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Target Audience Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Voor wie is de Facility Finder?</h2>
                <p className="text-xl text-gray-600">Verschillende type organisaties profiteren van meer zichtbaarheid</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Facilitaire afdelingen</h3>
                  <p className="text-gray-600 mb-4">
                    Zoals ziekenhuizen, hogescholen, gemeenten, musea, vliegvelden en sportclubs.
                  </p>
                  <p className="text-gray-600 mb-6">
                    Deze afdelingen zijn cruciaal, maar vaak onzichtbaar. Talent weet niet dat jullie bestaan of wat jullie doen.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Wordt vindbaar voor talent</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Facilitair dienstverleners</h3>
                  <p className="text-gray-600 mb-4">
                    Zoals schoonmaakbedrijven, integrated leveranciers, vastgoedbeheerders en FM-consultants.
                  </p>
                  <p className="text-gray-600 mb-6">
                    Jullie zoeken jong talent, maar ook opdrachtgevers. Vergroot je zichtbaarheid in beide richtingen.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Werkgever én dienstverlener</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Free Offer Section */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white p-8">
              <h2 className="text-3xl font-bold mb-6">Gratis offer: zet jezelf op de kaart</h2>
              <p className="text-xl mb-6">Claim gratis toegang tot de Facility Finder en krijg direct:</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-3 text-xl">✓</span>
                  <span className="text-lg">Je eigen profielpagina met logo, kerninfo & contact</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-3 text-xl">✓</span>
                  <span className="text-lg">Een plek op de interactieve sectorkaart</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-3 text-xl">✓</span>
                  <span className="text-lg">Promotie via onze LinkedIn-campagnes (tijdelijk kosteloos)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-3 text-xl">✓</span>
                  <span className="text-lg">Aansluiting bij een groeiend netwerk van FM-opleidingen en young professionals</span>
                </li>
              </ul>
              <div className="text-center">
                <a 
                  href="https://www.undsqvrd.nl/facility-finder" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-purple-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors transform hover:scale-105 shadow-lg"
                >
                  👉 Ja, zet mijn organisatie op de kaart
                </a>
              </div>
            </div>
          </section>

          {/* Social Proof Section */}
          <section className="mb-16">
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
              <div className="bg-green-50 border-l-4 border-green-400 p-6">
                <p className="text-lg font-semibold text-green-800">
                  Al 75+ organisaties gingen je voor, waaronder toonaangevende spelers in vastgoedbeheer, schoonmaak, hospitality en facilitair advies.
                </p>
              </div>
            </div>
          </section>

          {/* Coming Soon Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Coming soon</h2>
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                De Facility Finder is vol in ontwikkeling. Op basis van feedback ontwikkelen we het platform door. Hier werken we aan:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 text-xl">🏢</span>
                  <span className="text-lg text-gray-700">
                    <strong>Uitgebreide bedrijfsprofielen</strong> zodat organisaties zichzelf nog beter kunnen presenteren met foto's, diensten en vacatures.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 text-xl">🛒</span>
                  <span className="text-lg text-gray-700">
                    <strong>Een Facility marketplace</strong> waar vraag en aanbod elkaar makkelijker kunnen vinden.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 text-xl">📚</span>
                  <span className="text-lg text-gray-700">
                    <strong>Meer informatie over de facilitaire sector</strong> zoals verschillende branches, type organisaties en functies.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Big CTA Section */}
          <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-blue-700/90 to-blue-800/90"></div>
              <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-black/20 to-transparent"></div>
            </div>
            
            <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
              <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="text-white text-sm font-medium">Gratis toegang</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                LATEN WE JOUW FACILITAIRE ORGANISATIE ZICHTBAAR MAKEN
              </h2>
              
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Heb je vragen of wil je direct aan de slag? Vul het formulier in en ons team neemt binnen 24 uur contact met je op. Laten we jouw organisatie op de kaart zetten.
              </p>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
                <form className="space-y-6">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Jouw naam" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="E-mailadres" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Organisatie naam" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="Vertel ons over jouw organisatie (optioneel)" 
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    ></textarea>
                  </div>
                  <a 
                    href="https://www.undsqvrd.nl/facility-finder" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-gray-900 text-white font-semibold py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors inline-block text-center"
                  >
                    Zet mijn organisatie op de kaart
                  </a>
                </form>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 px-6 mt-16">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-300">
              © 2024 Facility Finder - Powered by{" "}
              <a href="https://www.undsqvrd.nl" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
                UNDSQVRD
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
