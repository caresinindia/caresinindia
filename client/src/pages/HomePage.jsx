import heroImage from '../image/homePageImage/hero.png';
import Container from '../components/common/Container';
import HomeBar from './HomeBar';
import { Search } from 'lucide-react';
import PatientStory from './PatientStory';

function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section with Background Image */}
      <section className="relative flex h-[50vh] min-h-[380px] w-full items-center justify-center overflow-hidden bg-slate-900">
        {/* Background Image with Low Opacity */}
        <img
          src={heroImage}
          alt="Hero Background"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-20"
        />

        {/* Content Container (Layered above background with z-10) */}
        <div className="relative z-10 w-full py-10">
          <Container>
            <div className="flex w-full flex-col items-center justify-center">
              <div className="relative w-full max-w-2xl">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />
                <input
                  type="search"
                  className="w-full rounded-full border border-white/30 bg-black/40 py-3 pl-12 pr-4 text-sm text-white placeholder-white/60 shadow-lg backdrop-blur-md transition-all focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  placeholder="Search Doctor, Hospital or Speciality..."
                />
              </div>
            </div>
          </Container>

          <Container className="mt-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center rounded-2xl border border-white/10 bg-black/30 px-6 py-8 shadow-xl backdrop-blur-sm sm:px-10 sm:py-10">
              <h1 className="text-center text-lg font-bold tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">
                Better health begins here. For you, for life.
              </h1>
            </div>
          </Container>
        </div>
      </section>
      <HomeBar/>
      <Container>
        <PatientStory/>
      </Container>
    </div>
  );
}



export default HomePage;
