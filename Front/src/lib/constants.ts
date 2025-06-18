import {
  type LucideIcon,
  ArrowRight,
  User,
  Fingerprint,
  Settings,
} from "lucide-react";
export const featureCards: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: ArrowRight,
    title: "Getting Started",
    description:
      "Everything you need to know to get started and get to work with the application.",
  },
  {
    icon: User,
    title: "Admin Settings",
    description:
      "Learn how to manage your current workspace or your enterprise space.",
  },
  {
    icon: Fingerprint,
    title: "Login and Verification",
    description:
      "Read on to learn how to sign in with your email address, or your Apple or Google.",
  },
  {
    icon: Settings,
    title: "Account Information",
    description: "Adjust your profile and preferences to meet your needs.",
  },
];

export const accordion = [
  {
    question: "Is it system fully built and finished?",
    answer: "No, I will finish it as soon possible though.",
  },
  {
    question: "What if there is a bug in the system?",
    answer: "Please do report @ charleetan2020@gmail.com if you do. :)",
  },
  {
    question: "What are future features to be added?",
    answer: "For now, I am not sure, sorry.",
  },
];
