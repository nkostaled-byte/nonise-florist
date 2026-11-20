import React, { useEffect, useState } from 'react';
import { ExternalLink, Instagram, Play } from 'lucide-react';
import { BUSINESS_INFO } from '../data/noniseData';
import { RevealSection } from './RevealSection';
import { EditorialImage } from './EditorialImage';

interface InstagramPost {
  id: string;
  imageUrl: string;
  permalink: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  alt: string;
  timestamp?: string;
}

interface InstagramApiResponse {
  status: 'connected' | 'unconfigured' | 'error';
  reason?: 'token_expired' | 'unavailable';
  posts: InstagramPost[];
  profileUrl: string;
  handle: string;
}

export const InstagramSection: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [feedState, setFeedState] = useState<InstagramApiResponse>({
    status: 'unconfigured',
    posts: [],
    profileUrl: BUSINESS_INFO.instagramHref,
    handle: BUSINESS_INFO.instagramHandle,
  });

  useEffect(() => {
    let active = true;

    async function loadInstagramFeed() {
      try {
        const res = await fetch('/api/instagram/media');
        if (!res.ok) throw new Error('Feed request failed');
        const data = (await res.json()) as InstagramApiResponse;
        if (active) {
          setFeedState({
            status: data.status ?? 'error',
            reason: data.reason,
            posts: Array.isArray(data.posts) ? data.posts : [],
            profileUrl: data.profileUrl || BUSINESS_INFO.instagramHref,
            handle: data.handle || BUSINESS_INFO.instagramHandle,
          });
        }
      } catch {
        if (active) {
          setFeedState((prev) => ({ ...prev, status: 'error', posts: [] }));
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadInstagramFeed();
    return () => {
      active = false;
    };
  }, []);

  const hasLivePosts = feedState.status === 'connected' && feedState.posts.length > 0;

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-[#F7EFE3]/55">
      <div className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Section Header */}
        <RevealSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-[#3E5B42] mb-2">
              <Instagram className="w-4 h-4" aria-hidden="true" />
              <span className="eyebrow">{feedState.handle}</span>
            </div>
            <h2 className="font-editorial text-[28px] sm:text-[36px] lg:text-[40px] font-medium leading-tight tracking-[-0.01em] text-[#2F1B2E]">
              Follow Our Floral Journey
            </h2>
            <p className="text-[15px] text-[#584144] mt-2.5 leading-relaxed">
              Discover more beautiful arrangements, special moments and inspiration from Nonise
              Florist.
            </p>
          </div>

          <a
            href={feedState.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[46px] rounded-sm bg-[#2F1B2E] text-white text-[13px] font-semibold tracking-[0.04em] hover:bg-[#432741] self-start md:self-auto whitespace-nowrap"
          >
            <Instagram className="w-4 h-4 text-[#E8D5B0]" aria-hidden="true" />
            <span>Follow Us on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#E8D5B0]" aria-hidden="true" />
          </a>
        </RevealSection>

        {/* Loading Skeleton */}
        {loading && (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            aria-label="Loading Instagram posts"
          >
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <div
                key={idx}
                className="aspect-square rounded-sm border border-[#EFE8DC] bg-[#F5F3EF] animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Live Official Instagram Graph API Grid */}
        {!loading && hasLivePosts && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {feedState.posts.map((post, idx) => (
              <RevealSection key={post.id} delayMs={idx * 65}>
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${post.alt} — Open post on Instagram`}
                  className="group relative aspect-square rounded-sm overflow-hidden border border-[#EFE8DC] bg-white block hover:border-[#C5A059]/60 transition-colors duration-300"
                >
                  <EditorialImage
                    src={post.imageUrl}
                    alt={post.alt}
                    wrapperClassName="w-full h-full"
                    delayMs={idx * 65}
                    hoverZoom
                  >
                    {post.mediaType === 'VIDEO' && (
                      <span
                        aria-hidden="true"
                        className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-[#2F1B2E]/75 text-white flex items-center justify-center"
                      >
                        <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                      </span>
                    )}
                    <div className="absolute inset-0 bg-[#2F1B2E]/0 group-hover:bg-[#2F1B2E]/25 transition-colors duration-300 flex items-center justify-center">
                      <Instagram
                        className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95 transition-all duration-300 drop-shadow"
                        aria-hidden="true"
                      />
                    </div>
                  </EditorialImage>
                </a>
              </RevealSection>
            ))}
          </div>
        )}

        {/* Graceful Unconnected Fallback — Never fakes Instagram posts with website photos */}
        {!loading && !hasLivePosts && (
          <RevealSection delayMs={90}>
            <div className="bg-white border border-[#EFE8DC] rounded-sm px-6 py-10 sm:px-10 sm:py-12 text-center">
              <div className="max-w-lg mx-auto flex flex-col items-center">
                <img
                  src={BUSINESS_INFO.logo}
                  alt="Nonise Florist"
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-full object-cover border border-[#C5A059]/50 mb-4"
                />
                <p className="font-editorial text-[24px] text-[#2F1B2E]">
                  {feedState.handle} on Instagram
                </p>
                <p className="text-[14px] leading-relaxed text-[#584144] mt-2">
                  Our live Instagram feed will appear here automatically once the official Nonise
                  Florist Instagram account is authorised. In the meantime, visit our profile
                  directly to browse our latest bouquets, wedding work, and studio moments.
                </p>
                <a
                  href={feedState.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm border border-[#2F1B2E] text-[#2F1B2E] text-[13px] font-semibold tracking-[0.04em] hover:bg-[#2F1B2E] hover:text-white"
                >
                  <span>Open @nonise.florist on Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </RevealSection>
        )}
      </div>
    </section>
  );
};
