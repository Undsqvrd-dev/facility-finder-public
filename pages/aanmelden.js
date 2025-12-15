import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { categories } from "../data/categories";

const PACKAGES = [
  {
    id: 'free',
    name: 'Gratis',
    price: 0,
    dienstvormen: 1,
    categories: 1,
    features: [
      '1 vorm van dienstverlening',
      '1 categorie per vorm',
      'Specialismen tonen',
      'Certificeringen tonen',
      'Logo uploaden'
    ]
  },
  {
    id: 'core',
    name: 'Core Specialist',
    price: 500,
    dienstvormen: 1,
    categories: 1,
    features: [
      '1 vorm van dienstverlening',
      '1 categorie per vorm',
      'Specialismen tonen',
      'Certificeringen tonen',
      'Logo uploaden',
      'Link naar website',
      'Uitgebreid bedrijfsprofiel',
      'Verified badge op profiel'
    ],
    popular: true
  },
  {
    id: 'extended',
    name: 'Extended Specialist',
    price: 800,
    dienstvormen: 1,
    categories: 3,
    features: [
      '1 vorm van dienstverlening',
      '3 categorieën per vorm',
      'Specialismen tonen',
      'Certificeringen tonen',
      'Logo uploaden',
      'Link naar website',
      'Uitgebreid bedrijfsprofiel',
      'Verified badge op profiel'
    ]
  },
  {
    id: 'service',
    name: 'Service Provider',
    price: 1100,
    dienstvormen: 2,
    categories: 3,
    features: [
      '2 vormen van dienstverlening',
      '3 categorieën per vorm',
      'Specialismen tonen',
      'Certificeringen tonen',
      'Logo uploaden',
      'Link naar website',
      'Uitgebreid bedrijfsprofiel',
      'Verified badge op profiel'
    ]
  },
  {
    id: 'advanced',
    name: 'Advanced Provider',
    price: 1400,
    dienstvormen: 3,
    categories: 3,
    features: [
      '3 vormen van dienstverlening',
      '3 categorieën per vorm',
      'Specialismen tonen',
      'Certificeringen tonen',
      'Logo uploaden',
      'Link naar website',
      'Uitgebreid bedrijfsprofiel',
      'Verified badge op profiel'
    ]
  },
  {
    id: 'multi',
    name: 'Multi Service',
    price: 1900,
    dienstvormen: 999,
    categories: 5,
    features: [
      'Onbeperkte dienstvormen',
      '5 categorieën per vorm',
      'Specialismen tonen',
      'Certificeringen tonen',
      'Logo uploaden',
      'Link naar website',
      'Uitgebreid bedrijfsprofiel',
      'Verified badge op profiel',
      'Premium support'
    ]
  }
];

const SERVICE_TYPES = [
  'Advies (consultancy)',
  'Operationele diensten',
  'Integrated FM',
  'Detachering / Interim',
  'Project management',
  'Software Tools',
  'Product leverancier'
];

const SERVICE_CATEGORIES = Object.entries(categories).map(([slug, data]) => ({
  slug,
  title: data.title,
  description: data.description,
  specialismen: data.specialismen || [],
  certificeringen: data.certificeringen || []
}));

const PROVINCIES = [
  'Noord-Holland',
  'Zuid-Holland',
  'Utrecht',
  'Gelderland',
  'Noord-Brabant',
  'Limburg',
  'Overijssel',
  'Flevoland',
  'Groningen',
  'Friesland',
  'Drenthe',
  'Zeeland'
];

