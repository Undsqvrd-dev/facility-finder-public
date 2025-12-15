import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState('overzicht');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'overzicht', label: 'Overzicht', icon: '📊' },
    {
      id: 'bedrijfsprofiel',
      label: 'Bedrijfsprofiel',
      icon: '🏢',
      submenu: [
        { id: 'persoonlijke-info', label: 'Persoonlijke informatie' },
        { id: 'bedrijfsgegevens', label: 'Algemene bedrijfsgegevens' },
        { id: 'gebruikers', label: 'Gebruikers toevoegen' },
        { id: 'vestigingen', label: 'Vestigingen' }
      ]
    },
    { id: 'dienstverlening', label: 'Dienstverlening', icon: '⚙️' },
    { id: 'vacatures', label: 'Vacatures', icon: '💼' },
    { id: 'blogs', label: 'Blogs posten', icon: '✍️' },
    { id: 'insights', label: 'Insights', icon: '📈', badge: 'Binnenkort' },
    { id: 'abonnement', label: 'Abonnement', icon: '💳' },
    { id: 'statistieken', label: 'Statistieken', icon: '📉', badge: 'Binnenkort' },
    { id: 'support', label: 'Support & Feedback', icon: '💬' }
  ];

  return (
    <>
      <Head>
        <title>Dashboard - Facility Finder</title>
      </Head>
      
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        {/* Sidebar */}
        <aside style={{
          width: sidebarOpen ? '280px' : '80px',
          background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.3s ease',
          flexShrink: 0
        }}>
          <div style={{
            padding: '20px',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              {sidebarOpen && (
                <h2 style={{ margin: 0, fontSize: '20px' }}>Facility Finder</h2>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: 'white',
                  padding: '8px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '20px'
                }}
              >
                {sidebarOpen ? '‹' : '›'}
              </button>
            </div>
          </div>

          <nav style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 10px'
          }}>
            {menuItems.map(item => (
              <div key={item.id}>
                <button
                  onClick={() => !item.submenu && !item.badge && setCurrentView(item.id)}
                  disabled={item.badge}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    background: currentView === item.id ? 'rgba(255,255,255,0.2)' : 'transparent',
                    border: 'none',
                    color: item.badge ? 'rgba(255,255,255,0.5)' : 'white',
                    borderRadius: '8px',
                    cursor: item.badge ? 'not-allowed' : 'pointer',
                    marginBottom: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    fontWeight: 500,
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    if (!item.badge && currentView !== item.id) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (currentView !== item.id) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  {sidebarOpen && (
                    <>
                      <span style={{ flex: 1 }}>{item.label}</span>
                      {item.badge && (
                        <span style={{
                          fontSize: '10px',
                          background: 'rgba(255,255,255,0.2)',
                          padding: '2px 6px',
                          borderRadius: '10px'
                        }}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>

                {sidebarOpen && item.submenu && currentView.startsWith(item.id.split('-')[0]) && (
                  <div style={{ marginLeft: '20px', marginTop: '5px', marginBottom: '10px' }}>
                    {item.submenu.map(subItem => (
                      <button
                        key={subItem.id}
                        onClick={() => setCurrentView(subItem.id)}
                        style={{
                          width: '100%',
                          padding: '8px 15px',
                          background: currentView === subItem.id ? 'rgba(255,255,255,0.15)' : 'transparent',
                          border: 'none',
                          color: 'white',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          marginBottom: '3px',
                          fontSize: '13px',
                          textAlign: 'left'
                        }}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div style={{
            padding: '20px',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            <button
              onClick={() => router.push('/')}
              style={{
                width: '100%',
                padding: '10px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: 'white',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              {sidebarOpen ? '← Naar kaart' : '←'}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{
          flex: 1,
          background: '#f8f9fa',
          overflowY: 'auto'
        }}>
          {/* Top Bar */}
          <div style={{
            background: 'white',
            padding: '20px 40px',
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h1 style={{ margin: 0, fontSize: '24px', color: '#1a1a1a' }}>
              {menuItems.find(m => m.id === currentView)?.label || 
               menuItems.flatMap(m => m.submenu || []).find(s => s.id === currentView)?.label ||
               'Dashboard'}
            </h1>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <button style={{
                padding: '8px 16px',
                background: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                🔔
              </button>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                JD
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div style={{ padding: '40px' }}>
            {currentView === 'overzicht' && <OverzichtView router={router} setCurrentView={setCurrentView} />}
            {currentView === 'persoonlijke-info' && <PersoonlijkeInfoView />}
            {currentView === 'bedrijfsgegevens' && <BedrijfsgegevensView />}
            {currentView === 'gebruikers' && <GebruikersView />}
            {currentView === 'vestigingen' && <VestigingenView />}
            {currentView === 'dienstverlening' && <DienstverleningView />}
            {currentView === 'vacatures' && <VacaturesView />}
            {currentView === 'blogs' && <BlogsView />}
            {currentView === 'abonnement' && <AbonnementView />}
            {currentView === 'support' && <SupportView />}
          </div>
        </main>
      </div>
    </>
  );
}

// Overzicht View
function OverzichtView({ router, setCurrentView }) {
  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>
          Welkom terug! 👋
        </h2>
        <p style={{ color: '#666', margin: 0 }}>
          Hier is een overzicht van je bedrijfsprofiel
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <StatCard
          icon="👀"
          title="Profielweergaven"
          value="1,234"
          change="+12%"
          changePositive={true}
        />
        <StatCard
          icon="💼"
          title="Actieve vacatures"
          value="5"
          change="+2"
          changePositive={true}
        />
        <StatCard
          icon="📝"
          title="Gepubliceerde blogs"
          value="8"
          change="+1"
          changePositive={true}
        />
        <StatCard
          icon="⭐"
          title="Gemiddelde rating"
          value="4.8"
          change="+0.2"
          changePositive={true}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '30px',
          border: '1px solid #e0e0e0'
        }}>
          <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Snelle acties</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <ActionButton
              icon="✏️"
              title="Profiel bewerken"
              description="Update je bedrijfsinformatie"
              onClick={() => setCurrentView('bedrijfsgegevens')}
            />
            <ActionButton
              icon="➕"
              title="Nieuwe vacature plaatsen"
              description="Voeg een vacature toe"
              onClick={() => setCurrentView('vacatures')}
            />
            <ActionButton
              icon="📊"
              title="Statistieken bekijken"
              description="Zie hoe je profiel presteert"
              onClick={() => alert('Statistieken komen binnenkort beschikbaar')}
            />
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '30px',
          border: '1px solid #e0e0e0'
        }}>
          <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Je profiel</h3>
          <button
            onClick={() => router.push('/')}
            style={{
              width: '100%',
              padding: '12px',
              background: '#4285f4',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: '15px'
            }}
          >
            Bekijk op kaart
          </button>
          <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
            <p style={{ marginBottom: '8px' }}>
              <strong>Volledigheid:</strong> 85%
            </p>
            <div style={{
              height: '8px',
              background: '#e0e0e0',
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '15px'
            }}>
              <div style={{
                height: '100%',
                width: '85%',
                background: '#4285f4'
              }} />
            </div>
            <p style={{ fontSize: '12px', color: '#999' }}>
              Voeg meer informatie toe om je profiel compleet te maken
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon, title, value, change, changePositive }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid #e0e0e0'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '12px'
      }}>
        <span style={{ fontSize: '32px' }}>{icon}</span>
        <span style={{
          fontSize: '12px',
          color: changePositive ? '#10b981' : '#ef4444',
          fontWeight: 600
        }}>
          {change}
        </span>
      </div>
      <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '5px' }}>
        {value}
      </div>
      <div style={{ fontSize: '13px', color: '#666' }}>
        {title}
      </div>
    </div>
  );
}

// Action Button Component
function ActionButton({ icon, title, description, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '15px',
        background: '#f8f9fa',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.2s ease'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = '#f0f0f0';
        e.currentTarget.style.borderColor = '#d0d0d0';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = '#f8f9fa';
        e.currentTarget.style.borderColor = '#e0e0e0';
      }}
    >
      <span style={{ fontSize: '24px' }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '3px' }}>
          {title}
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          {description}
        </div>
      </div>
      <span style={{ fontSize: '20px', color: '#999' }}>→</span>
    </button>
  );
}

// Persoonlijke Info View
function PersoonlijkeInfoView() {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '30px',
      border: '1px solid #e0e0e0',
      maxWidth: '800px'
    }}>
      <h3 style={{ fontSize: '20px', marginBottom: '25px' }}>Persoonlijke informatie</h3>
      
      <FormField label="Voornaam" value="John" />
      <FormField label="Achternaam" value="Doe" />
      <FormField label="E-mailadres" value="john@voorbeeld.nl" type="email" />
      <FormField label="Telefoonnummer" value="+31 6 12345678" />
      <FormField label="Functie" value="Facility Manager" />
      
      <button style={{
        padding: '12px 24px',
        background: '#4285f4',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        marginTop: '20px'
      }}
        onClick={() => alert('Wijzigingen opgeslagen!')}
      >
        Wijzigingen opslaan
      </button>
    </div>
  );
}

// Bedrijfsgegevens View
function BedrijfsgegevensView() {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '30px',
      border: '1px solid #e0e0e0',
      maxWidth: '800px'
    }}>
      <h3 style={{ fontSize: '20px', marginBottom: '25px' }}>Algemene bedrijfsgegevens</h3>
      
      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', marginBottom: '12px', fontWeight: 600, fontSize: '14px' }}>
          Bedrijfslogo
        </label>
        <div style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            background: '#f8f9fa',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #e0e0e0',
            fontSize: '48px'
          }}>
            🏢
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="logo-upload"
            />
            <label
              htmlFor="logo-upload"
              style={{
                padding: '10px 20px',
                background: '#4285f4',
                color: 'white',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                display: 'inline-block'
              }}
            >
              Upload logo
            </label>
            <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
              PNG, JPG of SVG, max 2MB
            </p>
          </div>
        </div>
      </div>

      <FormField label="Bedrijfsnaam" value="UNDSQVRD B.V." />
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>
          Algemene beschrijving
        </label>
        <textarea
          defaultValue="Wij zijn een innovatief facilitair bedrijf gespecialiseerd in duurzame schoonmaakoplossingen."
          rows={4}
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
      </div>
      <FormField label="Adres" value="Keizersgracht 123" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <FormField label="Postcode" value="1015 AA" />
        <FormField label="Plaats" value="Amsterdam" />
      </div>
      <FormField label="Website" value="https://www.undsqvrd.nl" type="url" />
      <FormField label="Algemeen telefoonnummer" value="+31 20 123 4567" />
      <FormField label="Algemeen e-mailadres" value="info@undsqvrd.nl" type="email" />
      
      <div style={{ display: 'flex', gap: '12px', marginTop: '25px' }}>
        <button style={{
          padding: '12px 24px',
          background: '#4285f4',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer'
        }}
          onClick={() => alert('Wijzigingen opgeslagen!')}
        >
          Wijzigingen opslaan
        </button>
        <button style={{
          padding: '12px 24px',
          background: 'white',
          color: '#666',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer'
        }}>
          Annuleren
        </button>
      </div>
    </div>
  );
}

