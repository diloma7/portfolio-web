import Container from "./Container";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-16 ">
      <Container className="py-5 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Diloma Ouattara. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <Link href="#projects" className="hover:text-blue-600">
            Projects
          </Link>
          <Link href="#contact" className="hover:text-blue-600">
            Contact
          </Link>
        </div>
      </Container>
    </footer>
  );
}
