"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MentorFilters } from "@/lib/mentor-types";

const FILTER_PARAMS: (keyof MentorFilters)[] = [
  "expertise",
  "experience",
  "industry",
  "minRating",
  "maxHourlyRate",
  "availability",
  "sortBy",
  "sortOrder",
];

const ARRAY_PARAMS: (keyof MentorFilters)[] = ["expertise", "experience", "industry", "availability"];

export function useUrlFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<MentorFilters>(() => {
    const initialFilters: MentorFilters = {};
    
    FILTER_PARAMS.forEach((param) => {
      const value = searchParams.get(param);
      if (value) {
        if (ARRAY_PARAMS.includes(param)) {
          (initialFilters as Record<string, unknown>)[param] = value.split(",").filter(Boolean);
        } else if (param === "minRating" || param === "maxHourlyRate") {
          (initialFilters as Record<string, unknown>)[param] = Number(value);
        } else {
          (initialFilters as Record<string, unknown>)[param] = value;
        }
      }
    });

    return initialFilters;
  });

  const updateFilters = useCallback(
    (newFilters: MentorFilters, { replace = false } = {}) => {
      setFilters(newFilters);

      const params = new URLSearchParams(searchParams.toString());
      
      FILTER_PARAMS.forEach((param) => {
        params.delete(param);
      });

      FILTER_PARAMS.forEach((param) => {
        const value = newFilters[param];
        if (value !== undefined && value !== null && value !== "") {
          if (ARRAY_PARAMS.includes(param)) {
            const arr = value as string[];
            if (arr.length > 0) {
              params.set(param, arr.join(","));
            }
          } else if (typeof value === "number") {
            params.set(param, value.toString());
          } else {
            params.set(param, value);
          }
        }
      });

      const newUrl = `${pathname}?${params.toString()}`;
      if (replace) {
        router.replace(newUrl, { scroll: false });
      } else {
        router.push(newUrl, { scroll: false });
      }
    },
    [router, pathname, searchParams]
  );

  const clearFilters = useCallback(() => {
    const emptyFilters: MentorFilters = {};
    setFilters(emptyFilters);
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== null && value !== "" && (Array.isArray(value) ? value.length > 0 : true)
  );

  return {
    filters,
    updateFilters,
    clearFilters,
    hasActiveFilters,
    setFilters,
  };
}

export function getFiltersFromSearchParams(searchParams: URLSearchParams): MentorFilters {
  const filters: MentorFilters = {};

  FILTER_PARAMS.forEach((param) => {
    const value = searchParams.get(param);
    if (value) {
      if (ARRAY_PARAMS.includes(param)) {
        (filters as Record<string, unknown>)[param] = value.split(",").filter(Boolean);
      } else if (param === "minRating" || param === "maxHourlyRate") {
        (filters as Record<string, unknown>)[param] = Number(value);
      } else {
        (filters as Record<string, unknown>)[param] = value;
      }
    }
  });

  return filters;
}

export function createFilterUrl(basePath: string, filters: MentorFilters): string {
  const params = new URLSearchParams();

  FILTER_PARAMS.forEach((param) => {
    const value = filters[param];
    if (value !== undefined && value !== null && value !== "") {
      if (ARRAY_PARAMS.includes(param)) {
        const arr = value as string[];
        if (arr.length > 0) {
          params.set(param, arr.join(","));
        }
      } else if (typeof value === "number") {
        params.set(param, value.toString());
      } else {
        params.set(param, value);
      }
    }
  });

  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}