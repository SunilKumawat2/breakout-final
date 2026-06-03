"use client";
import React, { useEffect, useState } from "react";
import HeaderPart from "@/components/birthday-invite/HeaderPart";
import bInviteIllus1 from "@/images/b-invite-illus1.png";
import bInviteIllus2 from "@/images/b-invite-illus2.png";
import bInviteIllus3 from "@/images/b-invite-illus3.png";
import bInviteIllus4 from "@/images/b-invite-illus4.png";
import Image from "next/image";
import ActivityChart from "@/components/birthday-invite/ActivityChart";
import ParkingSec from "@/components/birthday-invite/ParkingSec";
import ThemeSec from "@/components/birthday-invite/ThemeSec";
import Menu from "@/components/birthday-invite/Menu";
import ContactPerson from "@/components/birthday-invite/ContactPerson";
import ReviewWidget from "@/components/birthday-invite/ReviewWidget";
import FaqSection from "@/components/FaqSection";
import bInviteIllus5 from "@/images/b-invite-illus5.png";
import InvForm from "@/components/birthday-invite/InvForm";
import api from "@/app/helpers/api";
import { useParams } from "next/navigation";

const BirthdayInvite = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/invite/${id}`);
      setData(response.data.data);
      console.log("b invite", response.data.data);
    };
    fetchData();
  }, [id]);

  return (
    <div className="b-inv-page">
      <div className="black-gr-div">
        <HeaderPart data={data} />
        <ActivityChart data={data?.section2} />
        <Image src={bInviteIllus1} className="illus-image" alt="bg" />
      </div>
      <div className="black-gr-div">
        <ParkingSec data={data?.section3} new_data={data}/>
        <ThemeSec data={data?.section3} />
        <Image src={bInviteIllus2} className="illus-image" alt="bg" />
      </div>
      <div className="black-gr-div">
        <Menu data={data?.section4} />
        <ContactPerson data={data?.section5} />
        <Image src={bInviteIllus3} className="illus-image" alt="bg" />
      </div>
      <div className="black-gr-div">
        <ReviewWidget data={data} />
        <Image src={bInviteIllus4} className="illus-image" alt="bg" />
      </div>
      <div className="black-gr-div">
        <FaqSection className="sec-padding-top" data={data?.faqs} />
        <InvForm inviteId={id} />
        <Image src={bInviteIllus5} className="illus-image" alt="bg" />
      </div>
    </div>
  );
};

export default BirthdayInvite;
