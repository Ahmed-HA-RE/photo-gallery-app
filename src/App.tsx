import PhotoGallery from './components/photo-gallery';

const App = () => {
  return (
    <main className='p-4 pt-10'>
      <section>
        <div className='max-w-7xl mx-auto'>
          {/* Photo Gallery */}
          <PhotoGallery />
        </div>
      </section>
    </main>
  );
};

export default App;
