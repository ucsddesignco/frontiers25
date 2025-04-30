// 'use client'
// import { useEffect } from "react";
// import {getAllCards}  from "../api/cardFunctions";

// import React from 'react'
// import Card from "../components/Card";

// export default function page() {
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 type Card = {
//                     user: number;
//                     author: string;
//                     font: number;
//                     shape: number;
//                     p_color: string;
//                     a_color: string;
//                     last_updated: Date;
//                 }
//                 const response = await getAllCards();
//                 console.log(response);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         fetchData();
//     }, []);
//   return (
//     <div>page
//         <button></button>
//     </div>

//   )
// }
