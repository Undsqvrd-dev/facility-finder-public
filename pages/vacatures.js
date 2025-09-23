import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { FiMapPin, FiBriefcase, FiClock, FiFilter, FiSearch } from 'react-icons/fi';

// Dynamisch importeren van de vacature kaart component
const VacatureMap = dynamic(() => import("../src/components/VacatureMap"), { ssr: false });

// Mock data voor vacatures (fallback als API niet werkt)
const mockVacatures = [
  {
    id: 1,
    titel: "Facility Manager",
    bedrijfsnaam: "Facilicom",
    logo: "/logos/facilicom.png",
    locatie: "Amsterdam",
    type: "fulltime",
    niveau: "senior",
    intro: "Wij zoeken een ervaren Facility Manager voor het beheer van onze kantoorlocaties in Amsterdam.",
    status: "actief",
    beschrijving: "<h3>Over de functie</h3><p>Als Facility Manager ben je verantwoordelijk voor het dagelijks beheer van onze kantoorlocaties in Amsterdam.</p>",
    lat: "52.3676",
    lng: "4.9041",
    datum: "2024-01-15"
  },
  {
    id: 2,
    titel: "Stagiair Facility Services",
    bedrijfsnaam: "Hollandia",
    logo: "/logos/hollandia.png",
    locatie: "Rotterdam",
    type: "stage",
    niveau: "starter",
    intro: "Interessante stage bij een toonaangevend facility management bedrijf.",
    status: "actief",
    beschrijving: "<h3>Over de functie</h3><p>Als stagiair Facility Services krijg je de kans om kennis te maken met alle aspecten van facility management.</p>",
    lat: "51.9244",
    lng: "4.4777",
    datum: "2024-01-10"
  },
  {
    id: 3,
    titel: "Junior Facility Coordinator",
    bedrijfsnaam: "Flexim",
    logo: "/logos/flexim.png",
    locatie: "Utrecht",
    type: "parttime",
    niveau: "junior",
    intro: "Start je carrière in de facilitaire sector als Junior Facility Coordinator.",
    status: "actief",
    beschrijving: "<h3>Over de functie</h3><p>Als Junior Facility Coordinator ben je het eerste aanspreekpunt voor alle facilitaire vragen van onze medewerkers.</p>",
    lat: "52.0907",
    lng: "5.1214",
    datum: "2024-01-12"
  }
];

