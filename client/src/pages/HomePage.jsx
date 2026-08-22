import heroImage from '../image/homePageImage/hero.png';
import Container from '../components/common/Container';

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
        <div className="relative z-10 w-full -translate-y-4 sm:-translate-y-6 md:-translate-y-8">
          <Container>
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center rounded-2xl bg-black/40 px-6 py-8 shadow-xl backdrop-blur-sm border border-white/10 sm:px-10 sm:py-10">
              <h1 className="text-center text-lg font-bold tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">
                Better health begins here. For you, for life.
              </h1>
            </div>

            <div className="mt-4">
              <input type="search" className='border border-gray-500 rounded-full px-4 py-2 text-white/30' placeholder='Search Doctor, Hospital or Speciality' />
            </div>
          </Container>
        </div>
      </section>
    </div>
  );
}



export default HomePage;
