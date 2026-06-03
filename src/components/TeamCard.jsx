import React from "react";
import Image from "next/image";
import tWh from "@/images/t-wh.svg";
import tIns from "@/images/t-ins.svg";
import tLink from "@/images/t-link.svg";
import tX from "@/images/t-x.svg";
import tEmail from "@/images/t-email.svg";
import tShare from "@/images/t-share.svg";
import Link from "next/link";

const TeamCard = ({ type, data }) => {
  const renderSocialLinks = (data) => {
    if (
      !data?.whatsapp &&
      !data?.instagram &&
      !data?.linkedin &&
      !data?.twitter &&
      !data?.gmail &&
      !data?.link
    )
      return null;

    const trackGTMClick = (platform, url) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "social_click",
        social_platform: platform,
        link_url: url,
      });
    };

    return (
      <ul className="social-links">
        {data?.whatsapp && (
          <li>
            <Link
              href={`https://wa.me/${data.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGTMClick("WhatsApp", `https://wa.me/${data.whatsapp}`)}
            >
              <Image src={tWh} alt="WhatsApp" />
            </Link>
          </li>
        )}

        {data?.instagram && (
          <li>
            <Link
              href={data.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGTMClick("Instagram", data.instagram)}
            >
              <Image src={tIns} alt="Instagram" />
            </Link>
          </li>
        )}

        {data?.linkedin && (
          <li>
            <Link
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGTMClick("LinkedIn", data.linkedin)}
            >
              <Image src={tLink} alt="LinkedIn" />
            </Link>
          </li>
        )}

        {data?.twitter && (
          <li>
            <Link
              href={data.twitter}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGTMClick("Twitter", data.twitter)}
            >
              <Image src={tX} alt="Twitter / X" />
            </Link>
          </li>
        )}

        {data?.gmail && (
          <li>
            <a
              href={`mailto:${data.gmail}`}
              onClick={() => trackGTMClick("Email", `mailto:${data.gmail}`)}
            >
              <Image src={tEmail} alt="Email" />
            </a>
          </li>
        )}

        {data?.link && (
          <li>
            <Link
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGTMClick("Website", data.link)}
            >
              <Image src={tShare} alt="Website" />
            </Link>
          </li>
        )}
      </ul>
    );
  };

  switch (type) {
    case "founder":
      return (
        <div className="team-card big">
          <div className="row align-items-center row-gap-25">
            <div className="col-lg-5 col-12">
              <div className="team-img">
                {data?.image && (
                  <img
                    src={data?.image}
                    style={{ borderRadius: "18px", height: "auto" }}
                    alt="team"
                  />
                )}
              </div>
            </div>
            <div className="col-lg-7 col-12">
              <div className="team-con ms-4">
                <h3 className="team-title">{data?.name}</h3>
                <p className="desig">{data?.designation}</p>
                {renderSocialLinks(data)}

                <p
                  className="para"
                  dangerouslySetInnerHTML={{ __html: data?.description }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      );
    case "leader":
      return (
        <div className="team-card leader">
          <div className="row align-items-center row-gap-25">
            <div className="col-lg-6 col-12">
              <div className="team-img">
                {data?.image && (
                  <img
                    src={data?.image}
                    alt="team"
                  />
                )}
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="team-con">
                <h3 className="team-title">{data?.name}</h3>
                <p className="desig">{data?.designation}</p>
                {renderSocialLinks(data)}
              </div>
            </div>
            <div className="col-12">
              <p
                className="para"
                dangerouslySetInnerHTML={{ __html: data?.description }}
              ></p>
            </div>
          </div>
        </div>
      );
    case "advisor":
      return (
        <div className="team-card leader advisor">
          <div className="row align-items-center advisor-row">
            <div className="col-lg-2 col-12">
              <div className="team-img">
                {data?.image && (
                  <img
                    src={data?.image}
                    alt="team"
                  />
                )}
              </div>
            </div>
            <div className="col-lg-10 col-12">
              <div className="team-con">
                <div className="tp-team mb-3">
                  <div className="t-left">
                    <h3 className="team-title">{data?.name}</h3>
                    <p className="desig">{data?.designation}</p>
                  </div>
                  <div className="t-right">{renderSocialLinks(data)}</div>
                </div>
                <p
                  className="para"
                  dangerouslySetInnerHTML={{ __html: data?.description }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      );
  }
  return <div></div>;
};

export default TeamCard;
