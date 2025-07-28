import type { IStyle } from "@/pages/Home/Home";
import { Github, Linkedin, Youtube } from "lucide-react";
import { NavLink } from "react-router";

export default function Footer({ className }: IStyle) {
  return (
    <footer
      className={`footer sm:footer-horizontal bg-base-200 text-base-content p-10 ${className} `}
    >
      <nav>
        <h6 className="footer-title">Services</h6>
        <NavLink to="/collection" className="link link-hover">
          Request Waste Collection
        </NavLink>
        <NavLink to="/profile/request" className="link link-hover">
          View Collection Request
        </NavLink>
        <NavLink to="/locations" className="link link-hover">
          Available send-off locations
        </NavLink>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
      </nav>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <Linkedin
            size={20}
            onClick={() =>
              (window.location.href =
                "https://www.linkedin.com/in/charlee-tan-1833902b6/")
            }
          />
          <Youtube
            size={20}
            onClick={() =>
              (window.location.href =
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ")
            }
          />
          <Github
            size={20}
            onClick={() =>
              (window.location.href = "https://www.github.com/cakwei")
            }
          />
        </div>
      </nav>
    </footer>
  );
}
