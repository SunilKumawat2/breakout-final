"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@/images/logo.png";
import phone from "@/images/phone.svg";
import menu from "@/images/menu.svg";
import MainMenu from "./MainMenu";
import { useGlobalContext } from "@/context/GlobalContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainMenuRef = useRef(null);
  const { siteSettings, loading } = useGlobalContext();

  console.log("siteSettings_header", siteSettings);


  // Click outside handler
  const handleClickOutside = useCallback((event) => {
    if (
      mainMenuRef.current &&
      !mainMenuRef.current.contains(event.target) &&
      // Avoid closing when clicking menu icon (we want the icon to toggle)
      event.target.getAttribute("alt") !== "menu"
    ) {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, handleClickOutside]);

  const links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Escape Room",
      link: "/escape-rooms",
    },
    {
      name: "Parties",
      link: "/parties",
    },
    {
      name: "Corporate",
      link: "/corporate",
    },
  ];

  return (
    <nav className="main-nav">
      <div className="container" style={{ position: "relative" }}>
        <div className="nav-inner">
          <Link className="logo" href="/">
            <Image
              src={siteSettings?.siteLogo || logo}
              alt="logo"
              width={180}
              height={60}
              priority
            />
          </Link>

          <ul className="nav-list" onClick={() => {
            sessionStorage.removeItem("home_dropdown");
            sessionStorage.removeItem("home_scroll")
          }}>
            {links &&
              links.map((link) => (
                <li key={link.name}>
                  <Link href={link.link}>{link.name}</Link>
                </li>
              ))}
          </ul>
          <ul className="r-list">
            <li>
              <Link
                href="/book-online"
                className="main-btn"
                onClick={() => {
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    event: "cta_click",
                    button_name: "Book Now",
                    destination: "/book-online",
                  });
                }}
              >
                <span>Book Now</span>
              </Link>
            </li>
            <li>
              <Link href="tel:+919742386781">
                <Image src={phone} alt="menu" />
              </Link>
            </li>
            <li>
              <Image
                src={menu}
                alt="menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{ cursor: "pointer" }}
              />
            </li>
          </ul>
        </div>
        <ul className="nav-list mb-4 mob-nav-list">
          {links &&
            links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.link}
                  onClick={() => {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                      event: "cta_click",
                      button_name: link.name,
                      destination: link.link,
                      page: window.location.pathname,
                      section: "mobile_nav_menu",
                    });
                  }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
        </ul>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={mainMenuRef}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 80 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 10,
              }}
            >
              <MainMenu closeMenu={() => setIsMenuOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