// Gebruikers View
function GebruikersView() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@undsqvrd.nl', role: 'Admin', avatar: 'JD' },
    { id: 2, name: 'Jane Smith', email: 'jane@undsqvrd.nl', role: 'Sales', avatar: 'JS' },
    { id: 3, name: 'Mike Johnson', email: 'mike@undsqvrd.nl', role: 'Recruitment', avatar: 'MJ' }
  ]);

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px'
      }}>
        <div>
          <h3 style={{ fontSize: '20px', marginBottom: '5px' }}>Gebruikers</h3>
          <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
            Beheer teamleden en hun toegangsrechten
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            padding: '12px 20px',
            background: '#4285f4',
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
          <span>+</span> Gebruiker toevoegen
        </button>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e0e0e0',
        overflow: 'hidden'
      }}>
        {users.map((user, index) => (
          <div
            key={user.id}
            style={{
              padding: '20px',
              borderBottom: index < users.length - 1 ? '1px solid #e0e0e0' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                {user.avatar}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '3px' }}>
                  {user.name}
                </div>
                <div style={{ fontSize: '13px', color: '#666' }}>
                  {user.email}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{
                padding: '4px 12px',
                background: '#f0f0f0',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600
              }}>
                {user.role}
              </span>
              <button style={{
                padding: '8px 16px',
                background: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px'
              }}>
                Bewerken
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
          <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Gebruiker toevoegen</h3>
          <FormField label="Naam" placeholder="Voornaam Achternaam" />
          <FormField label="E-mailadres" placeholder="naam@bedrijf.nl" type="email" />
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>
              Rol
            </label>
            <select style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '14px'
            }}>
              <option>Admin</option>
              <option>Sales</option>
              <option>Recruitment</option>
              <option>Marketing</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => {
                setUsers([...users, {
                  id: users.length + 1,
                  name: 'Nieuwe Gebruiker',
                  email: 'nieuw@undsqvrd.nl',
                  role: 'Sales',
                  avatar: 'NG'
                }]);
                setShowAddModal(false);
              }}
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
            >
              Toevoegen
            </button>
            <button
              onClick={() => setShowAddModal(false)}
              style={{
                flex: 1,
                padding: '12px',
                background: 'white',
                color: '#666',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Annuleren
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// Vestigingen View - This continues in next message due to length
function VestigingenView() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [vestigingen, setVestigingen] = useState([
    { id: 1, name: 'Hoofdvestiging Amsterdam', address: 'Keizersgracht 123, 1015 AA Amsterdam', isHoofd: true },
    { id: 2, name: 'Vestiging Rotterdam', address: 'Coolsingel 45, 3011 AD Rotterdam', isHoofd: false },
    { id: 3, name: 'Vestiging Utrecht', address: 'Oudegracht 234, 3511 NL Utrecht', isHoofd: false }
  ]);

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px'
      }}>
        <div>
          <h3 style={{ fontSize: '20px', marginBottom: '5px' }}>Vestigingen</h3>
          <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
            Beheer je hoofdvestiging en andere locaties
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            padding: '12px 20px',
            background: '#4285f4',
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
          <span>+</span> Vestiging toevoegen
        </button>
      </div>

      <div style={{
        display: 'grid',
        gap: '15px'
      }}>
        {vestigingen.map(vestiging => (
          <div
            key={vestiging.id}
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              border: vestiging.isHoofd ? '2px solid #4285f4' : '1px solid #e0e0e0'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
                    {vestiging.name}
                  </h4>
                  {vestiging.isHoofd && (
                    <span style={{
                      padding: '3px 10px',
                      background: '#e3f2fd',
                      color: '#1565c0',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 600
                    }}>
                      Hoofdvestiging
                    </span>
                  )}
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                  📍 {vestiging.address}
                </p>
              </div>
              <button style={{
                padding: '8px 16px',
                background: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px'
              }}>
                Bewerken
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
          <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Vestiging toevoegen</h3>
          <FormField label="Naam vestiging" placeholder="Bijv. Vestiging Den Haag" />
          <FormField label="Adres" placeholder="Straatnaam 123" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <FormField label="Postcode" placeholder="1234 AB" />
            <FormField label="Plaats" placeholder="Amsterdam" />
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '25px' }}>
            <button
              onClick={() => {
                setVestigingen([...vestigingen, {
                  id: vestigingen.length + 1,
                  name: 'Nieuwe Vestiging',
                  address: 'Nieuwe straat 1, 1234 AB Plaats',
                  isHoofd: false
                }]);
                setShowAddModal(false);
              }}
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
            >
              Toevoegen
            </button>
            <button
              onClick={() => setShowAddModal(false)}
              style={{
                flex: 1,
                padding: '12px',
                background: 'white',
                color: '#666',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Annuleren
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// Dienstverlening View
function DienstverleningView() {
  const [diensten] = useState([
    { id: 1, type: 'Operationele diensten', categories: ['Schoonmaak & Hygiëne', 'Catering & Foodservices'], status: 'Actief' },
    { id: 2, type: 'Advies (consultancy)', categories: ['Duurzaamheid & Circulariteit'], status: 'Actief' }
  ]);

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px'
      }}>
        <div>
          <h3 style={{ fontSize: '20px', marginBottom: '5px' }}>Dienstverlening</h3>
          <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
            Beheer je diensten, categorieën, specialismen en certificeringen
          </p>
        </div>
        <button
          onClick={() => alert('Dienst toevoegen - deze functie opent het dienstverlening formulier')}
          style={{
            padding: '12px 20px',
            background: '#4285f4',
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
          <span>+</span> Dienst toevoegen
        </button>
      </div>

      <div style={{ display: 'grid', gap: '15px' }}>
        {diensten.map(dienst => (
          <div
            key={dienst.id}
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #e0e0e0'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
                    {dienst.type}
                  </h4>
                  <span style={{
                    padding: '3px 10px',
                    background: '#e8f5e9',
                    color: '#2e7d32',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 600
                  }}>
                    {dienst.status}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                  {dienst.categories.length} {dienst.categories.length === 1 ? 'categorie' : 'categorieën'}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {dienst.categories.map((cat, idx) => (
                    <span key={idx} style={{
                      padding: '4px 10px',
                      background: '#f0f0f0',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}>
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              <button style={{
                padding: '8px 16px',
                background: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px'
              }}
                onClick={() => alert('Bewerk functionaliteit')}
              >
                Bewerken
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Vacatures View
function VacaturesView() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [vacatures, setVacatures] = useState([
    { id: 1, title: 'Facility Manager', location: 'Amsterdam', type: 'Fulltime', status: 'Actief', views: 234, sollicitaties: 12 },
    { id: 2, title: 'Schoonmaker', location: 'Rotterdam', type: 'Parttime', status: 'Actief', views: 567, sollicitaties: 28 },
    { id: 3, title: 'Receptionist', location: 'Utrecht', type: 'Fulltime', status: 'Concept', views: 0, sollicitaties: 0 }
  ]);

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px'
      }}>
        <div>
          <h3 style={{ fontSize: '20px', marginBottom: '5px' }}>Vacatures</h3>
          <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
            Plaats en beheer je vacatures
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            padding: '12px 20px',
            background: '#4285f4',
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
          <span>+</span> Vacature plaatsen
        </button>
      </div>

      <div style={{ display: 'grid', gap: '15px' }}>
        {vacatures.map(vacature => (
          <div
            key={vacature.id}
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #e0e0e0'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
                    {vacature.title}
                  </h4>
                  <span style={{
                    padding: '3px 10px',
                    background: vacature.status === 'Actief' ? '#e8f5e9' : '#f0f0f0',
                    color: vacature.status === 'Actief' ? '#2e7d32' : '#666',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 600
                  }}>
                    {vacature.status}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                  📍 {vacature.location} • {vacature.type}
                </p>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <span style={{ fontSize: '13px', color: '#666' }}>
                    👀 {vacature.views} weergaven
                  </span>
                  <span style={{ fontSize: '13px', color: '#4285f4', fontWeight: 600 }}>
                    📨 {vacature.sollicitaties} sollicitaties
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  padding: '8px 16px',
                  background: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
                  onClick={() => alert('Bewerk vacature')}
                >
                  Bewerken
                </button>
                <button style={{
                  padding: '8px 16px',
                  background: 'white',
                  border: '1px solid #ffcdd2',
                  color: '#d32f2f',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
                  onClick={() => {
                    if (confirm('Weet je zeker dat je deze vacature wilt verwijderen?')) {
                      setVacatures(vacatures.filter(v => v.id !== vacature.id));
                    }
                  }}
                >
                  Verwijderen
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)} width="700px">
          <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Vacature plaatsen</h3>
          <FormField label="Functietitel" placeholder="Bijv. Facility Manager" />
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>
              Functieomschrijving
            </label>
            <textarea
              placeholder="Beschrijf de functie en taken..."
              rows={5}
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
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <FormField label="Locatie" placeholder="Amsterdam" />
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>
                Type dienstverband
              </label>
              <select style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px'
              }}>
                <option>Fulltime</option>
                <option>Parttime</option>
                <option>Freelance</option>
                <option>Stage</option>
              </select>
            </div>
          </div>
          <FormField label="Salarisindicatie" placeholder="€2500 - €3500 per maand" />
          <div style={{ display: 'flex', gap: '12px', marginTop: '25px' }}>
            <button
              onClick={() => {
                setVacatures([...vacatures, {
                  id: vacatures.length + 1,
                  title: 'Nieuwe Vacature',
                  location: 'Amsterdam',
                  type: 'Fulltime',
                  status: 'Actief',
                  views: 0,
                  sollicitaties: 0
                }]);
                setShowAddModal(false);
              }}
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
            >
              Publiceren
            </button>
            <button
              onClick={() => alert('Opgeslagen als concept')}
              style={{
                padding: '12px 24px',
                background: 'white',
                color: '#666',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Concept
            </button>
            <button
              onClick={() => setShowAddModal(false)}
              style={{
                padding: '12px 24px',
                background: 'white',
                color: '#666',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Annuleren
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// Blogs View
function BlogsView() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [blogs, setBlogs] = useState([
    { id: 1, title: '5 Tips voor Duurzame Schoonmaak', status: 'Gepubliceerd', date: '12 dec 2024', views: 1234, likes: 45 },
    { id: 2, title: 'De Toekomst van Facility Management', status: 'Gepubliceerd', date: '8 dec 2024', views: 856, likes: 32 },
    { id: 3, title: 'Hoe kies je de juiste leverancier?', status: 'Concept', date: '10 dec 2024', views: 0, likes: 0 }
  ]);

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px'
      }}>
        <div>
          <h3 style={{ fontSize: '20px', marginBottom: '5px' }}>Blogs</h3>
          <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
            Deel je kennis en expertise met de community
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            padding: '12px 20px',
            background: '#4285f4',
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
          <span>+</span> Nieuw blog
        </button>
      </div>

      <div style={{ display: 'grid', gap: '15px' }}>
        {blogs.map(blog => (
          <div
            key={blog.id}
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #e0e0e0'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
                    {blog.title}
                  </h4>
                  <span style={{
                    padding: '3px 10px',
                    background: blog.status === 'Gepubliceerd' ? '#e8f5e9' : '#f0f0f0',
                    color: blog.status === 'Gepubliceerd' ? '#2e7d32' : '#666',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 600
                  }}>
                    {blog.status}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                  📅 {blog.date} • 👀 {blog.views} lezers • ❤️ {blog.likes} likes
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  padding: '8px 16px',
                  background: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
                  onClick={() => alert('Bewerk blog')}
                >
                  Bewerken
                </button>
                <button style={{
                  padding: '8px 16px',
                  background: '#0077b5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
                  onClick={() => alert('Gedeeld op LinkedIn!')}
                >
                  Delen
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)} width="700px">
          <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Nieuw blog</h3>
          <FormField label="Titel" placeholder="Geef je blog een pakkende titel" />
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>
              Uitgelichte afbeelding
            </label>
            <input
              type="file"
              accept="image/*"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px'
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>
              Inhoud
            </label>
            <textarea
              placeholder="Schrijf je blog hier..."
              rows={10}
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
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>
              Tags
            </label>
            <input
              type="text"
              placeholder="Bijv. schoonmaak, duurzaamheid, tips"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => {
                setBlogs([...blogs, {
                  id: blogs.length + 1,
                  title: 'Nieuw Blog Artikel',
                  status: 'Gepubliceerd',
                  date: new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' }),
                  views: 0,
                  likes: 0
                }]);
                setShowAddModal(false);
              }}
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
            >
              Publiceren
            </button>
            <button 
              onClick={() => alert('Opgeslagen als concept')}
              style={{
                padding: '12px 24px',
                background: 'white',
                color: '#666',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Concept
            </button>
            <button
              onClick={() => setShowAddModal(false)}
              style={{
                padding: '12px 24px',
                background: 'white',
                color: '#666',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Annuleren
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// Abonnement View
function AbonnementView() {
  const [currentPlan] = useState('Core Specialist');
  const plans = [
    { name: 'Core Specialist', price: 500, current: true, dienstvormen: 1, categories: 1 },
    { name: 'Extended Specialist', price: 800, current: false, dienstvormen: 1, categories: 3 },
    { name: 'Service Provider', price: 1100, current: false, dienstvormen: 2, categories: 3 },
    { name: 'Advanced Provider', price: 1400, current: false, dienstvormen: 3, categories: 3 },
    { name: 'Multi Service', price: 1900, current: false, dienstvormen: 'Onbeperkt', categories: 5 }
  ];

  const addons = [
    { name: 'Priority Support', price: 150, description: '24/7 support met reactietijd < 2 uur', active: false },
    { name: 'Extra gebruikers', price: 50, description: 'Per extra gebruiker per maand', active: false },
    { name: 'Custom branding', price: 300, description: 'Je eigen huisstijl in je profiel', active: false }
  ];

  return (
    <div>
      <h3 style={{ fontSize: '20px', marginBottom: '25px' }}>Abonnement beheren</h3>

      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '30px',
        border: '1px solid #e0e0e0',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
          <div>
            <h4 style={{ fontSize: '18px', marginBottom: '5px' }}>Huidig abonnement</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#4285f4', margin: '10px 0' }}>
              {currentPlan}
            </p>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
              €500 per jaar • Verlengt automatisch op 12 januari 2026
            </p>
          </div>
          <button style={{
            padding: '10px 20px',
            background: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600
          }}
            onClick={() => alert('Facturen worden gedownload...')}
          >
            📄 Facturen bekijken
          </button>
        </div>
        
        <div style={{
          background: '#f8f9fa',
          padding: '15px',
          borderRadius: '8px'
        }}>
          <h5 style={{ fontSize: '14px', marginBottom: '10px', fontWeight: 600 }}>Inbegrepen:</h5>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#666' }}>
            <li>1 vorm van dienstverlening</li>
            <li>1 categorie per vorm</li>
            <li>Logo uploaden & Verified badge</li>
            <li>Uitgebreid bedrijfsprofiel</li>
            <li>Onbeperkt specialismen tonen</li>
          </ul>
        </div>
      </div>

      <h4 style={{ fontSize: '18px', marginBottom: '20px' }}>Upgrade je abonnement</h4>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '15px',
        marginBottom: '40px'
      }}>
        {plans.filter(p => !p.current).map(plan => (
          <div
            key={plan.name}
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #e0e0e0',
              textAlign: 'center'
            }}
          >
            <h5 style={{ fontSize: '16px', marginBottom: '10px', fontWeight: 600 }}>{plan.name}</h5>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '5px' }}>
              €{plan.price}
            </div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>
              per jaar
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '20px', textAlign: 'left' }}>
              • {plan.dienstvormen} {typeof plan.dienstvormen === 'number' && plan.dienstvormen === 1 ? 'dienstvorm' : 'dienstvormen'}<br/>
              • {plan.categories} {plan.categories === 1 ? 'categorie' : 'categorieën'}
            </div>
            <button style={{
              width: '100%',
              padding: '10px',
              background: '#4285f4',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
              onClick={() => {
                if (confirm(`Weet je zeker dat je wilt upgraden naar ${plan.name} voor €${plan.price} per jaar?`)) {
                  alert(`Geüpgraded naar ${plan.name}!`);
                }
              }}
            >
              Upgraden
            </button>
          </div>
        ))}
      </div>

      <h4 style={{ fontSize: '18px', marginBottom: '20px' }}>Add-ons</h4>
      <div style={{ display: 'grid', gap: '15px' }}>
        {addons.map(addon => (
          <div
            key={addon.name}
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #e0e0e0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ flex: 1 }}>
              <h5 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '5px' }}>
                {addon.name}
              </h5>
              <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
                {addon.description}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>€{addon.price}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>per jaar</div>
              </div>
              <button style={{
                padding: '8px 16px',
                background: addon.active ? '#e0e0e0' : '#4285f4',
                color: addon.active ? '#666' : 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600
              }}
                onClick={() => alert(`${addon.name} ${addon.active ? 'verwijderd' : 'toegevoegd'}!`)}
              >
                {addon.active ? 'Verwijderen' : 'Toevoegen'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Support View
function SupportView() {
  const [activeTab, setActiveTab] = useState('faq');
  
  const faqs = [
    {
      question: 'Hoe wijzig ik mijn bedrijfsgegevens?',
      answer: 'Ga naar Bedrijfsprofiel > Algemene bedrijfsgegevens om je informatie te wijzigen. Vergeet niet op "Wijzigingen opslaan" te klikken.'
    },
    {
      question: 'Hoe plaats ik een vacature?',
      answer: 'Navigeer naar Vacatures en klik op "Vacature plaatsen". Vul de details in zoals functietitel, omschrijving en locatie, en klik op "Publiceren".'
    },
    {
      question: 'Hoe upgrade ik mijn abonnement?',
      answer: 'Ga naar Abonnement en kies een hoger pakket. De upgrade gaat direct in en je wordt pro-rata gefactureerd voor de resterende periode.'
    },
    {
      question: 'Hoe voeg ik een nieuwe vestiging toe?',
      answer: 'Ga naar Bedrijfsprofiel > Vestigingen en klik op "Vestiging toevoegen". Vul de gegevens in en sla op.'
    },
    {
      question: 'Kan ik meerdere gebruikers toevoegen?',
      answer: 'Ja! Ga naar Bedrijfsprofiel > Gebruikers toevoegen. Je kunt teamleden toevoegen met verschillende rollen zoals Admin, Sales of Recruitment.'
    },
    {
      question: 'Hoe kan ik mijn diensten aanpassen?',
      answer: 'Ga naar Dienstverlening om je diensten, categorieën, specialismen en certificeringen te beheren.'
    },
    {
      question: 'Wat gebeurt er als ik mijn abonnement opzeg?',
      answer: 'Je profiel blijft zichtbaar tot het einde van de lopende periode. Daarna wordt je profiel automatisch gearchiveerd.'
    },
    {
      question: 'Hoe werk ik samen met mijn team in het dashboard?',
      answer: 'Voeg teamleden toe via Bedrijfsprofiel > Gebruikers. Elk lid kan inloggen met zijn eigen account en toegang krijgen op basis van zijn rol.'
    }
  ];

  return (
    <div>
      <h3 style={{ fontSize: '20px', marginBottom: '25px' }}>Support & Feedback</h3>

      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '25px',
        borderBottom: '1px solid #e0e0e0'
      }}>
        {[
          { id: 'faq', label: 'Veelgestelde vragen' },
          { id: 'feedback', label: 'Feedback geven' },
          { id: 'contact', label: 'Contact' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 24px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #4285f4' : '2px solid transparent',
              color: activeTab === tab.id ? '#4285f4' : '#666',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'faq' && (
        <div style={{ maxWidth: '800px' }}>
          {faqs.map((faq, index) => (
            <details
              key={index}
              style={{
                background: 'white',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '10px',
                border: '1px solid #e0e0e0',
                cursor: 'pointer'
              }}
            >
              <summary style={{
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                listStyle: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                {faq.question}
                <span style={{ color: '#999' }}>▼</span>
              </summary>
              <p style={{
                marginTop: '12px',
                fontSize: '14px',
                color: '#666',
                lineHeight: '1.6',
                marginBottom: 0
              }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      )}

      {activeTab === 'feedback' && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '30px',
          border: '1px solid #e0e0e0',
          maxWidth: '600px'
        }}>
          <h4 style={{ fontSize: '18px', marginBottom: '20px' }}>We horen graag van je!</h4>
          <FormField label="Onderwerp" placeholder="Waar gaat je feedback over?" />
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>
              Type feedback
            </label>
            <select style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '14px'
            }}>
              <option>Bug melding</option>
              <option>Feature verzoek</option>
              <option>Algemene feedback</option>
              <option>Compliment</option>
            </select>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>
              Je feedback
            </label>
            <textarea
              placeholder="Vertel ons wat je denkt..."
              rows={6}
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
          </div>
          <button style={{
            padding: '12px 24px',
            background: '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
            onClick={() => alert('Bedankt voor je feedback! We nemen contact op als dat nodig is.')}
          >
            Feedback versturen
          </button>
        </div>
      )}

      {activeTab === 'contact' && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '30px',
          border: '1px solid #e0e0e0',
          maxWidth: '600px'
        }}>
          <h4 style={{ fontSize: '18px', marginBottom: '20px' }}>Neem contact op</h4>
          <div style={{ fontSize: '14px', lineHeight: '2', color: '#666' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <strong>E-mail:</strong> 
              <a href="mailto:support@facilityfinder.nl" style={{ color: '#4285f4' }}>
                support@facilityfinder.nl
              </a>
            </p>
            <p><strong>Telefoon:</strong> +31 20 123 4567</p>
            <p><strong>Openingstijden:</strong> Ma-Vr 09:00 - 17:00</p>
            <p style={{ marginTop: '20px', background: '#f0f7ff', padding: '15px', borderRadius: '8px' }}>
              💡 <strong>Tip:</strong> We reageren meestal binnen 24 uur op je bericht.
            </p>
          </div>
          <button style={{
            padding: '12px 24px',
            background: '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
            onClick={() => window.location.href = 'mailto:support@facilityfinder.nl'}
          >
            📧 E-mail versturen
          </button>
        </div>
      )}
    </div>
  );
}

// Modal Component
function Modal({ children, onClose, width = '500px' }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '30px',
          width: '100%',
          maxWidth: width,
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

// Form Field Component
function FormField({ label, value, type = 'text', placeholder = '' }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>
        {label}
      </label>
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '12px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          fontSize: '14px'
        }}
      />
    </div>
  );
}

