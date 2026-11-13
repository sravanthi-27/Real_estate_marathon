import PageHero from '@/components/shared/PageHero';
import StatsBand from '@/components/shared/StatsBand';
import IconCardGrid from '@/components/shared/IconCardGrid';
import SplitSection from '@/components/shared/SplitSection';
import Leaderboard from '@/components/shared/Leaderboard';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import FinisherReceives from '@/components/why/FinisherReceives';
import PlantationPartners from '@/components/why/PlantationPartners';
import CollectiveImpact from '@/components/why/CollectiveImpact';
import RegisterBanner from '@/components/why/RegisterBanner';
import { greenChallenge, reasons, runForPlanet, whyStats } from '@/data/why';
import { images } from '@/config/images';

export const metadata = { title: 'Why Participate' };

export default function WhyParticipatePage() {
  return (
    <>
      <PageHero title="Why" highlight="Participate?" subtitle="More than a run. It's a movement. One runner. One tree. One better tomorrow." image={images.why.hero}>
        <div style={{ marginTop: '1.2rem' }}><Button href="/register">Register now</Button></div>
      </PageHero>
      <StatsBand items={whyStats} light />
      <section className="section section--white">
        <div className="container">
          <SectionTitle>Top Reasons to Participate</SectionTitle>
          <IconCardGrid items={reasons} columns={6} highlightIndex={4} />
        </div>
      </section>
      <section className="section">
        <div className="container layout-2">
          <div className="card">
            <SplitSection image={runForPlanet.image} imageAlt="Tree plantation" imageHeight={220}>
              <h2 className="card__title">{runForPlanet.title}</h2>
              <ul className="stack" style={{ fontSize: 'var(--fs-sm)' }}>{runForPlanet.points.map((p) => <li key={p}>&#10003; {p}</li>)}</ul>
            </SplitSection>
          </div>
          <FinisherReceives />
        </div>
      </section>
      <section className="section section--white">
        <div className="container layout-3">
          <PlantationPartners />
          <Leaderboard title={greenChallenge.title} columns={greenChallenge.columns} rows={greenChallenge.rows} />
          <CollectiveImpact />
        </div>
      </section>
      <RegisterBanner />
    </>
  );
}
