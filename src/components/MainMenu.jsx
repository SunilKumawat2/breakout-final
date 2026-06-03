"use client";
import React, { useState, useEffect } from "react";
import { Collapse, Nav } from "react-bootstrap";
import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalContext";
import api from "@/helpers/api";
const MainMenu = ({ closeMenu }) => {
  const [openMenus, setOpenMenus] = useState({
    "Escape Rooms": true, // Set first menu item to be open by default
  });
  const menuItemsData = [
    {
      title: "Escape Rooms",
      link: null,
      subItems: [
        {
          title: "Koramangala",
          link: "#",
        },
        {
          title: "J P Nagar",
          link: "#",
        },
        {
          title: "Whitefield",
          link: "#",
        },
        {
          title: "Virtual Rooms",
          link: "#",
        },
      ],
    },
    {
      title: "Parties",
      link: null,
      subItems: [
        {
          title: "Birthdays",
          link: "#",
          subItems: [
            {
              title: "Toddlers",
              link: "#",
              disabled: true,
            },
            {
              title: "Kids",
              link: "#",
              disabled: true,
            },
            {
              title: "Tweens",
              link: "#",
              disabled: true,
            },
            {
              title: "Teens",
              link: "#",
              disabled: true,
            },
            {
              title: "Friend / Parent",
              link: "#",
              disabled: true,
            },
            {
              title: "Love",
              link: "#",
              disabled: true,
            },
          ],
        },
        {
          title: "Bachelor(ette)",
          link: "/parties/bachelor",
        },
        {
          title: "Farewells",
          link: "/parties/farewell",
        },
      ],
    },
    {
      title: "Corporate",
      link: null,
      subItems: [
        {
          title: "Unwind",
          link: "/corporate/unwind",
        },
        {
          title: "Retreats",
          link: "/corporate/retreat",
        },
        {
          title: "Connect",
          link: "/corporate/connect-l-n-d",
        },
      ],
    },
    {
      title: "More to Explore",
      link: null,
      subItems: [
        {
          title: "Blogs",
          link: "/blogs",
        },
        {
          title: "Resources",
          link: "/resources",
        },
        {
          title: "About Us",
          link: "/about",
        },
        {
          title: "Career",
          link: "/career",
        },
        {
          title: "Contact",
          link: "/contact",
        },
      ],
    },
  ];
  const { escaperoomLocations, loading, errors } = useGlobalContext();
  const [menuItems, setMenuItems] = useState(menuItemsData);

  useEffect(() => {
    const fetchBirthdayList = async () => {
      const response = await api.get("/birthday-listing");
      setMenuItems((prevMenuItems) =>
        prevMenuItems.map((item) => {
          if (item.title === "Parties") {
            return {
              ...item,
              subItems: item.subItems.map((subItem) => {
                if (subItem.title === "Birthdays") {
                  return {
                    ...subItem,
                    subItems: response?.data?.data.map((birthdayItem) => ({
                      title: birthdayItem.title,
                      link: `/parties/birthday/${birthdayItem.slug}`,
                    })),
                  };
                }
                return subItem;
              }),
            };
          }
          return item;
        })
      );
    };
    fetchBirthdayList();
    if (escaperoomLocations) {
      setMenuItems(
        menuItemsData.map((item) => {
          if (item.title === "Escape Rooms") {
            return {
              ...item,
              subItems: [
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
    }
  }, [escaperoomLocations]);

  const toggleMenu = (menuTitle) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuTitle]: !prev[menuTitle],
    }));
  };

  const Arrow = ({ open, color = "#f0a300" }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="none"
        viewBox="0 0 32 32"
        style={{
          transform: open ? "rotate(0deg)" : "rotate(180deg)",
          transition: "all 0.3s ease",
        }}
      >
        <mask
          id="arrow-mask"
          width="32"
          height="32"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "alpha" }}
        >
          <path fill={open ? "#fff" : color} d="M0 32h32V0H0z" />
        </mask>
        <g mask="url(#arrow-mask)">
          <path
            fill={open ? "#fff" : color}
            d="m16 11.1-8 8 1.7 1.7 6.3-6.3 6.3 6.3 1.7-1.7-8-8Z"
          />
        </g>
      </svg>
    );
  };

  return (
    <div className="main-menu-container" data-lenis-prevent>
      <div className="main-menu-wrapper scrollable-container" data-lenis-prevent>
        <Nav className="flex-column">
          {menuItems.map((item, index) => (
            <div key={index} className="main-menu-item">
              <div
                className="menu-title"
                onClick={() => toggleMenu(item.title)}
                aria-controls={`menu-${index}`}
                aria-expanded={openMenus[item.title]}
              >
                <span
                  style={{ color: openMenus[item.title] ? "#fff" : "#f0a300" }}
                >
                  {item.title}
                </span>
                <Arrow open={openMenus[item.title]} />
              </div>
              <Collapse in={openMenus[item.title]}>
                <div id={`menu-${index}`}>
                  <Nav className="flex-column submenu">
                    {item.subItems.map((subItem, subIndex) => (
                      <Nav.Item key={subIndex}>
                        {subItem.subItems ? (
                          subItem.subItems &&
                          subItem.subItems.length > 0 && (
                            <>
                              <div
                                className="menu-title normal third-level"
                                onClick={() =>
                                  toggleMenu(`${item.title}-${subItem.title}`)
                                }
                                aria-controls={`submenu-${index}-${subIndex}`}
                                aria-expanded={
                                  openMenus[`${item.title}-${subItem.title}`]
                                }
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  marginLeft: 0,
                                  // marginTop: 5,
                                }}
                              >
                                <span
                                // style={{
                                //   color: openMenus[
                                //     `${item.title}-${subItem.title}`
                                //   ]
                                //     ? "#fff"
                                //     : "#f0a300",
                                // }}
                                >
                                  {subItem.title}
                                </span>
                                <Arrow
                                  open={
                                    openMenus[`${item.title}-${subItem.title}`]
                                  }
                                  color={"#fff"}
                                />
                              </div>
                              <Collapse
                                in={openMenus[`${item.title}-${subItem.title}`]}
                              >
                                <div
                                  id={`submenu-${index}-${subIndex}`}
                                  style={{ marginLeft: 10 }}
                                >
                                  <Nav className="flex-column subsubmenu">
                                    {subItem.subItems.map((thirdItem, thirdIndex) => (
                                      <Nav.Item key={thirdIndex}>
                                        <Link
                                          href={thirdItem.link}
                                          className="nav-link"
                                          onClick={() => {
                                            closeMenu();

                                            window.dataLayer = window.dataLayer || [];
                                            window.dataLayer.push({
                                              event: "cta_click",
                                              button_name: thirdItem.title,
                                              destination: thirdItem.link,
                                              parent_menu: subItem.title,
                                              page: window.location.pathname,
                                              section: "sub_sub_menu",
                                            });
                                          }}
                                        >
                                          {thirdItem.title}
                                        </Link>
                                      </Nav.Item>
                                    ))}
                                  </Nav>
                                </div>
                              </Collapse>
                            </>
                          )
                        ) : (
                          <Link
                            onClick={() => {
                              closeMenu();

                              window.dataLayer = window.dataLayer || [];
                              window.dataLayer.push({
                                event: "cta_click",
                                button_name: subItem.title,
                                destination: subItem.link,
                                page: window.location.pathname,
                                section: "sub_menu",
                              });
                            }}
                            href={subItem.link}
                            className="nav-link"
                          >
                            {subItem.title}
                          </Link>
                        )}
                      </Nav.Item>
                    ))}
                  </Nav>
                </div>
              </Collapse>
            </div>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default MainMenu;
