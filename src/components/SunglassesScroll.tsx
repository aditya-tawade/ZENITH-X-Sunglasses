'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useSpring, useMotionValueEvent } from 'framer-motion';

const TOTAL_FRAMES = 40;
const FRAME_DIRECTORY = '/images';
const FRAME_PREFIX = 'ezgif-frame-';
const FRAME_EXTENSION = '.jpg';

export default function SunglassesScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Smooth out the scroll progress for cinematic feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const frameIndex = useTransform(smoothProgress, [0, 1], [1, TOTAL_FRAMES]);

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        const preloadImages = async () => {
            const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    const frameNum = (i + 1).toString().padStart(3, '0');
                    img.src = `${FRAME_DIRECTORY}/${FRAME_PREFIX}${frameNum}${FRAME_EXTENSION}`;
                    img.onload = () => {
                        loadedCount++;
                        setLoadProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
                        loadedImages[i] = img;
                        resolve(img);
                    };
                    img.onerror = reject;
                });
            });

            try {
                await Promise.all(promises);
                setImages(loadedImages);
                setIsLoading(false);
            } catch (error) {
                console.error('Error preloading images:', error);
            }
        };

        preloadImages();
    }, []);

    // Update canvas when frameIndex or images change
    useMotionValueEvent(frameIndex, 'change', (latest) => {
        const index = Math.floor(latest);
        renderCanvas(index);
    });

    const renderCanvas = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const img = images[index - 1];

        if (canvas && ctx && img) {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Maintain aspect ratio with object-cover logic
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvasRatio < imgRatio) {
                drawHeight = canvas.height;
                drawWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            } else {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgRatio;
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            }

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
    };

    // Resize canvas to fill screen
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Re-render current frame on resize
                const currentIndex = Math.floor(frameIndex.get());
                renderCanvas(currentIndex);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [images]); // Depend on images so we can render once loaded

    // Initial render when images are loaded
    useEffect(() => {
        if (!isLoading && images.length > 0) {
            renderCanvas(1);
        }
    }, [isLoading, images]);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-[#050505]">
            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
                    <div className="mb-4 h-1 w-48 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                            className="h-full bg-white"
                            initial={{ width: 0 }}
                            animate={{ width: `${loadProgress}%` }}
                        />
                    </div>
                    <p className="text-xs font-medium tracking-widest text-white/40 uppercase">
                        Loading Zenith X Experience {loadProgress}%
                    </p>
                </div>
            )}

            {/* Sticky Canvas Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="h-full w-full"
                />

                {/* Text Overlays */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* 0% Scroll - Intro */}
                    <Section progress={scrollYProgress} range={[0, 0.15]}>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white/90 text-center">
                            Zenith X.<br />Vision Perfected.
                        </h1>
                    </Section>

                    {/* 30% Scroll - Precision */}
                    <Section progress={scrollYProgress} range={[0.25, 0.45]} align="left">
                        <div className="max-w-md ml-[10%]">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white/90 mb-4">
                                Precision Crafted Frames.
                            </h2>
                            <p className="text-lg text-white/60 leading-relaxed">
                                Aero-grade titanium alloy designed to withstand the extremes while weighing next to nothing.
                            </p>
                        </div>
                    </Section>

                    {/* 60% Scroll - Optics */}
                    <Section progress={scrollYProgress} range={[0.55, 0.75]} align="right">
                        <div className="max-w-md mr-[10%] text-right">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white/90 mb-4">
                                Advanced Polarized Optics.
                            </h2>
                            <p className="text-lg text-white/60 leading-relaxed">
                                Proprietary lens technology that filters light for unmatched clarity and depth perception.
                            </p>
                        </div>
                    </Section>

                    {/* 90% Scroll - CTA */}
                    <Section progress={scrollYProgress} range={[0.85, 1]}>
                        <div className="flex flex-col items-center">
                            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white/90 text-center mb-8">
                                See Beyond.
                            </h2>
                            <button className="px-8 py-4 bg-white text-[#050505] font-semibold rounded-full hover:scale-105 transition-transform">
                                Experience Zenith X
                            </button>
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    );
}

function Section({ children, progress, range, align = 'center' }: {
    children: React.ReactNode,
    progress: any,
    range: [number, number],
    align?: 'left' | 'right' | 'center'
}) {
    const opacity = useTransform(progress,
        [range[0], range[0] + 0.05, range[1] - 0.05, range[1]],
        [0, 1, 1, 0]
    );

    const y = useTransform(progress,
        [range[0], range[0] + 0.05, range[1] - 0.05, range[1]],
        [20, 0, 0, -20]
    );

    const alignmentClass = align === 'left' ? 'items-start' : align === 'right' ? 'items-end' : 'items-center';

    return (
        <motion.div
            style={{ opacity, y }}
            className={`absolute inset-0 flex flex-col justify-center p-8 ${alignmentClass}`}
        >
            {children}
        </motion.div>
    );
}
