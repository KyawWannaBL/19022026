// FILE: src/components/Logo.tsx
// ===============================
import React from "react";

export default function Logo({
  className,
  alt = "Britium Express",
  src = "/assets/britium-logo.png",
}: {
  className?: string;
  alt?: string;
  src?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className ?? "h-9 w-auto"}
      loading="lazy"
      decoding="async"
    />
  );
}