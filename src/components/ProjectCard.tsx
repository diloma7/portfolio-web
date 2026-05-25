"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { Project } from "@/types";
import Image from "next/image";

type Props = { project: Project };

export default function ProjectCard({ project }: Props) {
  return (
    <motion.div whileHover={{ y: -4 }}>
      <Link href={project.href ?? "#"} aria-label={`Open ${project.title}`}>
        <Card className="overflow-hidden">
          {project.imageSrc && (
            <Image
              src={project.imageSrc}
              alt={project.alt ?? project.title + " screenshot"}
              width={1200}
              height={630}
              className="h-48 w-full object-cover"
            />
          )}
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-secondary px-3 py-1 text-xs"
                >
                  {t}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
