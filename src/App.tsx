import PhotoGallery from './components/photo-gallery';

const App = () => {
  return (
    <main className='p-4 pt-10'>
      <section>
        <div className='max-w-7xl mx-auto flex flex-col items-center justify-center min-h-screen'>
          {/* Title */}
          <h1 className='text-4xl font-bold mb-8'>Photo Gallery</h1>
          {/* Photo Gallery */}
          <PhotoGallery />
        </div>
      </section>
    </main>
  );
};

export default App;
