// import tsIllus from "@/images/ts-illus.svg";
// import Image from "next/image";
// import {
//   FaRegSmile,
//   FaUsers,
//   FaGraduationCap,
//   FaRocket,
//   FaEnvelope,
//   FaCalendar,
//   FaClock,
// } from "react-icons/fa";
// import CareerForm from "@/components/CareerForm";
// import api from "@/helpers/api";

// export async function generateMetadata() {
//   try {
//     const res = await api.get(`/seo-page/career`);
//     const seo = res.data?.data?.pageSeo;

//     return {
//       title: seo?.meta_title,
//       description: seo?.meta_description,
//       keywords: seo?.meta_keywords,
//       openGraph: {
//         title: seo?.og_title,
//         description: seo?.og_description,
//         images: [seo?.image],
//         type: "website",
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching SEO details:", error);
//   }
//   return {
//     title: "Career",
//     description: "Career",
//     keywords: "Career",
//     openGraph: {
//       title: "Career",
//       description: "Career",
//     },
//   };
// }

// const reasons = [
//   {
//     icon: (
//       <FaRegSmile
//         size={32}
//         style={{ minWidth: "22px" }}
//         className="text-yellow me-3"
//       />
//     ),
//     title: "Immersive Experiences",
//     desc: "As an escape room enthusiast, you understand the thrill of solving puzzles, unraveling mysteries, and working together in a high-pressure environment. As a member of our team, you’ll have the unique opportunity to create these immersive experiences for others, ensuring unforgettable memories for every participant.",
//   },
//   {
//     icon: (
//       <FaUsers
//         size={32}
//         style={{ minWidth: "22px" }}
//         className="text-yellow me-3"
//       />
//     ),
//     title: "Collaborative Environment",
//     desc: "Our company fosters a collaborative and inclusive culture. We believe that great ideas come from diverse perspectives, and we encourage our team members to share their insights and creativity. Working together, we constantly push the boundaries of what an escape room can be.",
//   },
//   {
//     icon: (
//       <FaGraduationCap
//         size={32}
//         style={{ minWidth: "22px" }}
//         className="text-yellow me-3"
//       />
//     ),
//     title: "Professional Development",
//     desc: "We are committed to the growth and development of our employees. You’ll have access to ongoing training and skill-building opportunities, allowing you to enhance your expertise in game design, puzzle creation, customer service, and more. We believe in investing in our team members and supporting their professional aspirations.",
//   },
//   {
//     icon: (
//       <FaRocket
//         size={32}
//         style={{ minWidth: "22px" }}
//         className="text-yellow me-3"
//       />
//     ),
//     title: "Thriving Industry",
//     desc: "Escape rooms have gained tremendous popularity worldwide, and the industry continues to grow at an impressive pace. By joining our team, you’ll become part of a thriving industry that offers endless possibilities for innovation and success.",
//   },
// ];

// const page = () => {
//   return (
//     <div className="carrer-page pt-80">
//       <div className="black-gr-div">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-12">
//               <h1 className="sec-head medium sm-head text-center yellow-text">
//                 Career
//               </h1>

//               <div
//                 className="mb-4 d-flex justify-content-center align-items-center gap-4"
//                 style={{ fontSize: "1.1rem", color: "#ccc" }}
//               >
//                 <span>
//                   <FaEnvelope color="#FFAE00 " className="me-2" /> breakout2022
//                 </span>
//                 <span>
//                   <FaCalendar color="#FFAE00 " className="me-2" /> June 2, 2023
//                 </span>
//                 <span>
//                   <FaClock color="#FFAE00 " className="me-2" /> 9:30 am
//                 </span>
//               </div>

//               <div className="main-con para mb-4">
//                 <h2 className="mb-3 text-center" style={{ fontWeight: 500 }}>
//                   Welcome to Our Breakout® Career Page!
//                 </h2>
//                 <p className="text-center">
//                   Are you ready to embark on an exciting adventure? Join our
//                   talented team and become a part of the thrilling world of
//                   escape rooms. We are thrilled to introduce you to the diverse
//                   range of career opportunities available at our renowned escape
//                   room company.
//                 </p>
//                 <h3
//                   className="mb-3 mt-4 yellow-text"
//                   style={{ fontWeight: 500, textAlign: "center" }}
//                 >
//                   Why Work with Us?
//                 </h3>
//               </div>

//               <div className="row justify-content-center mb-40">
//                 {reasons.map((reason, idx) => (
//                   <div key={idx} className="col-md-6 d-flex mb-5">
//                     <div className="d-flex align-items-start">
//                       {reason.icon}
//                       <div>
//                         <h5 className="mb-2" style={{ fontWeight: 600 }}>
//                           {reason.title}
//                         </h5>
//                         <p className="mb-0">{reason.desc}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="main-con para mb-40">
//                 <h3 className="mb-3 yellow-text" style={{ fontWeight: 500 }}>
//                   How to Apply:
//                 </h3>
//                 <p>
//                   To apply for any of the positions, please fill out the form
//                   below. We kindly ask you to provide the following information:
//                 </p>

//                 <p>
//                   Once you have filled out the form, click the submit button to
//                   send your application. Our hiring team will review your
//                   submission and get in touch with you if your qualifications
//                   match our requirements.
//                 </p>
//                 <p>
//                   Join our team and embark on an exhilarating journey of
//                   creativity, teamwork, and adventure. We can’t wait to welcome
//                   you to our escape room family!
//                 </p>
//               </div>

//               {/* Date, Author, and Time Section */}

//               {/* You can insert your Application Form component here */}

//               <CareerForm />
//             </div>
//           </div>
//         </div>
//         <Image src={tsIllus} alt="career" className="w-100 h-auto" />
//       </div>
//     </div>
//   );
// };

// export default page;


"use client";

import tsIllus from "@/images/ts-illus.svg";
import Image from "next/image";
import {
  FaRegSmile,
  FaUsers,
  FaGraduationCap,
  FaRocket,
  FaEnvelope,
  FaCalendar,
  FaClock,
} from "react-icons/fa";
import CareerForm from "@/components/CareerForm";
import { useGlobalContext } from "@/context/GlobalContext";

const reasons = [
  {
    icon: <FaRegSmile size={32} className="text-yellow me-3" />,
    title: "Immersive Experiences",
    desc: "Create unforgettable party and escape room experiences for our guests.",
  },
  {
    icon: <FaUsers size={32} className="text-yellow me-3" />,
    title: "Collaborative Environment",
    desc: "Work with a creative and energetic team.",
  },
  {
    icon: <FaGraduationCap size={32} className="text-yellow me-3" />,
    title: "Professional Development",
    desc: "Grow your skills with ongoing learning opportunities.",
  },
  {
    icon: <FaRocket size={32} className="text-yellow me-3" />,
    title: "Thriving Industry",
    desc: "Be part of the fast-growing entertainment industry.",
  },
];

export default function CareerClient() {
  const { getcareer } = useGlobalContext();

  return (
    <div className="carrer-page pt-80">
      <div className="black-gr-div">
        <div className="container">
          <h3 className="sec-head text-center yellow-text">{getcareer?.heading}</h3>
          <div className="para mt-4 sm" dangerouslySetInnerHTML={{
            __html: getcareer?.content
          }} />
          <CareerForm />
        </div>

        <Image src={tsIllus} alt="career" className="w-100 h-auto" />
      </div>
    </div>
  );
}