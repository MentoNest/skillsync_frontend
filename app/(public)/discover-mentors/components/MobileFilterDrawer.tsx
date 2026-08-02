"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ExpertiseFilter from "@/components/mentors/ExpertiseFilter";
import { type Expertise } from "@/components/mentors/data";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedExpertise: Expertise[];
  onToggleExpertise: (expertise: Expertise) => void;
  minPrice: string;
  onMinPriceChange: (value: string) => void;
  maxPrice: string;
  onMaxPriceChange: (value: string) => void;
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  selectedExpertise,
  onToggleExpertise,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
}: MobileFilterDrawerProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white dark:bg-gray-900 py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Filters
                </h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white dark:bg-gray-900 p-2 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={onClose}
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="px-4 py-6">
                  <ExpertiseFilter
                    selectedExpertise={selectedExpertise}
                    onToggleExpertise={onToggleExpertise}
                  />
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-6">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    Price Per Session ($)
                  </h3>
                  <div className="flex items-center gap-2 mt-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => onMinPriceChange(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => onMaxPriceChange(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}