export default function Aanmelden() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    package: null,
    account: {
      bedrijfsnaam: '',
      voornaam: '',
      achternaam: '',
      telefoonnummer: '',
      email: ''
    },
    bedrijfsinfo: {
      logo: null,
      omschrijving: '',
      locaties: '',
      website: ''
    },
    diensten: []
  });

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const addDienst = () => {
    const currentDiensten = formData.diensten.length;
    const maxDiensten = formData.package?.dienstvormen === 999 ? 999 : formData.package?.dienstvormen || 1;
    
    if (currentDiensten < maxDiensten) {
      setFormData(prev => ({
        ...prev,
        diensten: [...prev.diensten, {
          diensttype: '',
          categories: [], // Array van category objecten
          werkgebied: 'heel-nederland',
          provincies: [],
          omschrijving: '',
          foto: null
        }]
      }));
    }
  };

  const updateDienst = (index, data) => {
    if (data === null) {
      // Delete dienst
      setFormData(prev => ({
        ...prev,
        diensten: prev.diensten.filter((_, i) => i !== index)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        diensten: prev.diensten.map((d, i) => i === index ? { ...d, ...data } : d)
      }));
    }
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <>
      <Head>
        <title>Aanmelden - Facility Finder</title>
      </Head>
      
      <div style={{ 
        height: '100vh', 
        background: '#f8f9fa',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <header style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '20px 40px',
          color: 'white',
          flexShrink: 0
        }}>
          <h1 style={{ margin: 0, fontSize: '24px' }}>Facility Finder</h1>
        </header>

        {/* Progress Bar */}
        {currentStep < 7 && (
          <div style={{
            background: 'white',
            padding: '20px 40px',
            borderBottom: '1px solid #e0e0e0',
            flexShrink: 0
          }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}>
                {['Pakket', 'Account', 'Betaling', 'Bedrijfsinfo', 'Diensten', 'Bevestiging'].map((label, index) => (
                  <div key={index} style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: '12px',
                    color: currentStep > index + 1 ? '#4285f4' : currentStep === index + 1 ? '#1a1a1a' : '#999'
                  }}>
                    {label}
                  </div>
                ))}
              </div>
              <div style={{
                height: '4px',
                background: '#e0e0e0',
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  background: '#4285f4',
                  width: `${(currentStep / 6) * 100}%`,
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '40px 20px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
          {currentStep === 1 && (
            <PackageSelection
              packages={PACKAGES}
              selected={formData.package}
              onSelect={(pkg) => {
                setFormData(prev => ({ ...prev, package: pkg }));
                nextStep();
              }}
            />
          )}

          {currentStep === 2 && (
            <AccountCreation
              data={formData.account}
              onChange={(data) => updateFormData('account', data)}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {currentStep === 3 && (
            <Payment
              package={formData.package}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {currentStep === 4 && (
            <BedrijfsInfo
              data={formData.bedrijfsinfo}
              onChange={(data) => updateFormData('bedrijfsinfo', data)}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {currentStep === 5 && (
            <DienstenToevoegen
              diensten={formData.diensten}
              package={formData.package}
              onAddDienst={addDienst}
              onUpdateDienst={updateDienst}
              serviceTypes={SERVICE_TYPES}
              serviceCategories={SERVICE_CATEGORIES}
              provincies={PROVINCIES}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {currentStep === 6 && (
            <Success
              bedrijfsnaam={formData.account.bedrijfsnaam}
            />
          )}
          </div>
        </div>
      </div>
    </>
  );
}

// Step 1: Package Selection  
function PackageSelection({ packages, selected, onSelect }) {
  const router = useRouter();
  
  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <button
          onClick={() => router.push('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            fontSize: '14px',
            cursor: 'pointer',
            color: '#666'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#f8f8f8';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'white';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Terug naar kaart
        </button>
      </div>
      
      <h2 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '32px' }}>
        Kies jouw pakket
      </h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>
        Selecteer het pakket dat het beste bij jouw organisatie past
      </p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        marginTop: '30px',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        {packages.map(pkg => (
          <div
            key={pkg.id}
            onClick={() => onSelect(pkg)}
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '30px',
              border: pkg.popular ? '2px solid #4285f4' : '1px solid #e0e0e0',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              position: 'relative',
              boxShadow: pkg.popular ? '0 4px 12px rgba(66, 133, 244, 0.15)' : 'none'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = pkg.popular ? '0 4px 12px rgba(66, 133, 244, 0.15)' : 'none';
            }}
          >
            {pkg.popular && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                right: '20px',
                background: '#4285f4',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600
              }}>
                Populair
              </div>
            )}
            
            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>{pkg.name}</h3>
            <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '5px' }}>
              {pkg.price === 0 ? 'Gratis' : `€${pkg.price}`}
            </div>
            {pkg.price > 0 && (
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
                per jaar
              </div>
            )}
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0' }}>
              {pkg.features.map((feature, index) => (
                <li key={index} style={{
                  padding: '8px 0',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px'
                }}>
                  <span style={{ color: '#4285f4', fontSize: '18px' }}>✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button style={{
              width: '100%',
              padding: '12px',
              background: pkg.popular ? '#4285f4' : 'white',
              color: pkg.popular ? 'white' : '#4285f4',
              border: pkg.popular ? 'none' : '2px solid #4285f4',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: '10px'
            }}>
              Kies {pkg.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Step 2: Account Creation
function AccountCreation({ data, onChange, onNext, onBack }) {
  // Voor testing: altijd valid
  const isValid = true;

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto'
    }}>
      <h2 style={{ marginBottom: '10px', fontSize: '32px' }}>Account aanmaken</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Vul je gegevens in om je account aan te maken
      </p>

      <div style={{ background: 'white', padding: '30px', borderRadius: '12px' }}>
        <FormField
          label="Bedrijfsnaam"
          value={data.bedrijfsnaam}
          onChange={(e) => onChange({ bedrijfsnaam: e.target.value })}
          placeholder="Optioneel voor testing"
        />
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <FormField
            label="Voornaam"
            value={data.voornaam}
            onChange={(e) => onChange({ voornaam: e.target.value })}
            placeholder="Optioneel voor testing"
          />
          <FormField
            label="Achternaam"
            value={data.achternaam}
            onChange={(e) => onChange({ achternaam: e.target.value })}
            placeholder="Optioneel voor testing"
          />
        </div>

        <FormField
          label="Telefoonnummer"
          type="tel"
          value={data.telefoonnummer}
          onChange={(e) => onChange({ telefoonnummer: e.target.value })}
          placeholder="Optioneel voor testing"
        />

        <FormField
          label="E-mailadres"
          type="email"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          placeholder="Optioneel voor testing"
        />

        <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
          <button
            onClick={onBack}
            style={{
              flex: 1,
              padding: '12px',
              background: 'white',
              color: '#666',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Terug
          </button>
          <button
            onClick={onNext}
            disabled={!isValid}
            style={{
              flex: 2,
              padding: '12px',
              background: isValid ? '#4285f4' : '#e0e0e0',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: isValid ? 'pointer' : 'not-allowed'
            }}
          >
            Naar betaling
          </button>
        </div>
      </div>
    </div>
  );
}

// Step 3: Payment
function Payment({ package: pkg, onNext, onBack }) {
  const [agreed, setAgreed] = useState(true); // Voor testing: standaard akkoord
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    // Simuleer betaling - sneller voor testing
    setTimeout(() => {
      setProcessing(false);
      onNext();
    }, 500);
  };

  return (
    <div style={{ 
      maxWidth: '700px', 
      margin: '0 auto'
    }}>
      <h2 style={{ marginBottom: '10px', fontSize: '32px' }}>Betaling</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Word partner van de Facility Finder
      </p>

      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Je wordt partner van de Facility Finder</h3>
        <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
          Met dit partnerschap ben je het hele jaar zichtbaar en help je mee aan het bouwen van 
          één centrale plek voor de facilitaire sector.
        </p>

        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h4 style={{ fontSize: '16px', marginBottom: '15px' }}>Wat je krijgt:</h4>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>Directe zichtbaarheid op de Facility Finder kaart</li>
            <li style={{ marginBottom: '8px' }}>Professioneel bedrijfsprofiel</li>
            <li style={{ marginBottom: '8px' }}>Bereik duizenden facilitaire professionals</li>
            <li style={{ marginBottom: '8px' }}>Deel uitmaken van het grootste facilitaire netwerk</li>
            <li>Jaarlijks partnership met volledige support</li>
          </ul>
        </div>

        <div style={{ 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          padding: '20px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Pakket: {pkg.name}</span>
            <span style={{ fontWeight: 600 }}>
              {pkg.price === 0 ? 'Gratis' : `€${pkg.price}`}
            </span>
          </div>
          {pkg.price > 0 && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#666' }}>
                <span>BTW (21%)</span>
                <span>€{(pkg.price * 0.21).toFixed(2)}</span>
              </div>
              <div style={{ 
                borderTop: '1px solid #e0e0e0', 
                marginTop: '15px', 
                paddingTop: '15px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '20px',
                fontWeight: 'bold'
              }}>
                <span>Totaal</span>
                <span>€{(pkg.price * 1.21).toFixed(2)}</span>
              </div>
            </>
          )}
        </div>

        {pkg.price > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{ marginRight: '10px', marginTop: '4px' }}
              />
              <span style={{ fontSize: '14px' }}>
                Ik ga akkoord met de algemene voorwaarden en het privacybeleid
              </span>
            </label>
          </div>
        )}

        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            onClick={onBack}
            disabled={processing}
            style={{
              flex: 1,
              padding: '12px',
              background: 'white',
              color: '#666',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: processing ? 'not-allowed' : 'pointer'
            }}
          >
            Terug
          </button>
          <button
            onClick={handlePayment}
            disabled={pkg.price > 0 ? !agreed || processing : processing}
            style={{
              flex: 2,
              padding: '12px',
              background: (pkg.price === 0 || agreed) && !processing ? '#4285f4' : '#e0e0e0',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: (pkg.price === 0 || agreed) && !processing ? 'pointer' : 'not-allowed'
            }}
          >
            {processing ? 'Verwerken...' : pkg.price === 0 ? 'Doorgaan' : 'Betalen en doorgaan'}
          </button>
        </div>
      </div>

      <div style={{ 
        background: '#e8f5e9', 
        padding: '15px', 
        borderRadius: '8px',
        fontSize: '14px',
        textAlign: 'center'
      }}>
        Na betaling ontvang je direct een bevestiging per e-mail
      </div>
    </div>
  );
}

// Step 4: Bedrijfsinfo
function BedrijfsInfo({ data, onChange, onNext, onBack }) {
  // Voor testing: altijd valid
  const isValid = true;

  return (
    <div style={{ 
      maxWidth: '700px', 
      margin: '0 auto'
    }}>
      <h2 style={{ marginBottom: '10px', fontSize: '32px' }}>Bedrijfsinformatie</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Vertel meer over je organisatie
      </p>

      <div style={{ background: 'white', padding: '30px', borderRadius: '12px' }}>
        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
            Logo uploaden
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onChange({ logo: e.target.files[0] })}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px'
            }}
          />
        </div>

        <FormField
          label="Algemene omschrijving"
          value={data.omschrijving}
          onChange={(e) => onChange({ omschrijving: e.target.value })}
          multiline
          rows={4}
          placeholder="Optioneel voor testing..."
        />

        <FormField
          label="Locaties"
          value={data.locaties}
          onChange={(e) => onChange({ locaties: e.target.value })}
          placeholder="Optioneel voor testing"
        />

        <FormField
          label="Website"
          type="url"
          value={data.website}
          onChange={(e) => onChange({ website: e.target.value })}
          placeholder="Optioneel voor testing"
        />

        <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
          <button
            onClick={onBack}
            style={{
              flex: 1,
              padding: '12px',
              background: 'white',
              color: '#666',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Terug
          </button>
          <button
            onClick={onNext}
            disabled={!isValid}
            style={{
              flex: 2,
              padding: '12px',
              background: isValid ? '#4285f4' : '#e0e0e0',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: isValid ? 'pointer' : 'not-allowed'
            }}
          >
            Diensten toevoegen
          </button>
        </div>
      </div>
    </div>
  );
}

// Step 5: Diensten toevoegen
function DienstenToevoegen({ diensten, package: pkg, onAddDienst, onUpdateDienst, serviceTypes, serviceCategories, provincies, onNext, onBack }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [savedDiensten, setSavedDiensten] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState({});
  const canAddMore = diensten.length < (pkg.dienstvormen === 999 ? 999 : pkg.dienstvormen);
  const isValid = true;

  const handleToggleDienst = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleSaveDienst = (index) => {
    if (!savedDiensten.includes(index)) {
      setSavedDiensten([...savedDiensten, index]);
    }
    setExpandedIndex(null);
  };

  const handleDeleteDienst = (index) => {
    const newSaved = savedDiensten.filter(i => i !== index).map(i => i > index ? i - 1 : i);
    setSavedDiensten(newSaved);
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
    onUpdateDienst(index, null);
  };

  const handleAddNewDienst = () => {
    onAddDienst();
    setExpandedIndex(diensten.length);
    setTimeout(() => {
      const element = document.getElementById(`dienst-${diensten.length}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleToggleCategory = (dienstIndex, categorySlug) => {
    const dienst = diensten[dienstIndex];
    const existingCategory = dienst.categories?.find(c => c.slug === categorySlug);
    
    if (existingCategory) {
      // Remove category
      onUpdateDienst(dienstIndex, {
        categories: dienst.categories.filter(c => c.slug !== categorySlug)
      });
    } else {
      // Add category with default values
      const categoryData = serviceCategories.find(c => c.slug === categorySlug);
      onUpdateDienst(dienstIndex, {
        categories: [...(dienst.categories || []), {
          slug: categorySlug,
          title: categoryData.title,
          omschrijving: '',
          specialismen: [],
          certificeringen: []
        }]
      });
    }
  };

  const handleUpdateCategory = (dienstIndex, categorySlug, data) => {
    const dienst = diensten[dienstIndex];
    onUpdateDienst(dienstIndex, {
      categories: dienst.categories.map(c => 
        c.slug === categorySlug ? { ...c, ...data } : c
      )
    });
  };

  const toggleCategoryExpanded = (dienstIndex, categorySlug) => {
    setExpandedCategory(prev => ({
      ...prev,
      [`${dienstIndex}-${categorySlug}`]: !prev[`${dienstIndex}-${categorySlug}`]
    }));
  };

  const toggleSpecialisme = (dienstIndex, categorySlug, specialisme) => {
    const dienst = diensten[dienstIndex];
    const category = dienst.categories?.find(c => c.slug === categorySlug);
    if (!category) return;

    const hasSpecialisme = category.specialismen?.includes(specialisme);
    handleUpdateCategory(dienstIndex, categorySlug, {
      specialismen: hasSpecialisme
        ? category.specialismen.filter(s => s !== specialisme)
        : [...(category.specialismen || []), specialisme]
    });
  };

  const toggleCertificering = (dienstIndex, categorySlug, certificering) => {
    const dienst = diensten[dienstIndex];
    const category = dienst.categories?.find(c => c.slug === categorySlug);
    if (!category) return;

    const hasCertificering = category.certificeringen?.includes(certificering);
    handleUpdateCategory(dienstIndex, categorySlug, {
      certificeringen: hasCertificering
        ? category.certificeringen.filter(c => c !== certificering)
        : [...(category.certificeringen || []), certificering]
    });
  };

  const toggleProvincie = (dienstIndex, provincie) => {
    const dienst = diensten[dienstIndex];
    const hasProvincie = dienst.provincies?.includes(provincie);
    
    onUpdateDienst(dienstIndex, {
      provincies: hasProvincie
        ? dienst.provincies.filter(p => p !== provincie)
        : [...(dienst.provincies || []), provincie]
    });
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto'
    }}>
      <h2 style={{ marginBottom: '10px', fontSize: '32px' }}>Diensten toevoegen</h2>
      <p style={{ color: '#666', marginBottom: '30px', lineHeight: '1.6' }}>
        Voeg hier je diensten toe zoals je ze ook aan opdrachtgevers zou uitleggen. 
        Je kunt dit later altijd aanpassen.
      </p>
      
      {diensten.length === 0 && (
        <div style={{
          background: '#f8f9fa',
          border: '2px dashed #e0e0e0',
          borderRadius: '12px',
          padding: '40px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>📋</div>
          <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#1a1a1a' }}>
            Je hebt nog geen diensten toegevoegd
          </h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Voeg minimaal één dienst toe om zichtbaar te worden op de kaart.
          </p>
        </div>
      )}

      {/* Diensten lijst - Accordion style */}
      <div style={{ marginBottom: '20px' }}>
        {diensten.map((dienst, index) => {
        const isExpanded = expandedIndex === index;
        const isSaved = savedDiensten.includes(index);
        const hasContent = dienst.diensttype && dienst.categories?.length > 0;
        const categoryCount = dienst.categories?.length || 0;
        
        return (
          <div 
            key={index} 
            id={`dienst-${index}`}
            style={{ 
              background: 'white', 
              border: isExpanded ? '2px solid #4285f4' : '1px solid #e0e0e0',
              borderRadius: '12px', 
              marginBottom: '15px',
              overflow: 'hidden',
              transition: 'all 0.2s ease'
            }}
          >
            {/* Collapsed header */}
            <div 
              onClick={() => handleToggleDienst(index)}
              style={{
                padding: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: isExpanded ? '#f8f9fa' : 'white'
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
                    {dienst.diensttype || 'Nieuwe dienst'}
                  </h3>
                  {isSaved && (
                    <span style={{
                      background: '#e8f5e9',
                      color: '#2e7d32',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 600
                    }}>
                      Actief
                    </span>
                  )}
                </div>
                {hasContent && (
                  <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                    {categoryCount} {categoryCount === 1 ? 'categorie' : 'categorieën'}
                    {dienst.werkgebied === 'heel-nederland' ? ' • Heel Nederland' : 
                     dienst.provincies?.length > 0 ? ` • ${dienst.provincies.length} provincies` : ''}
                  </p>
                )}
              </div>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none"
                style={{
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <path d="M5 7.5L10 12.5L15 7.5" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Expanded content */}
            {isExpanded && (
              <div style={{ padding: '0 20px 20px 20px' }}>
                {/* Stap 1: Kies dienstverlening */}
                <div style={{ marginBottom: '25px' }}>
                  <h4 style={{ 
                    fontSize: '12px', 
                    fontWeight: 600, 
                    color: '#999', 
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '15px'
                  }}>
                    Stap 1: Vorm van dienstverlening
                  </h4>
                  
                  <FormField
                    label="Selecteer vorm van dienstverlening"
                    value={dienst.diensttype}
                    onChange={(e) => onUpdateDienst(index, { diensttype: e.target.value })}
                    select
                    options={serviceTypes}
                  />
                </div>

                {/* Stap 2: Selecteer categorieën */}
                {dienst.diensttype && (
                  <div style={{ marginBottom: '25px' }}>
                    <h4 style={{ 
                      fontSize: '12px', 
                      fontWeight: 600, 
                      color: '#999', 
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: '10px'
                    }}>
                      Stap 2: Selecteer categorieën
                    </h4>
                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>
                      Kies één of meerdere categorieën die bij deze dienstverlening horen
                    </p>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                      gap: '10px',
                      marginBottom: '10px'
                    }}>
                      {serviceCategories.map(category => {
                        const isSelected = dienst.categories?.some(c => c.slug === category.slug);
                        return (
                          <button
                            key={category.slug}
                            type="button"
                            onClick={() => handleToggleCategory(index, category.slug)}
                            style={{
                              padding: '12px',
                              background: isSelected ? '#e3f2fd' : 'white',
                              border: isSelected ? '2px solid #4285f4' : '1px solid #e0e0e0',
                              borderRadius: '8px',
                              fontSize: '13px',
                              fontWeight: isSelected ? 600 : 400,
                              color: isSelected ? '#1565c0' : '#666',
                              cursor: 'pointer',
                              textAlign: 'left',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.background = '#f8f9fa';
                                e.currentTarget.style.borderColor = '#bdbdbd';
                              }
                            }}
                            onMouseOut={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.background = 'white';
                                e.currentTarget.style.borderColor = '#e0e0e0';
                              }
                            }}
                          >
                            {isSelected && '✓ '}{category.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Stap 3: Vul details per categorie in */}
                {dienst.categories && dienst.categories.length > 0 && (
                  <div style={{ marginBottom: '25px' }}>
                    <h4 style={{ 
                      fontSize: '12px', 
                      fontWeight: 600, 
                      color: '#999', 
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: '15px'
                    }}>
                      Stap 3: Detailleer je categorieën
                    </h4>

                    {dienst.categories.map(category => {
                      const categoryData = serviceCategories.find(c => c.slug === category.slug);
                      const isCategoryExpanded = expandedCategory[`${index}-${category.slug}`];
                      
                      return (
                        <div
                          key={category.slug}
                          style={{
                            background: '#f8f9fa',
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            marginBottom: '15px',
                            overflow: 'hidden'
                          }}
                        >
                          {/* Category header */}
                          <div
                            onClick={() => toggleCategoryExpanded(index, category.slug)}
                            style={{
                              padding: '15px',
                              cursor: 'pointer',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              background: isCategoryExpanded ? 'white' : '#f8f9fa'
                            }}
                          >
                            <h5 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>
                              {category.title}
                            </h5>
                            <svg 
                              width="16" 
                              height="16" 
                              viewBox="0 0 20 20" 
                              fill="none"
                              style={{
                                transform: isCategoryExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s ease'
                              }}
                            >
                              <path d="M5 7.5L10 12.5L15 7.5" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>

                          {/* Category details */}
                          {isCategoryExpanded && (
                            <div style={{ padding: '15px', background: 'white' }}>
                              {/* Omschrijving */}
                              <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '13px' }}>
                                  Omschrijving voor {category.title}
                                </label>
                                <textarea
                                  value={category.omschrijving || ''}
                                  onChange={(e) => handleUpdateCategory(index, category.slug, { omschrijving: e.target.value })}
                                  rows={3}
                                  placeholder={`Beschrijf specifiek wat je aanbiedt binnen ${category.title}...`}
                                  style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '6px',
                                    fontSize: '13px',
                                    fontFamily: 'inherit',
                                    resize: 'vertical'
                                  }}
                                />
                              </div>

                              {/* Specialismen */}
                              {categoryData?.specialismen && categoryData.specialismen.length > 0 && (
                                <div style={{ marginBottom: '20px' }}>
                                  <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, fontSize: '13px' }}>
                                    Specialismen
                                  </label>
                                  <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '8px'
                                  }}>
                                    {categoryData.specialismen.map(spec => {
                                      const isSelected = category.specialismen?.includes(spec);
                                      return (
                                        <button
                                          key={spec}
                                          type="button"
                                          onClick={() => toggleSpecialisme(index, category.slug, spec)}
                                          style={{
                                            padding: '6px 12px',
                                            background: isSelected ? '#4285f4' : 'white',
                                            color: isSelected ? 'white' : '#666',
                                            border: isSelected ? 'none' : '1px solid #e0e0e0',
                                            borderRadius: '16px',
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                          }}
                                          onMouseOver={(e) => {
                                            if (!isSelected) {
                                              e.currentTarget.style.background = '#f0f0f0';
                                            }
                                          }}
                                          onMouseOut={(e) => {
                                            if (!isSelected) {
                                              e.currentTarget.style.background = 'white';
                                            }
                                          }}
                                        >
                                          {spec}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              {/* Certificeringen */}
                              {categoryData?.certificeringen && categoryData.certificeringen.length > 0 && (
                                <div>
                                  <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, fontSize: '13px' }}>
                                    Certificeringen
                                  </label>
                                  <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '8px'
                                  }}>
                                    {categoryData.certificeringen.map(cert => {
                                      const isSelected = category.certificeringen?.includes(cert);
                                      return (
                                        <button
                                          key={cert}
                                          type="button"
                                          onClick={() => toggleCertificering(index, category.slug, cert)}
                                          style={{
                                            padding: '6px 12px',
                                            background: isSelected ? '#10b981' : 'white',
                                            color: isSelected ? 'white' : '#666',
                                            border: isSelected ? 'none' : '1px solid #e0e0e0',
                                            borderRadius: '16px',
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                          }}
                                          onMouseOver={(e) => {
                                            if (!isSelected) {
                                              e.currentTarget.style.background = '#f0f0f0';
                                            }
                                          }}
                                          onMouseOut={(e) => {
                                            if (!isSelected) {
                                              e.currentTarget.style.background = 'white';
                                            }
                                          }}
                                        >
                                          {cert}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Stap 4: Werkgebied */}
                {dienst.diensttype && (
                  <div style={{ marginBottom: '25px' }}>
                    <h4 style={{ 
                      fontSize: '12px', 
                      fontWeight: 600, 
                      color: '#999', 
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: '15px'
                    }}>
                      Stap 4: Werkgebied
                    </h4>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px',
                        background: dienst.werkgebied === 'heel-nederland' ? '#e3f2fd' : 'white',
                        border: dienst.werkgebied === 'heel-nederland' ? '2px solid #4285f4' : '1px solid #e0e0e0',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        marginBottom: '10px'
                      }}>
                        <input
                          type="radio"
                          name={`werkgebied-${index}`}
                          checked={dienst.werkgebied === 'heel-nederland'}
                          onChange={() => onUpdateDienst(index, { werkgebied: 'heel-nederland', provincies: [] })}
                          style={{ marginRight: '10px' }}
                        />
                        <span style={{ fontSize: '14px', fontWeight: 500 }}>Heel Nederland</span>
                      </label>

                      <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px',
                        background: dienst.werkgebied === 'specifieke-provincies' ? '#e3f2fd' : 'white',
                        border: dienst.werkgebied === 'specifieke-provincies' ? '2px solid #4285f4' : '1px solid #e0e0e0',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}>
                        <input
                          type="radio"
                          name={`werkgebied-${index}`}
                          checked={dienst.werkgebied === 'specifieke-provincies'}
                          onChange={() => onUpdateDienst(index, { werkgebied: 'specifieke-provincies' })}
                          style={{ marginRight: '10px' }}
                        />
                        <span style={{ fontSize: '14px', fontWeight: 500 }}>Specifieke provincies</span>
                      </label>
                    </div>

                    {dienst.werkgebied === 'specifieke-provincies' && (
                      <div style={{
                        background: '#f8f9fa',
                        padding: '15px',
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0'
                      }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600, fontSize: '13px' }}>
                          Selecteer provincies
                        </label>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                          gap: '8px'
                        }}>
                          {provincies.map(provincie => {
                            const isSelected = dienst.provincies?.includes(provincie);
                            return (
                              <label
                                key={provincie}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '8px',
                                  background: isSelected ? 'white' : 'transparent',
                                  border: isSelected ? '1px solid #4285f4' : 'none',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '13px'
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => toggleProvincie(index, provincie)}
                                  style={{ marginRight: '8px' }}
                                />
                                {provincie}
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    
                    <p style={{ fontSize: '12px', color: '#999', marginTop: '10px', marginBottom: '0' }}>
                      💡 Dit helpt opdrachtgevers je sneller te vinden
                    </p>
                  </div>
                )}

                {/* Acties */}
                <div style={{ 
                  display: 'flex', 
                  gap: '10px', 
                  paddingTop: '20px',
                  borderTop: '1px solid #e0e0e0'
                }}>
                  <button
                    onClick={() => handleSaveDienst(index)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: '#4285f4',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#3367d6'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#4285f4'}
                  >
                    Opslaan en inklappen
                  </button>
                  
                  <button
                    onClick={() => handleDeleteDienst(index)}
                    style={{
                      padding: '12px 20px',
                      background: 'white',
                      color: '#d32f2f',
                      border: '1px solid #ffcdd2',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#ffebee';
                      e.currentTarget.style.borderColor = '#d32f2f';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.borderColor = '#ffcdd2';
                    }}
                  >
                    Verwijderen
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      </div>

      {/* Add dienst button */}
      {canAddMore && (
        <button
          onClick={handleAddNewDienst}
          style={{
            width: '100%',
            padding: '16px',
            background: 'white',
            color: '#4285f4',
            border: '2px dashed #4285f4',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#f0f7ff';
            e.currentTarget.style.borderColor = '#3367d6';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.borderColor = '#4285f4';
          }}
        >
          <span style={{ fontSize: '20px' }}>+</span> Dienst toevoegen
        </button>
      )}

      <div style={{ display: 'flex', gap: '15px' }}>
        <button
          onClick={onBack}
          style={{
            flex: 1,
            padding: '12px',
            background: 'white',
            color: '#666',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Terug
        </button>
        <button
          onClick={onNext}
          style={{
            flex: 2,
            padding: '12px',
            background: '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Voltooien
        </button>
      </div>
    </div>
  );
}

// Step 6: Success
function Success({ bedrijfsnaam }) {
  const router = useRouter();

  return (
    <div style={{ 
      maxWidth: '700px', 
      margin: '0 auto', 
      textAlign: 'center'
    }}>
      <div style={{ 
        fontSize: '80px', 
        marginBottom: '20px',
        animation: 'bounce 1s ease-in-out'
      }}>
        🎉
      </div>
      
      <h2 style={{ fontSize: '36px', marginBottom: '15px' }}>
        Succes! Je staat live op de Facility Finder
      </h2>
      
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px', lineHeight: '1.6' }}>
        Je profiel is aangemaakt en direct zichtbaar. Welkom op dé kaart van facilitaire 
        dienstverleners in Nederland.
      </p>

      <div style={{ background: 'white', padding: '40px', borderRadius: '12px', marginBottom: '30px' }}>
        <button
          onClick={() => router.push('/dashboard')}
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '16px',
            background: '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: '20px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#3367d6';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#4285f4';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Ga naar dashboard
        </button>

        <div style={{ marginTop: '40px', paddingTop: '40px', borderTop: '1px solid #e0e0e0' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>
            Laat zien dat je op de kaart staat
          </h3>
          <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
            Sta je eenmaal op de kaart, dan mag dat gezien worden. Deel het met je netwerk en 
            vergroot je zichtbaarheid vanaf dag één.
          </p>
          
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button
              onClick={() => {
                const text = `${bedrijfsnaam} staat nu op de Facility Finder! 🎉 Bekijk ons profiel: https://facilityfinder.nl`;
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://facilityfinder.nl')}&summary=${encodeURIComponent(text)}`, '_blank');
              }}
              style={{
                padding: '12px 24px',
                background: '#0077b5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>in</span> Delen op LinkedIn
            </button>
            
            <button
              onClick={() => {
                const text = `${bedrijfsnaam} staat nu op de Facility Finder! 🎉`;
                navigator.clipboard.writeText(`${text} https://facilityfinder.nl`);
                alert('Link gekopieerd!');
              }}
              style={{
                padding: '12px 24px',
                background: 'white',
                color: '#4285f4',
                border: '2px solid #4285f4',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Link kopiëren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper: Form Field Component
function FormField({ label, value, onChange, type = 'text', required = false, multiline = false, rows = 3, select = false, options = [], placeholder = '' }) {
  return (
    <div style={{ marginBottom: '25px' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
        {label}
      </label>
      {select ? (
        <select
          value={value}
          onChange={onChange}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            fontSize: '14px'
          }}
        >
          <option value="">Selecteer...</option>
          {options.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
      ) : multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            fontSize: '14px',
            fontFamily: 'inherit',
            resize: 'vertical'
          }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            fontSize: '14px'
          }}
        />
      )}
    </div>
  );
}

