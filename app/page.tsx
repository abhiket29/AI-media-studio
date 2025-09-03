'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Wand2,
  Image,
  Palette,
  Download,
  Scissors,
  Type,
  Upload,
  Share2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

/** Animated number counter (supports decimals + suffix/prefix) */
function Counter({ to = 0, duration = 1.2, decimals = 0, prefix = '', suffix = '' }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (latest) =>
    `${prefix}${Number(latest).toFixed(decimals)}${suffix}`
  );

  useEffect(() => {
    const controls = animate(mv, to, { duration, ease: 'easeOut' });
    return controls.stop;
  }, [to, duration, mv]);

  return <motion.span>{rounded}</motion.span>;
}

export default function HomePage() {
  const features = [
    {
      icon: <Wand2 className="w-8 h-8" />,
      title: 'AI Image Generation',
      description:
        'Create stunning images from text prompts using advanced Stable Diffusion models',
      color: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      chip: 'bg-cyan-100 text-cyan-800',
    },
    {
      icon: <Upload className="w-8 h-8" />,
      title: 'Media Upload',
      description:
        'Upload and edit your existing images and videos with professional tools',
      color: 'bg-gradient-to-br from-fuchsia-500 to-pink-600',
      chip: 'bg-pink-100 text-pink-800',
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Professional Filters',
      description:
        'Apply beautiful filters, adjust brightness, contrast, and saturation in real-time',
      color: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      chip: 'bg-emerald-100 text-emerald-800',
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      title: 'Background Removal',
      description:
        'Remove backgrounds automatically with AI-powered precision and accuracy',
      color: 'bg-gradient-to-br from-amber-500 to-orange-600',
      chip: 'bg-amber-100 text-amber-800',
    },
    {
      icon: <Type className="w-8 h-8" />,
      title: 'Watermarking',
      description:
        'Add custom watermarks with adjustable position, opacity, and styling',
      color: 'bg-gradient-to-br from-violet-500 to-fuchsia-600',
      chip: 'bg-violet-100 text-violet-800',
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: 'Export & Share',
      description:
        'Download in multiple formats or share directly to social media platforms',
      color: 'bg-gradient-to-br from-sky-500 to-indigo-600',
      chip: 'bg-indigo-100 text-indigo-800',
    },
  ];

  const stats = [
    { value: 10000, label: 'Images Generated', suffix: '+' },
    { value: 5000, label: 'Happy Users', suffix: '+' },
    { value: 99.9, label: 'Uptime', suffix: '%', decimals: 1 },
    { value: 24, label: 'Support', suffix: '/7' },
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: 'easeOut' as const },
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(34,211,238,0.12),transparent),radial-gradient(1000px_500px_at_100%_0%,rgba(139,92,246,0.12),transparent)] dark:bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(34,211,238,0.18),transparent),radial-gradient(1000px_500px_at_100%_0%,rgba(139,92,246,0.18),transparent)]">
      {/* Subtle grid backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:28px_28px]" />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            {...fadeUp}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 text-white border-0 px-4 py-2 shadow-md">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Media Studio
            </Badge>

            <motion.h1
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight"
            >
              Design{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
                Stunning Visuals
              </span>{' '}
              with AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.9 }}
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              Professional image editing, AI generation, and media enhancement tools.
              Bring your creative vision to life with a fluid, modern interface.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-lg px-8 py-6 shadow-lg shadow-cyan-400/30"
              >
                <Link href="/editor">
                  Start Creating
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Image className="w-5 h-5 mr-2" />
                View Examples
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-16 left-8 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob bg-cyan-300"></div>
          <div className="absolute top-36 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 bg-blue-300"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 bg-fuchsia-300"></div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white/60 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
                  <Counter
                    to={s.value}
                    suffix={s.suffix || ''}
                    decimals={s.decimals || 0}
                  />
                </div>
                <div className="text-slate-600 dark:text-slate-300">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
              Powerful Features for Every Creator
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              From AI generation to pro-level editing, get everything you need to create
              amazing visuals—fast.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <Card className="group border border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl hover:shadow-2xl hover:shadow-slate-900/5 transition-all duration-300 hover:-translate-y-2 rounded-2xl">
                  <CardContent className="p-8">
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.08 }}
                      className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-black/10`}
                    >
                      {feature.icon}
                    </motion.div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    <Badge variant="secondary" className={feature.chip}>
                      Professional Tool
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="py-20 bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Transform Your Ideas?
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join thousands of creators already using our AI-powered tools to bring their
            visions to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 bg-white text-slate-900 hover:bg-slate-100"
            >
              <Link href="/editor">
                <Wand2 className="w-5 h-5 mr-2" />
                Start Creating Now
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="text-black border-white hover:bg-white hover:text-blue-700 text-lg px-8 py-6"
            >
              <Download className="w-5 h-5 mr-2" />
              Download App
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="py-12 bg-slate-950">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
              <Image className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">AI Media Studio</span>
          </div>

          <p className="text-slate-400 mb-6">
            Empowering creators with AI-powered tools for professional visual content.
          </p>

          <div className="text-sm text-slate-500">
            © 2025 AI Media Studio. Built with ❤️ by Abhiket.
          </div>
        </div>
      </footer>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.08);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-gradient-x {
          background-size: 220% 220%;
          animation: gradient-x 6s ease-in-out infinite;
        }
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
