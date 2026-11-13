import PageHero from '@/components/shared/PageHero';
import SplitSection from '@/components/shared/SplitSection';
import IconCardGrid from '@/components/shared/IconCardGrid';
import InfoCard from '@/components/shared/InfoCard';
import CtaStrip from '@/components/shared/CtaStrip';
import EnquiryForm from '@/components/shared/EnquiryForm';
import SectionTitle from '@/components/ui/SectionTitle';
import Img from '@/components/ui/Img';
import ExpoSnapshot from '@/components/expo/ExpoSnapshot';
import ExpoZones from '@/components/expo/ExpoZones';
import { aboutExpo, expectColumns, expoHighlights, stallFormFields, whyExhibit } from '@/data/expo';
import { images } from '@/config/images';

export const metadata = { title: 'Real Estate Expo' };

export default function ExpoPage() {
  return (
    <>
      <PageHero title="Real Estate" highlight="Expo 2026" subtitle="Connect. Collaborate. Grow." image={images.expo.hero} side={<ExpoSnapshot />} />
      <section className="section section--white">
        <div className="container">
          <SectionTitle sub={aboutExpo.text}>{aboutExpo.title}</SectionTitle>
          <IconCardGrid items={aboutExpo.features} columns={6} />
        </div>
      </section>
      <section className="section">
        <div className="container layout-2">
          <div className="card">
            <SplitSection image={whyExhibit.image} imageAlt="Exhibition hall" imageHeight={240}>
              <h2 className="card__title">{whyExhibit.title}</h2>
              <ul className="stack" style={{ fontSize: 'var(--fs-sm)' }}>{whyExhibit.points.map((p) => <li key={p}>&#10003; {p}</li>)}</ul>
            </SplitSection>
          </div>
          <div className="card">
            <h2 className="card__title">{expoHighlights.title}</h2>
            <IconCardGrid items={expoHighlights.items} columns={3} />
          </div>
        </div>
      </section>
      <ExpoZones />
      <section className="section section--white">
        <div className="container layout-3">
          {expectColumns.map((c) => <InfoCard key={c.title} title={c.title} items={c.items} />)}
        </div>
        <div className="container" style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '.8rem' }}>
          {images.expo.gallery.map((src, i) => <Img key={src} src={src} alt={`Expo gallery ${i + 1}`} style={{ height: 120, borderRadius: 12 }} />)}
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <EnquiryForm id="stall-form" type="expo_stall" title="Be a part of Hyderabad's biggest real estate expo" intro="Book your stall and we will confirm availability and pricing." fields={stallFormFields} submitLabel="Book my stall" successMessage="Thank you! Our expo team will contact you shortly." />
        </div>
      </section>
      <CtaStrip />
    </>
  );
}
