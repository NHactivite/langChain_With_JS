
// "use client";

// import { useEffect } from "react";

// export default function ClientWrapper({ children }) {
//   useEffect(() => {
//     if ("serviceWorker" in navigator) {
//       navigator.serviceWorker.getRegistrations().then((registrations) => {
//         registrations.forEach((reg) => reg.unregister());
//       });
//     }
//   }, []);

//   return <>{children}</>;
// }
