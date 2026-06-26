"use client";

import { useEffect, useState } from "react";

// ✅ ADD THIS TYPE
type PageLoaderProps = {
  onFinish?: () => void;
};

export default function PageLoader({ onFinish }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 9000;
    const intervalTime = 100;

    const step = 100 / (duration / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;

        if (next >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            onFinish?.();
          }, 200);

          return 100;
        }

        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050714] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[140px]" />

      <div className="text-center">

        {/* LOGO */}
        <div className="mx-auto mb-10 flex h-36 w-36 items-center justify-center rounded-full bg-white shadow-2xl">
          <img
            src="/logo.png"
            className="h-24 w-24 object-contain scale-130"
            alt="logo"
          />
        </div>

        <p className="text-blue-200 mb-8">
          Preparing your experience...
        </p>

        {/* PROGRESS */}
        <div className="w-80 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-sm text-blue-300">
          {Math.round(progress)}%
        </p>

      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";

// export default function PageLoader() {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) return 100;
//         return prev + 2;
//       });
//     }, 35);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#030712]">
//       {/* Background Blur */}
//       <div className="absolute -left-40 top-20 h-96 w-96 animate-pulse rounded-full bg-cyan-500/20 blur-[120px]" />

//       <div className="absolute right-0 bottom-0 h-[500px] w-[500px] animate-pulse rounded-full bg-blue-700/20 blur-[150px]" />

//       {/* Grid */}
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

//       <div className="relative flex h-full flex-col items-center justify-center">
//         {/* Logo */}
//         <div className="relative">
//           <div className="absolute inset-0 animate-ping rounded-full bg-cyan-400/30 blur-xl" />

//           <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-cyan-400/30 bg-white/5 backdrop-blur-xl">
//             <span className="text-3xl font-bold text-white">E</span>
//           </div>
//         </div>

//         {/* Company */}
//         <h1 className="mt-8 text-4xl font-bold tracking-wider text-white">
//           Elevare Tech
//         </h1>

//         <p className="mt-3 text-blue-200">
//           Building Digital Excellence
//         </p>

//         {/* Progress */}
//         <div className="mt-10 w-80 overflow-hidden rounded-full bg-white/10">
//           <div
//             className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-200"
//             style={{
//               width: `${progress}%`,
//             }}
//           />
//         </div>

//         <div className="mt-4 text-sm text-blue-300">
//           {progress}%
//         </div>

//         {/* Loading dots */}
//         <div className="mt-8 flex gap-3">
//           <span className="h-3 w-3 animate-bounce rounded-full bg-cyan-400 [animation-delay:0ms]" />
//           <span className="h-3 w-3 animate-bounce rounded-full bg-cyan-400 [animation-delay:150ms]" />
//           <span className="h-3 w-3 animate-bounce rounded-full bg-cyan-400 [animation-delay:300ms]" />
//         </div>
//       </div>
//     </div>
//   );
// }