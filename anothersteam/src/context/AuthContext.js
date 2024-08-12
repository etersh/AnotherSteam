// // src/context/AuthContext.js
// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { useRouter } from 'next/router';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('userJWT');
//     if (token) {
//       // Ideally, you should verify the token with your backend to get user data
//       // For now, let's assume the token is valid and represents the user
//       setUser({ token }); // This would typically be user data
//     } else {
//       setUser(null);
//     }
//     setLoading(false);
//   }, []);

//   const login = (userData) => {
//     localStorage.setItem('userJWT', userData.token);
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem('userJWT');
//     setUser(null);
//     router.push('/user/login'); // Redirect to login page after logout
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
