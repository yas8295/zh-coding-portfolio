import React, { useCallback } from "react";
import Marquee from "react-fast-marquee";
import { useProjects } from "../hooks/projectsHooks/useProjects";
import { toast } from "react-toastify";

const ProjectsMarquee: React.FC = ({ isDark }) => {
  const { data, isLoading, isError, error } = useProjects();

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-96 w-[500px] rounded-xl bg-white/5 p-2 flex-shrink-0"
            >
              <div className="w-full h-full bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    const message = (error && (error as any).message) || "فشل جلب المشاريع";
    toast.error(message);
    return (
      <div className="w-full py-8 flex justify-center items-center">
        <div className="text-sm text-red-500">{message}</div>
      </div>
    );
  }

  const projects = data || [];

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLDivElement;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / rect.height) * -10; // rotateX
    const ry = ((x - rect.width / 2) / rect.width) * 10; // rotateY
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
  }, []);

  const handleLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLDivElement;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  }, []);

  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL || "";

  return (
    <div className="w-full max-h-[35%] relative">
      <div className="w-full h-full absolute left-0 bottom-0 z-10 bg-gradient-to-t dark:from-emerald-950/95 from-primary-200/40 to-transparent"></div>
      <div dir="ltr" className="h-full">
        <Marquee speed={120} pauseOnHover={true} loop={0} autoFill={true}>
          {projects.map((p: any) => (
            <div
              key={p.id}
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
              className="mx-2 w-96 h-96 rounded-xl overflow-hidden relative"
              style={{
                perspective: 1200,
              }}
            >
              <div
                className="w-full h-full rounded-xl overflow-hidden"
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform 300ms ease, box-shadow 300ms ease",
                  transform:
                    "rotateX(var(--rx, 0)) rotateY(var(--ry, 0)) translateZ(20px)",
                }}
              >
                <img
                  src={`${baseUrl}${p.image}`}
                  alt={p.title}
                  className="w-full h-full object-cover object-top transform-gpu scale-100 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default ProjectsMarquee;
