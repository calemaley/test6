export type Project = {
  id: string;
  title: string;
  category: "Hydropower" | "Medium-Voltage" | "Sollatek";
  img: string;
  gallery: string[];
  summary: string;
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "Run-of-River Plant",
    category: "Hydropower",
    img: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1600",
    gallery: [
      "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/635438/pexels-photo-635438.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    summary:
      "Run-of-river hydropower installation with optimized intake and control systems.",
  },
  {
    id: "p2",
    title: "Substation 132kV",
    category: "Medium-Voltage",
    img: "https://images.pexels.com/photos/417192/pexels-photo-417192.jpeg?auto=compress&cs=tinysrgb&w=1600",
    gallery: [
      "https://images.pexels.com/photos/417192/pexels-photo-417192.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/34085/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600",
    ],
    summary: "Design and commissioning of 132/33kV substation with modern protection.",
  },
  {
    id: "p3",
    title: "Hospital Protection",
    category: "Sollatek",
    img: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1600",
    gallery: [
      "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    summary:
      "Hospital-wide Sollatek protection ensuring clean, stable power for equipment.",
  },
  {
    id: "p4",
    title: "Grid Integration",
    category: "Medium-Voltage",
    img: "https://images.pexels.com/photos/34085/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600",
    gallery: [
      "https://images.pexels.com/photos/34085/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/417192/pexels-photo-417192.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    summary:
      "Industrial plant grid interconnection with interface studies and approvals.",
  },
  {
    id: "p5",
    title: "Intake Rehabilitation",
    category: "Hydropower",
    img: "https://images.pexels.com/photos/635438/pexels-photo-635438.jpeg?auto=compress&cs=tinysrgb&w=1600",
    gallery: [
      "https://images.pexels.com/photos/635438/pexels-photo-635438.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    summary: "Rehabilitation of hydropower intake and penstock for improved yield.",
  },
];

export function getProject(id: string) {
  return projects.find((p) => p.id === id) ?? null;
}
