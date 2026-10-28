"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiMaximize2,
  FiX,
  FiRepeat,
} from "react-icons/fi";

interface VideoItem {
  id: string;
  title: string;
  category: string;
  type: "all" | "commercial" | "reels" | "motion";
  src: string;
  aspect: "horizontal" | "vertical";
  duration: string;
}

const videoData: VideoItem[] = [
  // Set 1
  {
    id: "video-1",
    title: "Cinematic Film & Brand Narrative",
    category: "Commercial / Brand Production",
    type: "commercial",
    src: "/videos/COOPQgQxEzVLS8SgYl1S5tCiqo.mp4",
    aspect: "horizontal",
    duration: "0:42",
  },
  {
    id: "video-2",
    title: "High-Energy Social Campaign Reel",
    category: "Vertical Reel / Short Form",
    type: "reels",
    src: "/videos/DNORuJa1xbjCHWUaW9WyHyXds.mp4",
    aspect: "vertical",
    duration: "0:30",
  },
  {
    id: "video-3",
    title: "Dynamic Visual & Motion Edit",
    category: "Promo / Motion Graphic",
    type: "motion",
    src: "/videos/gaIKjgI60O25NiM4XzsmMxBA43A.mp4",
    aspect: "horizontal",
    duration: "0:09",
  },
  // Set 2 (New Videos)
  {
    id: "video-4",
    title: "Creative Storytelling & Social Reel",
    category: "Vertical Reel / Social Campaign",
    type: "reels",
    src: "/videos/creative-social-reel.mp4",
    aspect: "vertical",
    duration: "0:43",
  },
  {
    id: "video-5",
    title: "2D Motion Design & Kinetic Animation",
    category: "Motion Design / 2D Animation",
    type: "motion",
    src: "/videos/2d-motion-design.mp4",
    aspect: "horizontal",
    duration: "0:24",
  },
  {
    id: "video-6",
    title: "Action Sports & Cricket Motion Promo",
    category: "Sports Promo / Dynamic Edit",
    type: "commercial",
    src: "/videos/cricket-sports-promo.mp4",
    aspect: "horizontal",
    duration: "0:30",
  },
];

