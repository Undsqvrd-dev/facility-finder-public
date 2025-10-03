import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { FiMapPin, FiBriefcase, FiClock, FiFilter, FiSearch } from 'react-icons/fi';

// Dynamisch importeren van de vacature kaart component
const VacatureMap = dynamic(() => import("../src/components/VacatureMap"), { ssr: false });

export default function Vacatures() {
  const [vacatures, setVacatures] = useState([]);
  const [filteredVacatures, setFilteredVacatures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    locatie: '',
    niveau: '',
    contract: '',
    type: ''
  });
  const [selectedVacature, setSelectedVacature] = useState(null);
  const [hoveredVacature, setHoveredVacature] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mapBounds, setMapBounds] = useState(null);
  const [showSollicitatieForm, setShowSollicitatieForm] = useState(false);
  const [sollicitatieForm, setSollicitatieForm] = useState({
    naam: '',
    email: '',
    telefoon: '',
    linkedin: '',
    motivatie: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Haal vacatures op bij component mount
  useEffect(() => {
    fetchVacatures();
  }, []);

  // Haal alle vacatures op van de API
  const fetchVacatures = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/vacatures');
      if (response.ok) {
        const data = await response.json();
        setVacatures(data);
        setFilteredVacatures(data);
      } else {
        console.error('Fout bij ophalen van vacatures');
        setVacatures([]);
        setFilteredVacatures([]);
      }
    } catch (error) {
      console.error('Fout bij ophalen van vacatures:', error);
      setVacatures([]);
      setFilteredVacatures([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter vacatures op basis van filters en kaart bounds
  useEffect(() => {
    let filtered = vacatures.filter(vacature => {
      const matchesLocatie = !filters.locatie || vacature.locatie === filters.locatie;
      const matchesNiveau = !filters.niveau || vacature.niveau === filters.niveau;
      const matchesContract = !filters.contract || vacature.contract === filters.contract;
      const matchesType = !filters.type || vacature.type === filters.type;

      // Filter op basis van kaart bounds (als beschikbaar)
      let matchesMapBounds = true;
      if (mapBounds && vacature.lat && vacature.lng) {
        const lat = parseFloat(vacature.lat);
        const lng = parseFloat(vacature.lng);
        
        matchesMapBounds = lat >= mapBounds.south && lat <= mapBounds.north && 
                          lng >= mapBounds.west && lng <= mapBounds.east;
      }

      return matchesLocatie && matchesNiveau && matchesContract && matchesType && matchesMapBounds;
    });

    setFilteredVacatures(filtered);
  }, [filters, vacatures, mapBounds]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      locatie: '',
      niveau: '',
      contract: '',
      type: ''
    });
  };

  // Handlers voor kaart interactie
  const handleSelectVacature = (vacature) => {
    setSelectedVacature(vacature);
  };

  const handleHoverVacature = (vacature) => {
    setHoveredVacature(vacature);
  };

  const handleMapBoundsChange = (bounds) => {
    setMapBounds(bounds);
  };

  const handleMapClick = () => {
    setSelectedVacature(null);
    setShowSollicitatieForm(false);
  };

  const handleSollicitatieFormChange = (e) => {
    const { name, value } = e.target;
    setSollicitatieForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSollicitatieSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/solliciteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...sollicitatieForm,
          vacature_id: selectedVacature.id,
          vacature_titel: selectedVacature.titel,
          bedrijf: selectedVacature.bedrijven?.naam
        }),
      });

      if (!response.ok) {
        throw new Error('Er is een fout opgetreden bij het versturen van je sollicitatie');
      }

      // Reset form en ga terug naar vacature details
      setSollicitatieForm({
        naam: '',
        email: '',
        telefoon: '',
        linkedin: '',
        motivatie: ''
      });
      setShowSollicitatieForm(false);
      alert('Je sollicitatie is succesvol verstuurd!');
      
    } catch (error) {
      console.error('Fout bij versturen sollicitatie:', error);
      alert(`Fout bij versturen sollicitatie: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMapInteraction = () => {
    // Optioneel: sluit sidebar op mobiel
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };



  const getTypeLabel = (type) => {
    switch(type) {
      case 'fulltime': return 'Fulltime';
      case 'parttime': return 'Parttime';
      case 'stage': return 'Stage';
      default: return type;
    }
  };

  const getNiveauLabel = (niveau) => {
    switch(niveau) {
      case 'stage': return 'Stage';
      case 'junior': return 'Junior';
      case 'senior': return 'Senior';
      default: return niveau;
    }
  };

  const getContractLabel = (contract) => {
    switch(contract) {
      case 'vast': return 'Vast contract';
      case 'freelance': return 'Freelance';
      case 'stage': return 'Stage';
      default: return contract;
    }
  };

  // Haal unieke locaties op uit de vacatures
  const getUniqueLocations = () => {
    const locations = new Set();
    vacatures.forEach(vacature => {
      if (vacature.locatie) {
        locations.add(vacature.locatie);
      }
    });
    return Array.from(locations).sort();
  };

  return (
    <>
      <Head>
        <title>Vacatures - Facility Finder</title>
        <meta name="description" content="Vind je droombaan in de facilitaire sector. Bekijk alle beschikbare vacatures en solliciteer direct." />
      </Head>

      <div className="flex flex-col h-screen bg-background">
        {/* Header */}
        <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 px-6 flex justify-between items-center z-50 shadow-md">
          <span className="text-2xl font-semibold">Vacatures</span>
          <div className="flex items-center space-x-4">
            <a 
              href="/" 
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Terug naar Facility Finder
            </a>
          </div>
        </header>

        {/* Main content area */}
        <div className="flex h-screen bg-background pt-[60px]">
          {/* Kaart sectie - links */}
          <div className="w-full lg:w-1/2 h-full p-6 lg:p-8">
            <VacatureMap
              filters={filters}
              vacatures={vacatures}
              selectedVacature={selectedVacature}
              onSelectVacature={handleSelectVacature}
              onClick={handleMapClick}
              onDrag={handleMapInteraction}
              onZoom={handleMapInteraction}
              hoveredVacature={hoveredVacature}
              onHoverVacature={handleHoverVacature}
              onMapBoundsChange={handleMapBoundsChange}
            />
          </div>

          {/* Vacature detail sectie - alleen tonen als er een vacature geselecteerd is */}
          {selectedVacature && (
            <div className="w-full lg:w-1/2 h-full p-6 lg:p-8">
              <div className="h-full bg-white rounded-2xl shadow-lg overflow-y-auto">
                <div className="p-6 lg:p-8">
                  {!showSollicitatieForm ? (
                    // Vacature details
                    <>
                      {/* Vacature header */}
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedVacature.titel}</h2>
                          <p className="text-purple-600 font-medium text-lg">{selectedVacature.bedrijven?.naam || 'Onbekend bedrijf'}</p>
                        </div>
                        <button
                          onClick={() => setSelectedVacature(null)}
                          className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Vacature details grid */}
                      <div className="grid grid-cols-1 gap-4 mb-6">
                        <div className="flex items-center text-gray-600">
                          <FiMapPin className="w-5 h-5 mr-3 text-purple-500" />
                          <span className="font-medium">{selectedVacature.locatie}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FiBriefcase className="w-5 h-5 mr-3 text-purple-500" />
                          <span className="font-medium">{getNiveauLabel(selectedVacature.niveau)}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FiClock className="w-5 h-5 mr-3 text-purple-500" />
                          <span className="font-medium">{getContractLabel(selectedVacature.contract)}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="w-5 h-5 mr-3 text-purple-500 font-bold">€</span>
                          <span className="font-medium text-lg">{selectedVacature.salaris}</span>
                        </div>
                      </div>

                      {/* Vacature type badge */}
                      <div className="mb-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          selectedVacature.type === 'fulltime' ? 'bg-green-100 text-green-800' :
                          selectedVacature.type === 'parttime' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {getTypeLabel(selectedVacature.type)}
                        </span>
                      </div>

                      {/* Vacature beschrijving */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Over deze vacature</h3>
                        <p className="text-gray-700 leading-relaxed">{selectedVacature.intro}</p>
                      </div>

                      {/* Volledige vacature beschrijving */}
                      {selectedVacature.beschrijving && (
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Functieomschrijving</h3>
                          <div 
                            className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: selectedVacature.beschrijving }}
                          />
                        </div>
                      )}

                      {/* Vacature details */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Vacature details</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Geplaatst op:</span>
                            <span className="font-medium">{new Date(selectedVacature.datum).toLocaleDateString('nl-NL')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Status:</span>
                            <span className="font-medium capitalize">{selectedVacature.status}</span>
                          </div>
                        </div>
                      </div>

                      {/* Vereisten sectie */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Wat vragen wij van jou?</h3>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start">
                            <span className="text-purple-500 mr-2">•</span>
                            <span>Ervaring in facility management of een gerelateerd vakgebied</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-500 mr-2">•</span>
                            <span>Sterke communicatieve vaardigheden</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-500 mr-2">•</span>
                            <span>Proactieve en resultaatgerichte werkwijze</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-purple-500 mr-2">•</span>
                            <span>Goede beheersing van de Nederlandse taal</span>
                          </li>
                        </ul>
                      </div>

                      {/* Wat bieden wij sectie */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Wat bieden wij jou?</h3>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Competitief salaris en goede secundaire arbeidsvoorwaarden</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Uitdagende en afwisselende werkzaamheden</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Mogelijkheden voor persoonlijke ontwikkeling</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Dynamische werkomgeving in het centrum van Amsterdam</span>
                          </li>
                        </ul>
                      </div>

                      {/* Contact informatie */}
                      {selectedVacature.contactpersoon && (
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact</h3>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between">
                              <span>Contactpersoon:</span>
                              <span className="font-medium">{selectedVacature.contactpersoon}</span>
                            </div>
                            {selectedVacature.contactemail && (
                              <div className="flex justify-between">
                                <span>E-mail:</span>
                                <a href={`mailto:${selectedVacature.contactemail}`} className="font-medium text-purple-600 hover:text-purple-700">
                                  {selectedVacature.contactemail}
                                </a>
                              </div>
                            )}
                            {selectedVacature.contacttelefoon && (
                              <div className="flex justify-between">
                                <span>Telefoon:</span>
                                <a href={`tel:${selectedVacature.contacttelefoon}`} className="font-medium text-purple-600 hover:text-purple-700">
                                  {selectedVacature.contacttelefoon}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Actie knoppen */}
                      <div className="space-y-3">
                        <button
                          onClick={() => setShowSollicitatieForm(true)}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 px-6 rounded-lg font-medium transition-colors"
                        >
                          Solliciteer nu
                        </button>
                        <button
                          onClick={() => setSelectedVacature(null)}
                          className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Terug naar overzicht
                        </button>
                      </div>
                    </>
                  ) : (
                    // Sollicitatie formulier
                    <>
                      {/* Formulier header */}
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Direct solliciteren</h2>
                          <p className="text-purple-600 font-medium text-lg">{selectedVacature.titel} - {selectedVacature.bedrijven?.naam}</p>
                        </div>
                        <button
                          onClick={() => setShowSollicitatieForm(false)}
                          className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Sollicitatie formulier */}
                      <form onSubmit={handleSollicitatieSubmit} className="space-y-6">
                        <div>
                          <label htmlFor="naam" className="block text-sm font-medium text-gray-700 mb-2">
                            Naam *
                          </label>
                          <input
                            type="text"
                            id="naam"
                            name="naam"
                            required
                            value={sollicitatieForm.naam}
                            onChange={handleSollicitatieFormChange}
                            placeholder="Je volledige naam"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            E-mailadres *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={sollicitatieForm.email}
                            onChange={handleSollicitatieFormChange}
                            placeholder="je@email.nl"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="telefoon" className="block text-sm font-medium text-gray-700 mb-2">
                            Telefoonnummer
                          </label>
                          <input
                            type="tel"
                            id="telefoon"
                            name="telefoon"
                            value={sollicitatieForm.telefoon}
                            onChange={handleSollicitatieFormChange}
                            placeholder="06 12345678"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
                            LinkedIn profiel
                          </label>
                          <input
                            type="url"
                            id="linkedin"
                            name="linkedin"
                            value={sollicitatieForm.linkedin}
                            onChange={handleSollicitatieFormChange}
                            placeholder="https://linkedin.com/in/jouwprofiel"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="motivatie" className="block text-sm font-medium text-gray-700 mb-2">
                            Korte motivatie
                          </label>
                          <textarea
                            id="motivatie"
                            name="motivatie"
                            rows={4}
                            value={sollicitatieForm.motivatie}
                            onChange={handleSollicitatieFormChange}
                            placeholder="Waarom ben je geïnteresseerd in deze functie?"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                          />
                        </div>

                        {/* Formulier knoppen */}
                        <div className="space-y-3">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white text-center py-3 px-6 rounded-lg font-medium transition-colors"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block"></div>
                                Versturen...
                              </>
                            ) : (
                              'Solliciteer nu'
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowSollicitatieForm(false)}
                            className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Terug naar vacature
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Vacatures sectie - rechts (alleen tonen als geen vacature geselecteerd) */}
          {!selectedVacature && (
            <div className="w-full lg:w-1/2 h-full flex flex-col bg-gray-50">
              {/* Filter sectie - vast bovenaan */}
              <div className="p-6 lg:p-8 bg-gray-50 flex-shrink-0">
                {/* Zoek- en filter sectie */}
                <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Locatie filter */}
                    <div>
                      <select
                        value={filters.locatie}
                        onChange={(e) => handleFilterChange('locatie', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Alle locaties</option>
                        {getUniqueLocations().map(location => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Niveau filter */}
                    <div>
                      <select
                        value={filters.niveau}
                        onChange={(e) => handleFilterChange('niveau', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Alle niveaus</option>
                        <option value="stage">Stage</option>
                        <option value="junior">Junior</option>
                        <option value="senior">Senior</option>
                      </select>
                    </div>
                  </div>

                  {/* Filter knoppen */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleFilterChange('type', 'fulltime')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          filters.type === 'fulltime'
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Fulltime
                      </button>
                      <button
                        onClick={() => handleFilterChange('type', 'parttime')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          filters.type === 'parttime'
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Parttime
                      </button>
                      <button
                        onClick={() => handleFilterChange('type', 'stage')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          filters.type === 'stage'
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Stage
                      </button>
                    </div>

                    <button
                      onClick={clearFilters}
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      Filters wissen
                    </button>
                  </div>
                </div>

                {/* Resultaten teller */}
                <div className="mb-6">
                  <p className="text-gray-600">
                    {filteredVacatures.length} vacature{filteredVacatures.length !== 1 ? 's' : ''} gevonden
                    {mapBounds && (
                      <span className="text-sm text-purple-600 ml-2">
                        (in zichtbare kaart regio)
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Scrollbare vacature lijst */}
              <div className="flex-1 overflow-y-auto px-4 lg:px-6 pb-4">
                {/* Loading state */}
                {isLoading && (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Vacatures laden...</p>
                  </div>
                )}

                {/* Vacature overzicht */}
                {!isLoading && (
                  <div className="space-y-4">
                    {filteredVacatures.map((vacature) => (
                      <div 
                        key={vacature.id} 
                        className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border cursor-pointer ${
                          selectedVacature?.id === vacature.id 
                            ? "border-purple-500 shadow-md bg-purple-50" 
                            : hoveredVacature?.id === vacature.id
                            ? "border-purple-300 shadow-md bg-purple-25"
                            : "border-gray-100"
                        }`}
                        onClick={() => handleSelectVacature(vacature)}
                        onMouseEnter={() => handleHoverVacature(vacature)}
                        onMouseLeave={() => handleHoverVacature(null)}
                      >
                        {/* Vacature header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <img 
                                src={vacature.logo} 
                                alt={`${vacature.bedrijven?.naam || 'Bedrijf'} logo`}
                                className="w-8 h-8 object-contain"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                              <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center text-purple-600 font-bold text-sm" style={{display: 'none'}}>
                                {(vacature.bedrijven?.naam || 'B').charAt(0)}
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 text-lg">{vacature.titel}</h3>
                              <p className="text-purple-600 font-medium">{vacature.bedrijven?.naam || 'Onbekend bedrijf'}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            vacature.type === 'fulltime' ? 'bg-green-100 text-green-800' :
                            vacature.type === 'parttime' ? 'bg-blue-100 text-blue-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {getTypeLabel(vacature.type)}
                          </span>
                        </div>

                        {/* Vacature details */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-gray-600">
                            <FiMapPin className="w-4 h-4 mr-2" />
                            <span>{vacature.locatie}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <FiBriefcase className="w-4 h-4 mr-2" />
                            <span>{getNiveauLabel(vacature.niveau)}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <FiClock className="w-4 h-4 mr-2" />
                            <span>{getContractLabel(vacature.contract)}</span>
                          </div>
                        </div>

                        {/* Intro tekst */}
                        <p className="text-gray-700 mb-4 line-clamp-2">{vacature.intro}</p>

                        {/* Salaris */}
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm text-gray-500">{vacature.salaris}</span>
                        </div>

                        {/* Actie knop */}
                        <div className="flex">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectVacature(vacature);
                            }}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors"
                          >
                            Bekijk vacature
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Geen resultaten */}
                {filteredVacatures.length === 0 && !isLoading && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiSearch className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Geen vacatures gevonden</h3>
                    <p className="text-gray-600 mb-4">
                      Probeer je zoekcriteria aan te passen of bekijk alle beschikbare vacatures.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Alle filters wissen
                    </button>
                  </div>
                )}

                {/* Vacature alerts inschrijving */}
                <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 text-center">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Blijf op de hoogte van nieuwe vacatures
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Schrijf je in voor onze vacature-alerts en ontvang als eerste de nieuwste facilitaire vacatures direct in je inbox.
                  </p>
                  
                    <a 
                      href="https://subscribepage.io/vacature-alert"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                    >
                      Inschrijven voor alerts
                    </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
