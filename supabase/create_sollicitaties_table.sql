-- Maak sollicitaties tabel aan
CREATE TABLE IF NOT EXISTS sollicitaties (
  id SERIAL PRIMARY KEY,
  vacature_id INTEGER NOT NULL REFERENCES vacatures(id) ON DELETE CASCADE,
  naam VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefoon VARCHAR(50) NOT NULL,
  linkedin TEXT NOT NULL,
  motivatie TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'nieuw' CHECK (status IN ('nieuw', 'beoordeeld', 'uitgenodigd', 'afgewezen', 'aangenomen')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Maak indexen voor betere performance
CREATE INDEX IF NOT EXISTS idx_sollicitaties_vacature_id ON sollicitaties(vacature_id);
CREATE INDEX IF NOT EXISTS idx_sollicitaties_email ON sollicitaties(email);
CREATE INDEX IF NOT EXISTS idx_sollicitaties_status ON sollicitaties(status);
CREATE INDEX IF NOT EXISTS idx_sollicitaties_created_at ON sollicitaties(created_at);

-- Maak RLS (Row Level Security) policies
ALTER TABLE sollicitaties ENABLE ROW LEVEL SECURITY;

-- Policy: Iedereen kan sollicitaties aanmaken
CREATE POLICY "Iedereen kan sollicitaties aanmaken" ON sollicitaties
  FOR INSERT WITH CHECK (true);

-- Policy: Alleen geauthenticeerde gebruikers kunnen sollicitaties lezen (voor admin)
CREATE POLICY "Geauthenticeerde gebruikers kunnen sollicitaties lezen" ON sollicitaties
  FOR SELECT USING (auth.role() = 'authenticated');

-- Policy: Alleen geauthenticeerde gebruikers kunnen sollicitaties updaten (voor admin)
CREATE POLICY "Geauthenticeerde gebruikers kunnen sollicitaties updaten" ON sollicitaties
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Maak trigger voor updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_sollicitaties_updated_at 
  BEFORE UPDATE ON sollicitaties 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Voeg commentaar toe
COMMENT ON TABLE sollicitaties IS 'Tabel voor het opslaan van sollicitaties op vacatures';
COMMENT ON COLUMN sollicitaties.vacature_id IS 'Referentie naar de vacature waarop wordt gesolliciteerd';
COMMENT ON COLUMN sollicitaties.status IS 'Status van de sollicitatie: nieuw, beoordeeld, uitgenodigd, afgewezen, aangenomen';
COMMENT ON COLUMN sollicitaties.motivatie IS 'Motivatiebrief van de sollicitant';
