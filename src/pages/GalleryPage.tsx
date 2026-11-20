import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/noniseData';
import { GalleryPhoto } from '../types';
import { RevealSection } from '../components/RevealSection';
import { EditorialImage } from '../components/EditorialImage';

interface GalleryPageProps {
  onStartInquiry: (topic: string) => void;
}

const COLLECTIONS: Array<'All' | GalleryPhoto['collection']> = [
  'All',
  'Roses & Bouquets',
  'Hatboxes & Hampers',
  'Weddings & Events',
];

export const GalleryPage: React.FC<GalleryPageProps> = ({ onStartInquiry }) => {
  const [selectedCollection, setSelectedCollection] =
    useState<'All' | GalleryPhoto['collection']>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visiblePhotos =
    selectedCollection === 'All'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.collection === selectedCollection);

  const lightboxPhoto =
    lightboxIndex !== null && lightboxIndex >= 0 && lightboxIndex < visiblePhotos.length
      ? visiblePhotos[lightboxIndex]
      : null;

  const handleSelectCollection = (col: 'All' | GalleryPhoto['collection']) => {
    setSelectedCollection(col);
    setLightboxIndex(null);
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => {
      if (prev === null || visiblePhotos.length <= 1) return prev;
      return (prev - 1 + visiblePhotos.length) % visiblePhotos.length;
    });
  };

  const handleNext = () => {
    setLightboxIndex((prev) => {
      if (prev === null || visiblePhotos.length <= 1) return prev;
      return (prev + 1) % visiblePhotos.length;
    });
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null || visiblePhotos.length <= 1
            ? prev
            : (prev - 1 + visiblePhotos.length) % visiblePhotos.length
        );
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null || visiblePhotos.length <= 1
            ? prev
            : (prev + 1) % visiblePhotos.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, visiblePhotos.length]);

  return (
    <div className="bg-[#FDFBF7] min-h-[75vh]">
      {/* Header */}
      <section className="bg-[#F7EFE3]/70 border-b border-[#EFE8DC]">
        <RevealSection immediate className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-16">
          <p className="eyebrow text-[#3E5B42]">Our Recent Work</p>
          <h1 className="font-editorial text-[34px] sm:text-[44px] font-semibold text-[#2F1B2E] leading-tight mt-2">
            Floral Portfolio &amp; Gallery
          </h1>
          <p className="text-[15px] sm:text-[16px] text-[#584144] mt-3 max-w-2xl leading-relaxed">
            Authentic creations from our Pietermaritzburg studio — bespoke monogram bouquets,
            keepsake hatboxes, chocolate hampers, baby showers, and romantic wedding tablescapes.
          </p>

          <div className="mt-7 flex flex-wrap gap-2" role="tablist" aria-label="Filter gallery">
            {COLLECTIONS.map((col) => {
              const active = selectedCollection === col;
              return (
                <button
                  key={col}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleSelectCollection(col)}
                  className={`btn-editorial px-4 py-2 min-h-[40px] rounded-full text-[13px] font-semibold whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#2F1B2E] text-white'
                      : 'bg-white border border-[#EFE8DC] text-[#2F1B2E] hover:bg-[#EFE8DC]'
                  }`}
                >
                  {col}
                </button>
              );
            })}
          </div>
        </RevealSection>
      </section>

      {/* Curated Portfolio Grid */}
      <section className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePhotos.map((photo, idx) => (
            <RevealSection key={photo.id} delayMs={(idx % 3) * 75} className="h-full">
              <button
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="group card-floral w-full h-full text-left rounded-sm overflow-hidden flex flex-col cursor-pointer"
              >
                <EditorialImage
                  src={photo.src}
                  alt={photo.title}
                  wrapperClassName="aspect-[4/5] w-full bg-[#F5F3EF]"
                  delayMs={(idx % 3) * 75}
                  hoverZoom
                />
                <div className="p-4 sm:p-5">
                  <p className="eyebrow text-[#3E5B42]">{photo.collection}</p>
                  <h2 className="font-editorial text-[19px] text-[#2F1B2E] group-hover:text-[#D84A6A] transition-colors mt-1 leading-snug">
                    {photo.title}
                  </h2>
                </div>
              </button>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxPhoto && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxPhoto.title}
        >
          <div
            className="modal-backdrop-enter fixed inset-0 bg-[#2F1B2E]/82 backdrop-blur-[2px]"
            onClick={() => setLightboxIndex(null)}
          />
          <div className="modal-panel-enter relative z-10 max-w-4xl w-full bg-[#FDFBF7] border border-[#EFE8DC] rounded-sm overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 max-h-[90vh]">
            <div className="relative md:col-span-7 bg-[#1B1C1A] flex items-center justify-center max-h-[55vh] md:max-h-[82vh] overflow-hidden">
              <img
                key={lightboxPhoto.id}
                src={lightboxPhoto.src}
                alt={lightboxPhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-[55vh] md:max-h-[82vh] pdp-image-swap"
              />

              {visiblePhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous portfolio photo"
                    className="btn-editorial absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#2F1B2E]/70 text-white hover:bg-[#2F1B2E] inline-flex items-center justify-center cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next portfolio photo"
                    className="btn-editorial absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#2F1B2E]/70 text-white hover:bg-[#2F1B2E] inline-flex items-center justify-center cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div key={lightboxPhoto.id} className="toast-enter">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="eyebrow text-[#3E5B42]">{lightboxPhoto.collection}</p>
                    <p className="text-[11px] font-medium text-[#8B7073] tabular-price">
                      {lightboxIndex + 1} / {visiblePhotos.length}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(null)}
                    aria-label="Close image preview"
                    className="btn-editorial w-9 h-9 inline-flex items-center justify-center rounded-sm text-[#2F1B2E] hover:bg-[#F7EFE3] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <h3 className="font-editorial text-[26px] text-[#2F1B2E] leading-snug mt-3">
                  {lightboxPhoto.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-[#584144] mt-3">
                  Hand-crafted at our Peter Kerchhoff Street studio in Pietermaritzburg. We can
                  recreate this style or customise stem colours, box wording, and size to suit your
                  occasion.
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-[#EFE8DC] space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    const topic = `Bespoke Enquiry inspired by: ${lightboxPhoto.title}`;
                    setLightboxIndex(null);
                    onStartInquiry(topic);
                  }}
                  className="btn-editorial w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-sm bg-[#D84A6A] text-white text-[13px] font-semibold tracking-[0.04em] hover:bg-[#C43D5C] cursor-pointer"
                >
                  <span>Enquire About This Style</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
