"use client";
import React, { useEffect, useState } from "react";
import VenueInner from "@/components/VenueInner";
import { useParams } from "next/navigation";
import api from "@/helpers/api";

const page = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      //byg-brewski
      // const response = await api.get(`/venue/byg-brewski`);
      const response = await api.get(`/venue/${id}`);
      setVenue(response.data.data);
    };
    fetchVenue();
  }, [id]);
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-12 col-12">
          <VenueInner venue={venue} />
        </div>
      </div>
    </div>
  );
};

export default page;
