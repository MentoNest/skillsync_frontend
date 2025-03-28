export interface Testimonial {
    id: number;
    name: string;
    role: string;
    image: string;
    feedback: string;
    rating: number;
  }
  
  export const testimonialsData: Testimonial[] = [
    {
      id: 1,
      name: "John Doe",
      role: "Mentee, Software Engineer",
      image: "/assets/john_doe.jpg",
      feedback: "This mentorship program transformed my career!",
      rating: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Mentor, Senior Developer",
      image: "/assets/jane_smith.jpg",
      feedback: "Helping others grow has been so rewarding!",
      rating: 4,
    },
  ];
  