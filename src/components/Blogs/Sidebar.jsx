import React from "react";
import Select from "react-select";
import Image from "next/image";
import search from "@/images/search.svg";
import info from "@/images/info.svg";
import selectDrop from "@/images/select-drop.svg";
import linkIcon from "@/images/link-icon.svg";
import linkedin from "@/images/linkedin.svg";
import whatsappIcon from "@/images/whatsapp-icon.svg";
import instaIcon from "@/images/insta-icon.svg";
import xIcon from "@/images/x-ixon.svg";
import gmail from "@/images/gmail.svg";
import { useGlobalContext } from "@/context/GlobalContext";

const Sidebar = ({
  handleSearchChange,
  handleSortChange,
  totalResources,
  searchRef,
  selectedLocation,
  setSelectedLocation,
  selectedOption,
  setSelectedOption,
  selectedTag,
  setSelectedTag

}) => {
  const { blogLocations, blogLookingFor, blogTags, loading } = useGlobalContext();

  console.log("sjkdfjksdhfksdf", blogLocations)

  // const locationOptions = blogLocations?.map((item) => ({
  //   value: item.id,
  //   label: item.name,
  // }));

  const allowedLocationIds = [1, 2, 4, 5, 9];

  const locationOptions = allowedLocationIds.map((id) => {
    const found = blogLocations?.find((item) => item.id == id);
    return found
      ? { value: found?.id, label: found?.name }
      : null;
  }).filter(Boolean);

  const optionOptions = blogLookingFor?.map((item) => ({
    value: item,
    label: item
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()), // Capitalize
  }));

  const TagOptions = blogTags?.map((item) => ({
    value: item,
    label: item
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()), // Capitalize
  }));

  // const locationOptions = [
  //   { value: "bangalore", label: "Bangalore" },
  //   { value: "whitefield", label: "Whitefield" },
  //   { value: "koramangala", label: "Koramangala" },
  //   { value: "jp_nagar", label: "JP Nagar" },
  //   { value: "north_bangalore", label: "North Bangalore" },
  // ];

  // const optionOptions = [
  //   { value: "birthdays", label: "Birthdays" },
  //   { value: "corporate", label: "Corporate" },
  //   { value: "bachelor", label: "Bachelor(etta)" },
  //   { value: "things_to_do", label: "Things to do" },
  //   { value: "escape_rooms", label: "Escape Rooms" },
  //   { value: "farewells", label: "Farewells" },
  //   { value: "couples", label: "Couples" },
  //   { value: "virtual", label: "Virtual" },
  //   { value: "others", label: "Others" },
  // ];

  // Custom styles to match your existing design
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "rgba(243, 244, 244, 0.1)",
      borderColor: state.isFocused ? "#FFAE00" : "rgba(255, 174, 0, 0.15)",
      borderRadius: "50px",
      padding: "12px 10px",
      color: "#FFFFFF",
      cursor: "pointer",
      "&:hover": {
        borderColor: "rgba(255, 174, 0, 0.3)",
      },
      input: {
        color: "#FFFFFF",
        fontSize: "20px",
      },
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isFocused ? "#FFAE00" : "#FFAE00", // arrow color
      "&:hover": {
        color: "#FFAE00",
      },
    }),

    indicatorSeparator: () => ({
      display: "none", // optional: line hata deta hai
    }),
    menu: (base) => ({
      ...base,
      background: "#272727",
      borderRadius: "10px",
      zIndex: 9999,
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? "rgba(255, 174, 0, 0.1)" : "transparent",
      color: state.isFocused ? "#FFAE00" : "#FFFFFF",
      cursor: "pointer",
      "&:hover": {
        background: "rgba(255, 174, 0, 0.1)",
        color: "#FFAE00",
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "#FFFFFF",
      fontSize: "20px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "rgba(255, 255, 255, 0.5)",
      fontSize: "20px",
    }),
  };

  const handleShare = (platform) => {
    const currentUrl = window.location.href;
    const title = "Check out this blog post";
    const text = "Interesting read! Have a look.";

    let shareUrl = "";

    switch (platform) {
      case "copy":
        navigator.clipboard.writeText(currentUrl).then(() => {
          alert("Link copied to clipboard!");
        });
        return;

      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(
          `${title} - ${currentUrl}`
        )}`;
        break;

      case "instagram":
        // Instagram sharing is limited; fallback to copying
        shareUrl = `https://www.instagram.com/?url=${encodeURIComponent(currentUrl)}`;
        break;

      case "twitter": // X
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(currentUrl)}`;
        break;

      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          currentUrl
        )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(text)}`;
        break;

      case "gmail":
        shareUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
          title
        )}&body=${encodeURIComponent(`${text}\n\n${currentUrl}`)}`;
        break;

      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="resource-sidebar">
      <h3 className="sec-head medium-20 text-center">Find Blog</h3>
      <div className="form-group search-group style-2 mt-4">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search..."
            onKeyDown={handleSearchChange}
            ref={searchRef}
          />
          <Image src={search} alt="search" />
        </div>
      </div>
      <p className="para text-center mb-0">{totalResources} blog found!</p>

      <div className="filter-head">
        <h3 className="sec-head medium-20 mb-0">Filter</h3>
        <div className="tooltip-container">
          <button className="border-0">
            <Image src={info} alt="info" />
          </button>

          <div className="tooltip-text">
            This is your tooltipThis is your tooltipThis is your tooltipThis
            is your tooltipThis is your tooltip
          </div>
        </div>
      </div>

      <div className="form-group search-group style-2 mt-4">
        <div className="input-group" data-lenis-prevent>
          {/* <input
            type="text"
            placeholder="Select tag"
            onKeyDown={handleSearchChange}
            ref={searchRef}
          /> */}
          <Select
          data-lenis-prevent
            placeholder="Select Tag"
            options={TagOptions}
            value={selectedTag}
            onChange={(option) => setSelectedTag(option)}
            styles={customStyles}
          />
          <Image src={search} alt="search" />
        </div>
      </div>
      <p className="para text-center mb-0">{totalResources} blog found!</p>

      <h3 className="sec-head mt-5 medium-20 text-center">Sort By</h3>
      <div className="filter-head">
        <h3 className="sec-head medium-20 mb-0">Location</h3>
        <div className="tooltip-container">
          <button className="border-0">
            <Image src={info} alt="info" />
          </button>

          <div className="tooltip-text">
            This is your tooltipThis is your tooltipThis is your tooltipThis
            is your tooltipThis is your tooltip
          </div>
        </div>

      </div>
      <div className="form-group mt-4 style-2">
        <div className="input-group select-group" data-lenis-prevent>
          <Select
          data-lenis-prevent
            placeholder="Select City"
            options={locationOptions}
            value={selectedLocation}
            onChange={(option) => setSelectedLocation(option)}
            styles={customStyles}
          />
          {/* <Image src={selectDrop} alt="select" className="select-icon" /> */}
        </div>
      </div>

      <div className="filter-head">
        <h3 className="sec-head medium-20 mb-0">Looking For?</h3>
        <div className="tooltip-container">
          <button className="border-0">
            <Image src={info} alt="info" />
          </button>

          <div className="tooltip-text">
            This is your tooltipThis is your tooltipThis is your tooltipThis
            is your tooltipThis is your tooltip
          </div>
        </div>
      </div>
      <div className="form-group mt-4 style-2">
        <div className="input-group select-group" data-lenis-prevent>
          <Select
            data-lenis-prevent
            placeholder="Select Option"
            options={optionOptions}
            value={selectedOption}
            onChange={(option) => setSelectedOption(option)}
            styles={customStyles}
          />
          {/* <Image src={selectDrop} alt="select" className="select-icon" /> */}
        </div>
      </div>

      <div className="share-blog-list">
        <h3 className="sec-head pt-80 mb-3 medium-20 text-center">Share Blog</h3>
        <ul className="bl-soc-list">
          <li>
            <button onClick={() => handleShare("copy")}>
              <Image src={linkIcon} alt="copy link" width={35} height={35} />
            </button>
          </li>
          <li>
            <button onClick={() => handleShare("whatsapp")}>
              <Image src={whatsappIcon} alt="share on whatsapp" width={35} height={35} />
            </button>
          </li>
          <li>
            <button onClick={() => handleShare("instagram")}>
              <Image src={instaIcon} alt="share on instagram" width={35} height={35} />
            </button>
          </li>
          <li>
            <button onClick={() => handleShare("twitter")}>
              <Image src={xIcon} alt="share on twitter" width={35} height={35} />
            </button>
          </li>
          <li>
            <button onClick={() => handleShare("linkedin")}>
              <Image src={linkedin} alt="share on linkedin" width={35} height={35} />
            </button>
          </li>
          <li>
            <button onClick={() => handleShare("gmail")}>
              <Image src={gmail} alt="share on gmail" width={35} height={35} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;