export default function Vacatures() {
  const [vacatures, setVacatures] = useState([]);
  const [filteredVacatures, setFilteredVacatures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    niveau: '',
    type: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
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
  const [popupHeight, setPopupHeight] = useState(35); // percentage van viewport height
  const hoverTimeoutRef = useRef(null);

  // Cleanup hover timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

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
        
        if (data && data.length > 0) {
          // Controleer of de data geldige coördinaten heeft
          const validVacatures = data.filter(vacature => {
            const lat = parseFloat(vacature.lat);
            const lng = parseFloat(vacature.lng);
            const hasValidCoords = vacature.lat && vacature.lng && 
                                  !isNaN(lat) && !isNaN(lng) && 
                                  isFinite(lat) && isFinite(lng);
            
            // Skip vacatures zonder geldige coördinaten
            return hasValidCoords;
          });
          
          if (validVacatures.length > 0) {
            setVacatures(validVacatures);
            setFilteredVacatures(validVacatures);
          } else {
            // Fallback naar mock data
            setVacatures(mockVacatures);
            setFilteredVacatures(mockVacatures);
          }
        } else {
          // Fallback naar mock data
          setVacatures(mockVacatures);
          setFilteredVacatures(mockVacatures);
        }
      } else {
        // API niet beschikbaar, gebruik mock data
        setVacatures(mockVacatures);
        setFilteredVacatures(mockVacatures);
      }
    } catch (error) {
      console.error('Fout bij ophalen van vacatures:', error);
      // Gebruik mock data als fallback
      setVacatures(mockVacatures);
      setFilteredVacatures(mockVacatures);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter vacatures op basis van filters en kaart bounds
  useEffect(() => {
    let filtered = vacatures.filter(vacature => {
      const matchesNiveau = !filters.niveau || vacature.niveau === filters.niveau;
      const matchesType = !filters.type || vacature.type === filters.type;

      // Filter op basis van kaart bounds (als beschikbaar)
      let matchesMapBounds = true;
      if (mapBounds && vacature.lat && vacature.lng) {
        const lat = parseFloat(vacature.lat);
        const lng = parseFloat(vacature.lng);
        
        matchesMapBounds = lat >= mapBounds.south && lat <= mapBounds.north && 
                          lng >= mapBounds.west && lng <= mapBounds.east;
      }

      return matchesNiveau && matchesType && matchesMapBounds;
    });

    setFilteredVacatures(filtered);
  }, [filters, vacatures, mapBounds]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Handlers voor kaart interactie
  const handleSelectVacature = (vacature) => {
    setSelectedVacature(vacature);
  };

  const handleHoverVacature = (vacature) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    if (vacature) {
      // Immediate hover
      setHoveredVacature(vacature);
    } else {
      // Delayed clear on mouse out
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredVacature(null);
      }, 150); // Iets langere delay voor lijst items
    }
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
    
    console.log('=== SOLICITATIE FORMULIER GESTART (OVERZICHT) ===');
    console.log('Selected vacature:', selectedVacature);
    console.log('Selected vacature ID:', selectedVacature?.id);
    
    if (!selectedVacature?.id) {
      alert('Geen vacature geselecteerd. Selecteer eerst een vacature.');
      setIsSubmitting(false);
      return;
    }
    
    try {
      const response = await fetch('/api/solliciteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...sollicitatieForm,
          vacatureId: selectedVacature.id
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
      
      // Toon mooie success bericht
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 8000);
      
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
      case 'starter': return 'Starter';
      case 'junior': return 'Junior';
      case 'medior': return 'Medior';
      case 'senior': return 'Senior';
      default: return niveau;
    }
  };

  // Touch/drag handlers voor popup
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setStartHeight(popupHeight);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = startY - currentY; // Omgekeerd omdat omhoog slepen positief moet zijn
    const viewportHeight = window.innerHeight;
    const deltaHeight = (deltaY / viewportHeight) * 100;
    
    let newHeight = startHeight + deltaHeight;
    newHeight = Math.max(30, Math.min(90, newHeight)); // Tussen 30% en 90%
    
    setPopupHeight(newHeight);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    // Snap naar logische posities
    if (popupHeight < 30) {
      setPopupHeight(25);
    } else if (popupHeight < 50) {
      setPopupHeight(selectedVacature ? 70 : 35);
    } else if (popupHeight < 80) {
      setPopupHeight(70);
    } else {
      setPopupHeight(90);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setStartHeight(popupHeight);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const currentY = e.clientY;
    const deltaY = startY - currentY;
    const viewportHeight = window.innerHeight;
    const deltaHeight = (deltaY / viewportHeight) * 100;
    
    let newHeight = startHeight + deltaHeight;
    newHeight = Math.max(30, Math.min(90, newHeight));
    
    setPopupHeight(newHeight);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    if (popupHeight < 30) {
      setPopupHeight(25);
    } else if (popupHeight < 50) {
      setPopupHeight(selectedVacature ? 70 : 35);
    } else if (popupHeight < 80) {
      setPopupHeight(70);
    } else {
      setPopupHeight(90);
    }
  };

  // Effect voor mouse events op document
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, startY, startHeight, popupHeight]);

  // Update popup height wanneer vacature wordt geselecteerd
  useEffect(() => {
    if (selectedVacature && popupHeight < 70) {
      setPopupHeight(70);
    } else if (!selectedVacature && popupHeight > 35) {
      setPopupHeight(35);
    }
  }, [selectedVacature]);

  return (
    <>
      <Head>
        <title>Vacatures - Facility Finder</title>
        <meta name="description" content="Vind je droombaan in de facilitaire sector. Bekijk alle beschikbare vacatures en solliciteer direct." />
      </Head>

      <div className="flex flex-col h-screen bg-background">
        {/* Header */}
        <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 px-6 flex justify-between items-center z-50 shadow-md">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-semibold">Vacatures</span>
            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
              BETA
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="/" 
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Terug naar Facility Finder
            </a>
          </div>
        </header>

        {/* Success bericht */}
        {submitSuccess && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md mx-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Je aanvraag is verzonden!
                  </h3>
                  <p className="text-sm text-green-700 mt-1">
                    We komen zo snel mogelijk bij je in de lucht.
                  </p>
                  <p className="text-xs text-green-600 mt-2">
                    Dit contactformulier is volledig vrijblijvend, je solliciteert nog niet officieel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main content area */}
        <div className="h-screen bg-background pt-[60px]">
          {/* Desktop layout */}
          <div className="hidden lg:flex w-full h-full">
            {/* Kaart sectie - links */}
            <div className="w-1/2 h-full p-6 lg:p-8">
              {vacatures.length > 0 ? (
                <div className="relative h-full">
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
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100 rounded-2xl">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Kaart wordt geladen...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Vacature detail sectie - alleen tonen als er een vacature geselecteerd is */}
            {selectedVacature && (
              <div className="w-1/2 h-full p-6 lg:p-8">
                <div className="h-full bg-white rounded-2xl shadow-lg overflow-y-auto">
                  <div className="p-6 lg:p-8">
                    {!showSollicitatieForm ? (
                      // Vacature details
                      <>
                        {/* Vacature header */}
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedVacature.titel}</h2>
                            <p className="text-purple-600 font-medium text-lg">{selectedVacature.bedrijfsnaam || 'Onbekend bedrijf'}</p>
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

                        {/* Vacature intro */}
                        <div className="mb-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Over deze vacature</h3>
                          <p className="text-gray-700 leading-relaxed mb-4">{selectedVacature.intro}</p>
                          
                          {/* Volledige beschrijving */}
                          {selectedVacature.beschrijving && (
                            <div 
                              className="text-gray-700 leading-relaxed vacature-content"
                              dangerouslySetInnerHTML={{ __html: selectedVacature.beschrijving }}
                            />
                          )}
                        </div>

                        {/* Actie knoppen */}
                        <div className="space-y-3">
                          <button
                            onClick={() => setShowSollicitatieForm(true)}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 px-6 rounded-lg font-medium transition-colors"
                          >
                            Meer informatie aanvragen
                          </button>
                          <button
                            onClick={() => setSelectedVacature(null)}
                            className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Terug naar overzicht
                          </button>
                          
                          {/* Disclaimer */}
                          <p className="text-xs text-gray-500 text-center mt-3 leading-relaxed">
                            Het eerste contact is vrijblijvend en nog geen officiële sollicitatie
                          </p>
                        </div>
                      </>
                    ) : (
                      // Sollicitatie formulier
                      <>
                        {/* Formulier header */}
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Contactformulier</h2>
                            <p className="text-purple-600 font-medium text-lg">{selectedVacature.titel} - {selectedVacature.bedrijfsnaam}</p>
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
                              Telefoonnummer *
                            </label>
                            <input
                              type="tel"
                              id="telefoon"
                              name="telefoon"
                              required
                              value={sollicitatieForm.telefoon}
                              onChange={handleSollicitatieFormChange}
                              placeholder="06 12345678"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
                              LinkedIn profiel *
                            </label>
                            <input
                              type="url"
                              id="linkedin"
                              name="linkedin"
                              required
                              value={sollicitatieForm.linkedin}
                              onChange={handleSollicitatieFormChange}
                              placeholder="https://linkedin.com/in/jouwprofiel"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label htmlFor="motivatie" className="block text-sm font-medium text-gray-700 mb-2">
                              Korte motivatie *
                            </label>
                            <textarea
                              id="motivatie"
                              name="motivatie"
                              required
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
                                'Meer informatie aanvragen'
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowSollicitatieForm(false)}
                              className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              Terug naar vacature
                            </button>
                            
                            {/* Disclaimer */}
                            <p className="text-xs text-gray-500 text-center mt-3 leading-relaxed">
                              Het eerste contact is vrijblijvend en nog geen officiële sollicitatie
                            </p>
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
              <div className="w-1/2 h-full flex flex-col bg-gray-50">
                {/* Filter sectie - vast bovenaan */}
                <div className="p-6 lg:p-8 bg-gray-50 flex-shrink-0">
                  {/* Zoek- en filter sectie */}
                  <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Niveau filter */}
                      <div>
                        <select
                          value={filters.niveau}
                          onChange={(e) => handleFilterChange('niveau', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">Alle niveaus</option>
                          <option value="starter">Starter</option>
                          <option value="junior">Junior</option>
                          <option value="medior">Medior</option>
                          <option value="senior">Senior</option>
                        </select>
                      </div>

                      {/* Type filter */}
                      <div>
                        <select
                          value={filters.type}
                          onChange={(e) => handleFilterChange('type', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">Alle types</option>
                          <option value="fulltime">Fulltime</option>
                          <option value="parttime">Parttime</option>
                          <option value="stage">Stage</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Resultaten teller */}
                  <div className="mb-2">
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
                                  alt={`${vacature.bedrijfsnaam || 'Bedrijf'} logo`}
                                  className="w-8 h-8 object-contain"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                                <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center text-purple-600 font-bold text-sm" style={{display: 'none'}}>
                                  {(vacature.bedrijfsnaam || 'B').charAt(0)}
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900 text-lg">{vacature.titel}</h3>
                                <p className="text-purple-600 font-medium">{vacature.bedrijfsnaam || 'Onbekend bedrijf'}</p>
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
                          </div>

                          {/* Intro tekst */}
                          <p className="text-gray-700 mb-4 line-clamp-2">{vacature.intro}</p>

                          {/* Datum */}
                          <div className="flex justify-end items-center mb-4">
                            <span className="text-sm text-gray-500">
                              {new Date(vacature.datum).toLocaleDateString('nl-NL')}
                            </span>
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

                  {/* Geen resultaten - alleen vacature alert CTA */}
                  {filteredVacatures.length === 0 && !isLoading && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiSearch className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Geen vacatures gevonden</h3>
                      <p className="text-gray-600 mb-8">
                        Probeer je zoekcriteria aan te passen of bekijk alle beschikbare vacatures.
                      </p>
                    </div>
                  )}

                  {/* Vacature alerts inschrijving */}
                  <div className={`${filteredVacatures.length === 0 && !isLoading ? 'mt-4' : 'mt-8'} bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 text-center`}>
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

          {/* Mobile layout */}
          <div className="lg:hidden w-full h-full relative">
            {/* Fullscreen kaart */}
            <div className="absolute inset-0">
              {vacatures.length > 0 ? (
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
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Kaart wordt geladen...</p>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom popup - vacature lijst of details */}
            <div 
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-40 flex flex-col transition-all duration-200 ease-out select-none"
              style={{
                height: `${popupHeight}vh`,
                minHeight: '200px'
              }}
            >
              {/* Drag handle - sleepbaar */}
              <div 
                className="flex justify-center py-4 cursor-grab active:cursor-grabbing hover:bg-gray-50 rounded-t-3xl touch-none"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
              >
                <div className={`w-12 h-1.5 rounded-full transition-colors ${
                  isDragging ? 'bg-purple-400' : 'bg-gray-300'
                }`}></div>
              </div>

              {selectedVacature ? (
                /* Vacature details */
                <div className="flex-1 overflow-y-auto px-6 pb-6">
                  {!showSollicitatieForm ? (
                    <>
                      {/* Vacature header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedVacature.titel}</h2>
                          <p className="text-purple-600 font-medium">{selectedVacature.bedrijfsnaam || 'Onbekend bedrijf'}</p>
                        </div>
                        <button
                          onClick={() => setSelectedVacature(null)}
                          className="text-gray-400 hover:text-gray-600 p-2 ml-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Vacature details */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center text-gray-600 text-sm">
                          <FiMapPin className="w-4 h-4 mr-2 text-purple-500" />
                          <span>{selectedVacature.locatie}</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <FiBriefcase className="w-4 h-4 mr-2 text-purple-500" />
                          <span>{getNiveauLabel(selectedVacature.niveau)}</span>
                        </div>
                      </div>

                      {/* Type badge */}
                      <div className="mb-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          selectedVacature.type === 'fulltime' ? 'bg-green-100 text-green-800' :
                          selectedVacature.type === 'parttime' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {getTypeLabel(selectedVacature.type)}
                        </span>
                      </div>

                      {/* Intro */}
                      <div className="mb-4">
                        <p className="text-gray-700 text-sm leading-relaxed mb-3">{selectedVacature.intro}</p>
                        
                        {/* Volledige beschrijving */}
                        {selectedVacature.beschrijving && (
                          <div 
                            className="text-gray-700 text-sm leading-relaxed vacature-content"
                            dangerouslySetInnerHTML={{ __html: selectedVacature.beschrijving }}
                          />
                        )}
                      </div>

                     {/* CTA knoppen */}
                     <div className="space-y-3 pt-4">
                       <button
                         onClick={() => setShowSollicitatieForm(true)}
                         className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                       >
                         Meer informatie aanvragen
                       </button>
                       <button
                         onClick={() => setSelectedVacature(null)}
                         className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                       >
                         Terug naar overzicht
                       </button>
                       
                       {/* Disclaimer */}
                       <p className="text-xs text-gray-500 text-center mt-3 leading-relaxed">
                         Het eerste contact is vrijblijvend en nog geen officiële sollicitatie
                       </p>
                     </div>
                    </>
                  ) : (
                    /* Sollicitatie formulier - mobile version */
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900">Contactformulier</h3>
                        <button
                          onClick={() => setShowSollicitatieForm(false)}
                          className="text-gray-400 hover:text-gray-600 p-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <form onSubmit={handleSollicitatieSubmit} className="space-y-4">
                        <input
                          type="text"
                          name="naam"
                          required
                          value={sollicitatieForm.naam}
                          onChange={handleSollicitatieFormChange}
                          placeholder="Je volledige naam"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        />
                        <input
                          type="email"
                          name="email"
                          required
                          value={sollicitatieForm.email}
                          onChange={handleSollicitatieFormChange}
                          placeholder="je@email.nl"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        />
                        <input
                          type="tel"
                          name="telefoon"
                          required
                          value={sollicitatieForm.telefoon}
                          onChange={handleSollicitatieFormChange}
                          placeholder="06 12345678"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        />
                        <input
                          type="url"
                          name="linkedin"
                          required
                          value={sollicitatieForm.linkedin}
                          onChange={handleSollicitatieFormChange}
                          placeholder="https://linkedin.com/in/jouwprofiel"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        />
                        <textarea
                          name="motivatie"
                          required
                          rows={3}
                          value={sollicitatieForm.motivatie}
                          onChange={handleSollicitatieFormChange}
                          placeholder="Waarom ben je geïnteresseerd in deze functie?"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
                        />
                        <div className="space-y-2 pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                          >
                            {isSubmitting ? 'Versturen...' : 'Meer informatie aanvragen'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowSollicitatieForm(false)}
                            className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Terug
                          </button>
                          
                          {/* Disclaimer */}
                          <p className="text-xs text-gray-500 text-center mt-3 leading-relaxed">
                            Het eerste contact is vrijblijvend en nog geen officiële sollicitatie
                          </p>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              ) : (
                /* Vacature lijst */
                <div className="flex-1 overflow-y-auto">
                  {/* Header met filter */}
                  <div className="px-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">Vacatures</h3>
                      <span className="text-sm text-gray-600">
                        {filteredVacatures.length} gevonden
                      </span>
                    </div>
                    
                    {/* Quick filters */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <select
                        value={filters.niveau}
                        onChange={(e) => handleFilterChange('niveau', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      >
                        <option value="">Alle niveaus</option>
                        <option value="starter">Starter</option>
                        <option value="junior">Junior</option>
                        <option value="medior">Medior</option>
                        <option value="senior">Senior</option>
                      </select>
                      <select
                        value={filters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      >
                        <option value="">Alle types</option>
                        <option value="fulltime">Fulltime</option>
                        <option value="parttime">Parttime</option>
                        <option value="stage">Stage</option>
                      </select>
                    </div>
                  </div>

                  {/* Vacature lijst */}
                  <div className="px-6 pb-6 space-y-3">
                    {filteredVacatures.map((vacature) => (
                      <div 
                        key={vacature.id} 
                        className="bg-gray-50 rounded-xl p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => handleSelectVacature(vacature)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm mb-1">{vacature.titel}</h4>
                            <p className="text-purple-600 font-medium text-xs">{vacature.bedrijfsnaam || 'Onbekend bedrijf'}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            vacature.type === 'fulltime' ? 'bg-green-100 text-green-800' :
                            vacature.type === 'parttime' ? 'bg-blue-100 text-blue-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {getTypeLabel(vacature.type)}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-gray-600 text-xs mb-2">
                          <FiMapPin className="w-3 h-3 mr-1" />
                          <span>{vacature.locatie}</span>
                          <span className="mx-2">•</span>
                          <FiBriefcase className="w-3 h-3 mr-1" />
                          <span>{getNiveauLabel(vacature.niveau)}</span>
                        </div>
                        
                        <p className="text-gray-700 text-xs line-clamp-2 leading-relaxed">{vacature.intro}</p>
                      </div>
                    ))}

                    {/* Vacature alerts inschrijving - Mobile */}
                    <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 text-center">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        Blijf op de hoogte van nieuwe vacatures
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Schrijf je in voor onze vacature-alerts en ontvang als eerste de nieuwste facilitaire vacatures direct in je inbox.
                      </p>
                      
                      <a 
                        href="https://subscribepage.io/vacature-alert"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm"
                      >
                        Inschrijven voor alerts
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}