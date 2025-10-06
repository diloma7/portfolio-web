// import Hero from "@/components/Hero";
// import Section from "@/components/Section";
// import Container from "@/components/Container";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import SplashGate from "@/components/SplashGate";

// export default function HomePage() {
//   return (
//     <>
//       <SplashGate minDuration={3000} oncePerSession={false}>
//         <Hero />
//         <Section as="section">
//           <Container id="about">
//             <h2 className="text-2xl md:text-3xl font-semibold">What I Do</h2>
//             <p className="mt-3 text-muted-foreground max-w-3xl">
//               I design and build web applications with clean architectures,
//               delightful interactions, and solid accessibility.
//             </p>
//             <div className="mt-6">
//               <Link href="/projects">
//                 <Button>Explore my work</Button>
//               </Link>
//             </div>
//           </Container>
//         </Section>

//         <Section>
//           <Container>
//             <h2 className="text-2xl md:text-3xl font-semibold">Highlights</h2>
//             <ul className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//               <li className="rounded-2xl border p-6">
//                 Performance-first engineering
//               </li>
//               <li className="rounded-2xl border p-6">
//                 Accessible UI and semantics
//               </li>
//               <li className="rounded-2xl border p-6">DX and maintainability</li>
//             </ul>
//           </Container>
//         </Section>
//       </SplashGate>
//     </>
//   );
// }

import SplashGate from "@/components/SplashGate";
import ThreeBlob from "@/components/ThreeBlob";
import ThreeParticlesBackground from "@/components/ThreeParticlesBackground";

export default function HomePage() {
  return (
    <>
      <ThreeParticlesBackground />

      <SplashGate minDuration={3000} oncePerSession={false}>
        <main
          className="min-h-[calc(50svh-4rem)] items-start pt-8 md:pt-12 grid place-items-center px-4"
          aria-label="Landing"
        >
          {/* Full-bleed canvas area (responsive) */}
          <ThreeBlob
            className="h-[min(78vh,900px)] w-[min(96vw,1400px)]"
            dark
            imageSrc="/earth.jpg"
            scale={1.1} // ⬅️ make the sphere noticeably larger
          />
        </main>
      </SplashGate>
    </>
  );
}
