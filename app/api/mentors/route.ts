import { NextResponse } from 'next/server';
import { mentors } from '@/lib/mentors';

function parseCategory(value: string | null) {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  return mentors.find(m => m.category.toLowerCase() === normalized) ? value : null;
}

function parseAvailability(value: string | null) {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  if (normalized === 'available') return 'Available';
  if (normalized === 'fully-booked' || normalized === 'fullybooked' || normalized === 'fully booked') return 'Fully Booked';
  return null;
}

function parseRate(value: string | null) {
  if (!value) return null;
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

export function GET(request: Request) {
  const url = new URL(request.url);
  const expertise = url.searchParams.get('expertise');
  const availability = url.searchParams.get('availability');
  const minRate = parseRate(url.searchParams.get('minRate'));
  const maxRate = parseRate(url.searchParams.get('maxRate'));

  let results = mentors;

  const category = parseCategory(expertise);
  if (category) {
    results = results.filter(mentor => mentor.category.toLowerCase() === category.trim().toLowerCase());
  }

  const availabilityFilter = parseAvailability(availability);
  if (availabilityFilter === 'Available') {
    results = results.filter(mentor => mentor.available);
  } else if (availabilityFilter === 'Fully Booked') {
    results = results.filter(mentor => !mentor.available);
  }

  if (minRate !== null) {
    results = results.filter(mentor => mentor.rate >= minRate);
  }

  if (maxRate !== null) {
    results = results.filter(mentor => mentor.rate <= maxRate);
  }

  return NextResponse.json(results);
}
