

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "@/images/logo.png";
import fb from "@/images/fb.svg";
import yt from "@/images/yt.svg";
import ins from "@/images/ins.svg";
import lin from "@/images/lin.svg";
import phoneIcon from "@/images/phone-icc.svg";
import mailIcon from "@/images/mail-icc.svg";

import { useGlobalContext } from "@/context/GlobalContext";

const Footer = () => {
  const policyLinks = [
    { title: "Privacy Policy", link: "/privacy-policy" },
    { title: "Terms and Conditions", link: "/terms-and-conditions" },
    { title: "Refund Policy", link: "/refund-policy" },
  ];

  const initialColumns = [
    {
      title: "Escape Room",
      links: [],
    },
    {
      title: "Parties",
      links: [
        { title: "Birthdays", link: "/parties/birthday" },
        { title: "Farewells", link: "/parties/farewell" },
        { title: "Bachelor(ette)", link: "/parties/bachelor" },
      ],
    },
    {
      title: "Corporate",
      links: [
        { title: "Unwind", link: "/corporate/unwind" },
        { title: "Retreats", link: "/corporate/retreat" },
        { title: "Connect", link: "/corporate/connect-l-n-d" },
      ],
    },
  ];

  const { escaperoomLocations } = useGlobalContext();
  const [menuItems, setMenuItems] = useState(initialColumns);
  const { siteSettings, loading } = useGlobalContext();

  console.log("siteSettings", siteSettings);


  // 🔹 Inject Escape Room locations
  useEffect(() => {
    if (!escaperoomLocations?.length) return;

    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.title === "Escape Room") {
          return {
            ...item,
            links: [
              ...escaperoomLocations.map((loc) => ({
                title: loc.title,
                link: `/${loc.slug}`,
              })),
              {
                title: "Virtual Rooms",
                link: "/virtual",
              },
            ],
          };
        }
        return item;
      })
    );
  }, [escaperoomLocations]);

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="ft-inner">
          <div className="row flex-lg-row-reverse row-gap-25">
            <div className="col-lg-3 col-12">
              <div className="ft-logo-col">
                <Link href="/" className="ft-logo">
                  {siteSettings?.siteLogo ? (
                    <Image
                      src={siteSettings.siteLogo}
                      alt="logo"
                      width={180}
                      height={60}
                      priority
                    />
                  ) : (
                    <Image
                      src={logo}
                      alt="logo"
                      width={180}
                      height={60}
                      priority
                    />
                  )}
                </Link>


                <ul className="ft-contact-list">
                  <li>
                    <Link href={`mailto:${siteSettings?.contactEmail}`} >
                      <Image src={mailIcon} alt="mail" />
                      <span>{siteSettings?.contactEmail}</span>
                    </Link>
                  </li>
                  <li>
                    <Link href={`tel:${siteSettings?.contactPhone}`}>
                      <Image src={phoneIcon} alt="phone" />
                      <span>{siteSettings?.contactPhone}</span>
                    </Link>
                  </li>
                </ul>

                <ul className="soc-links">
                  {
                    siteSettings?.facebookUrl && (
                      <li>
                        <a href={siteSettings?.facebookUrl} target="_blank" rel="noopener noreferrer">
                          <Image src={fb} alt="fb" />
                        </a>
                      </li>
                    )
                  }

                  {
                    siteSettings?.youtubeUrl && (
                      <li>
                        <a href={siteSettings?.youtubeUrl} target="_blank" rel="noopener noreferrer">
                          <Image src={yt} alt="yt" />
                        </a>
                      </li>
                    )
                  }

                  {
                    siteSettings?.instagramUrl && (
                      <li>
                        <a href={siteSettings?.instagramUrl} target="_blank" rel="noopener noreferrer">
                          <Image src={ins} alt="insta" />
                        </a>
                      </li>
                    )
                  }

                  {
                    siteSettings?.linkedinUrl && (
                      <li>
                        <a href={siteSettings?.linkedinUrl} target="_blank" rel="noopener noreferrer">
                          <Image src={lin} alt="lin" />
                        </a>
                      </li>
                    )
                  }
                </ul>

              </div>
            </div>

            <div className="col-lg-9 col-12">
              <div className="row row-gap-25">
                {menuItems?.map((item, index) => (
                  <div className="col-lg-4 col-6" key={index}>
                    <h4 className="ft-head">{item.title}</h4>

                    <ul className="ft-list">
                      {item.links.map((link, idx) => (
                        <li key={idx}>
                          <Link
                            href={link.link}
                            onClick={() => {
                              window.dataLayer = window.dataLayer || [];
                              window.dataLayer.push({
                                event: "cta_click",
                                button_name: link.title,
                                destination: link.link,
                                parent_menu: item.title,
                                page: window.location.pathname,
                                section: "footer_menu",
                              });
                            }}
                          >
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="ft-btm">
          <p>&copy; {new Date().getFullYear()} {siteSettings?.siteName} all rights reserved.</p>
          <ul className="ft-policy-list">
            {policyLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.link}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