function VideoCard({
  item,
  onOpenModal,
}: {
  item: VideoItem;
  onOpenModal: (video: VideoItem) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isPinnedPlaying, setIsPinnedPlaying] = useState(false);

  // Play in loop on hover or when activated
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.loop = true;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isPinnedPlaying && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      // Reset back to thumbnail frame
      try {
        videoRef.current.currentTime = 0.5;
      } catch (err) {}
    }
  };

  const handleCardClick = () => {
    onOpenModal(item);
  };

  const toggleInlinePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setIsPinnedPlaying(false);
    } else {
      videoRef.current.loop = true;
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsPinnedPlaying(true);
        })
        .catch(() => {});
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`group relative rounded-3xl overflow-hidden bg-neutral-900/60 border border-white/10 hover:border-white/30 transition-all duration-500 shadow-2xl flex flex-col cursor-pointer ${
        item.aspect === "vertical" ? "md:row-span-2" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      {/* Video Container */}
      <div
        className={`relative w-full overflow-hidden bg-black flex items-center justify-center ${
          item.aspect === "vertical"
            ? "aspect-[9/16] min-h-[480px] md:h-full"
            : "aspect-video"
        }`}
      >
        <video
          ref={videoRef}
          src={`${item.src}#t=0.5`}
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          onLoadedMetadata={() => {
            if (videoRef.current && !isPlaying) {
              try {
                videoRef.current.currentTime = 0.5;
              } catch (err) {}
            }
          }}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none transition-opacity duration-300" />

        {/* Looping Badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md transition-all duration-300 ${
              isPlaying
                ? "bg-white/20 text-white border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                : "bg-black/50 text-gray-400 border border-white/10"
            }`}
          >
            <FiRepeat
              className={`text-xs ${
                isPlaying ? "animate-spin [animation-duration:3s]" : ""
              }`}
            />
            {isPlaying ? "Loop Active" : "Plays in Loop"}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-black/60 backdrop-blur-md text-gray-300 border border-white/10">
            {item.duration}
          </span>
        </div>

        {/* Top Right Quick Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {isPlaying && (
            <button
              onClick={toggleMute}
              title={isMuted ? "Unmute audio" : "Mute audio"}
              className="p-2.5 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/15 backdrop-blur-md transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              {isMuted ? <FiVolumeX size={15} /> : <FiVolume2 size={15} />}
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(item);
            }}
            title="Open theater view"
            className="p-2.5 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/15 backdrop-blur-md transition-all duration-300 transform hover:scale-110 shadow-lg opacity-80 group-hover:opacity-100"
          >
            <FiMaximize2 size={15} />
          </button>
        </div>

        {/* Center Play/Pause button on Hover or Paused */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <motion.button
            type="button"
            onClick={toggleInlinePlay}
            animate={{
              scale: isHovered || !isPlaying ? 1 : 0.85,
              opacity: !isPlaying ? 1 : isHovered ? 0.9 : 0,
            }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto p-4 md:p-5 rounded-full bg-white/15 hover:bg-white text-white hover:text-black border border-white/30 backdrop-blur-xl transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] transform hover:scale-110"
            title={isPlaying ? "Pause" : "Play in loop"}
          >
            {isPlaying ? <FiPause size={22} /> : <FiPlay size={22} className="ml-0.5" />}
          </motion.button>
        </div>

        {/* Bottom Title & Details */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between gap-3 pointer-events-none">
          <div>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400 block mb-1">
              {item.category}
            </span>
            <h4 className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug drop-shadow-md">
              {item.title}
            </h4>
          </div>
          <span className="text-xs text-gray-400/90 whitespace-nowrap hidden sm:inline-block bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/5">
            Hover to play • Click to view
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "commercial" | "reels" | "motion">("all");
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [modalIsPlaying, setModalIsPlaying] = useState(true);
  const [modalIsMuted, setModalIsMuted] = useState(false);

  // Play in loop automatically when modal opens
  useEffect(() => {
    if (selectedVideo && modalVideoRef.current) {
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current.loop = true;
      modalVideoRef.current.muted = modalIsMuted;
      modalVideoRef.current
        .play()
        .then(() => setModalIsPlaying(true))
        .catch(() => {
          if (modalVideoRef.current) {
            modalVideoRef.current.muted = true;
            setModalIsMuted(true);
            modalVideoRef.current.play().then(() => setModalIsPlaying(true));
          }
        });
    }
  }, [selectedVideo]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleModalPlay = () => {
    if (!modalVideoRef.current) return;
    if (modalIsPlaying) {
      modalVideoRef.current.pause();
      setModalIsPlaying(false);
    } else {
      modalVideoRef.current.loop = true;
      modalVideoRef.current.play().then(() => setModalIsPlaying(true));
    }
  };

  const toggleModalMute = () => {
    if (!modalVideoRef.current) return;
    const newMuted = !modalIsMuted;
    modalVideoRef.current.muted = newMuted;
    setModalIsMuted(newMuted);
  };

  const filteredVideos =
    activeFilter === "all"
      ? videoData
      : videoData.filter((v) => v.type === activeFilter);

  return (
    <section
      id="videos"
      className="relative w-full bg-[#080808] z-30 py-32 px-6 md:px-16 border-t border-white/5"
    >
      {/* Background glow decoration */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-white/40 inline-block" />
              <span className="text-gray-400 text-sm font-semibold uppercase tracking-[0.25em]">
                Motion & Video Portfolio
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              Featured Videos.
            </h2>
          </div>
          <p className="text-gray-400 text-base md:text-lg max-w-md font-light">
            Crafted for maximum visual impact. Hover over any video to preview in loop, or click for the theater player.
          </p>
        </motion.div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          {[
            { id: "all", label: `All Works (${videoData.length})` },
            { id: "commercial", label: "Commercial & Sports" },
            { id: "reels", label: "Vertical Reels (9:16)" },
            { id: "motion", label: "Motion Graphics" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border ${
                activeFilter === tab.id
                  ? "bg-white text-black border-white shadow-lg"
                  : "bg-white/5 text-gray-400 border-white/10 hover:text-white hover:border-white/25"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Showcase Grid */}
        {activeFilter === "all" ? (
          <div className="flex flex-col gap-8 md:gap-12">
            {/* Bento Grid 1 (Videos 1, 2, 3) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
              <div className="lg:col-span-2">
                <VideoCard item={videoData[0]} onOpenModal={setSelectedVideo} />
              </div>
              <div className="lg:col-span-1 lg:row-span-2 flex flex-col">
                <VideoCard item={videoData[1]} onOpenModal={setSelectedVideo} />
              </div>
              <div className="lg:col-span-2">
                <VideoCard item={videoData[2]} onOpenModal={setSelectedVideo} />
              </div>
            </div>

            {/* Bento Grid 2 (Videos 4, 5, 6 - Balanced alternating composition) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
              <div className="lg:col-span-1 lg:row-span-2 flex flex-col">
                <VideoCard item={videoData[3]} onOpenModal={setSelectedVideo} />
              </div>
              <div className="lg:col-span-2">
                <VideoCard item={videoData[4]} onOpenModal={setSelectedVideo} />
              </div>
              <div className="lg:col-span-2">
                <VideoCard item={videoData[5]} onOpenModal={setSelectedVideo} />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {filteredVideos.map((item) => (
              <div
                key={item.id}
                className={
                  item.aspect === "vertical"
                    ? "lg:col-span-1"
                    : "lg:col-span-2"
                }
              >
                <VideoCard item={item} onOpenModal={setSelectedVideo} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cinematic Theater Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[120] w-full h-full bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedVideo(null)}
          >
            {/* Modal Controls Header */}
            <div
              className="absolute top-6 left-6 right-6 md:top-8 md:left-12 md:right-12 flex items-center justify-between z-50 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20 backdrop-blur-md">
                  <FiRepeat className="animate-spin [animation-duration:3s]" />
                  Playing in Loop
                </span>
                <span className="text-gray-400 text-sm hidden sm:inline">
                  {selectedVideo.title}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={toggleModalMute}
                  title={modalIsMuted ? "Unmute" : "Mute"}
                  className="p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/15 transition-all duration-300"
                >
                  {modalIsMuted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
                </button>

                <button
                  onClick={() => setSelectedVideo(null)}
                  title="Close (Esc)"
                  className="p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/15 transition-all duration-300"
                >
                  <FiX size={18} />
                </button>
              </div>
            </div>

            {/* Modal Video Player Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`relative max-w-6xl max-h-[82vh] w-full flex items-center justify-center rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl ${
                selectedVideo.aspect === "vertical"
                  ? "max-w-[420px] aspect-[9/16]"
                  : "aspect-video"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={modalVideoRef}
                src={selectedVideo.src}
                loop
                muted={modalIsMuted}
                playsInline
                autoPlay
                className="w-full h-full object-contain bg-black cursor-pointer"
                onClick={toggleModalPlay}
              />

              {/* Floating Bottom Bar inside Modal */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleModalPlay}
                    className="p-2.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-black transition-colors"
                  >
                    {modalIsPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
                  </button>
                  <div>
                    <h5 className="text-white text-sm font-semibold leading-tight">
                      {selectedVideo.title}
                    </h5>
                    <p className="text-gray-400 text-xs">{selectedVideo.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
                  <FiRepeat className="text-white text-xs" />
                  <span>Continuous Loop</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
