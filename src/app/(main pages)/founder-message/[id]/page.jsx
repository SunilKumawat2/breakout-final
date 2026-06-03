import React from "react";

import BirthdayBanner from "@/components/BirthdayBanner";
import VenueImgSlider from "@/components/VenueImgSlider";

import api from "@/helpers/api";

import Image from "next/image";
import matterIllus from "@/images/matter-illus.svg";
import CommonVideoPlayer from "@/components/CommonVideoPlayer";
import InnerPageBanner from "@/components/InnerPageBanner";
import PartyExpertCon from "@/components/PartyExpertCon";

export async function getData(id) {
  try {
    const res = await api.get(`/whybirthdaymatter/${id}`);
    return {
      founderMessage: res?.data?.data || null,
    };
  } catch (error) {
    console.error("API Error:", error);
    return {
      founderMessage: null,
    };
  }
}

const SigngleBlog = async ({ params }) => {
  const { id } = params;
  console.log("sdfmnsdbnfjbsdjfhgsjdfh", id)
  const data = await getData(id);
  const founderMessage = data?.founderMessage || null;
  console.log("founderMessage_founderMessage", founderMessage)
  const images =
    founderMessage?.images && founderMessage?.images?.length > 1
      ? founderMessage?.images.slice(1).map((img) => img.url)
      : [];

  const bannerImage =
    founderMessage?.images && founderMessage?.images?.length > 0
      ? founderMessage?.images[0].url
      : null;
  return (
    <>
      {founderMessage && (
        <InnerPageBanner
          banner={{ ...founderMessage, image: bannerImage }}
          bdayInner={true}
        />
      )}

      {founderMessage?.messagetitle && (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-12">
              <div className="cus-card">
                <p
                  className="para mb-0 yellow-text"
                  style={{ fontStyle: "italic" }}
                  dangerouslySetInnerHTML={{
                    __html: founderMessage?.messagetitle?.replace(
                      /<a /g,
                      '<a target="_blank" rel="noopener noreferrer" '
                    ),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="black-gr-div">
        <section className="pt-80">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {founderMessage?.video && (
                  <CommonVideoPlayer src={founderMessage?.video} />
                )}
                {images && <VenueImgSlider images={images} />}
              </div>
              <div className="col-lg-12">
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{
                    __html: founderMessage?.content || "",
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        {
          id == "birthday-party" && (
            <PartyExpertCon className="pt-80" data="birthday" />
          )
        }
        {
          id == "corporate" && (
            <PartyExpertCon className="pt-80" data="corporate" />
          )
        }
        {
          id == "couple" && (
            <PartyExpertCon className="pt-80" data="birthday" />
          )
        }
        {
          id == "Connect" && (
            <PartyExpertCon className="pt-80" data="corporate" />
          )
        }
        <Image
          src={matterIllus}
          className="illus-image"
          alt="founder-message"
        />
      </div>
    </>
  );
};

export default SigngleBlog;
