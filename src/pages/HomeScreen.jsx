import React from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../styles/colors';

export default function HomeScreen() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here (e.g., clear tokens, reset state)
    console.log('Logged out');
  };

  const navigateToModels = () => {
    navigate('/Models');
  };

  return (
    <div style={{ minHeight: `${window.innerHeight - 128}px`, overflow: 'hidden' }} className=" bg- flex flex-col items-center justify-center p-6 relative">
      <style>{`
          .running-border {
            border-top-left-radius: 230px;
            width: 906px;
            height: 756px;
            background: linear-gradient(to bottom right, #EDEDFE, transparent, transparent);
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            position: relative;
          }
          .running-border::before {
            content: "";
            border-top-left-radius: 230px;
            background-image: conic-gradient(
              white,
              white,
              white,
              #B69DFC
            );
            width: 150%;
            height: 150%;
            position: absolute;
            animation: rotate 3s linear infinite;
          }
          .running-border::after {
    content: "";
    width: 98.7%;
    height: 98.7%;
    background: linear-gradient(to bottom right, #EDEDFE, white, white); /* Updated gradient syntax */
    position: absolute;
    border-top-left-radius: 230px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: larger;
    letter-spacing: 5px;
}

          @keyframes rotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          .running-border2 {
            border-top-right-radius: 230px;
            width: 906px;
            height: 756px;
            background: linear-gradient(to bottom right, #EDEDFE, transparent, transparent);
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            position: relative;
          }
          .running-border2::before {
            content: "";
            border-top-right-radius: 230px;
            background-image: conic-gradient(
              #B69DFC,
              white,
              white,
              white
            );
            width: 150%;
            height: 150%;
            position: absolute;
            animation: rotate2 3s linear infinite;
          }
          .running-border2::after {
    content: "";
    width: 98.7%;
    height: 98.7%;
    background: linear-gradient(to bottom left, #EDEDFE, white, white); /* Updated gradient syntax */
    position: absolute;
    border-top-right-radius: 230px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: larger;
    letter-spacing: 5px;
}

          @keyframes rotate2 {
            0% {
              transform: rotate(360deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }
        `}</style>
      <div className='w-[60%] z-50 flex flex-col items-center justify-center text-center'>
        <div className='border-[1px] py-1 px-3 rounded-full bg-[#EDEDFE] mb-7 text-[#262556]'>
          Inspiration for Geoscience Researchers
        </div>
        <div style={{ fontSize: 64, lineHeight: '1', color: colors.titleTextColor }}>
          The Ultimate Hub for <br /> 3D Geoscience Models
        </div>
        <div className='self-center w-[70%] p-3 mx-auto text-[#262556]'>
          REEFS Lab is committed to sharing high-quality virtual 3D models of locations in India, contributed by users from around the world, with the geoscience community.
        </div>
      </div>
      <div className=' md:top-24 lg:top-52 flex gap-80 absolute'>
        <div className='running-border rotate-[70deg]' />
        <div className='running-border2 rotate-[-70deg]' />
        {/* <div className=' rounded-[190px] h-[596px] w-[696px] bg-gradient-to-br from-[#EDEDFE] via-transparent to-transparent rotate-[70deg] flex justify-center items-center overflow-hidden relative'></div>
        <div className='rounded-[190px] h-[596px] w-[696px] bg-gradient-to-bl from-[#EDEDFE] via-transparent to-transparent rotate-[-70deg]'></div> */}
      </div>
    </div>
  );
}




// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { colors } from '../styles/colors';

// export default function HomeScreen() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Add your logout logic here (e.g., clear tokens, reset state)
//     console.log('Logged out');
//   };

//   const navigateToModels = () => {
//     navigate('/Models');
//   };

//   return (
//     <div style={{ minHeight: `${window.innerHeight - 128}px`, overflow: 'hidden' }} className=" bg-[#F0F3FF] flex flex-col items-center justify-center p-6 relative">
//       <style>{`
//           .running-border {
//             border-radius: 195px;
//             width: 696px;
//             height: 696px;
//             background: linear-gradient(to bottom right, #E7ECFE, transparent, transparent);
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             overflow: hidden;
//             position: relative;
//           }
//           .running-border::before {
//             content: "";
//             border-radius: 190px;
//             background-image: conic-gradient(
//               #F0F3FF,
//               #F0F3FF,
//               #F0F3FF,
//               #B69DFC
//             );
//             width: 150%;
//             height: 150%;
//             position: absolute;
//             animation: rotate 3s linear infinite;
//           }
//           .running-border::after {
//     content: "";
//     width: 98.7%;
//     height: 98.7%;
//     background: linear-gradient(to bottom right, #dedef9, #F0F3FF, #F0F3FF); /* Updated gradient syntax */
//     position: absolute;
//     border-radius: 190px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     font-size: larger;
//     letter-spacing: 5px;
// }

//           @keyframes rotate {
//             0% {
//               transform: rotate(0deg);
//             }
//             100% {
//               transform: rotate(360deg);
//             }
//           }

//           .running-border2 {
//             border-radius: 195px;
//             width: 696px;
//             height: 696px;
//             background: linear-gradient(to bottom right, #dedef9, #F0F3FF, #F0F3FF);
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             overflow: hidden;
//             position: relative;
//           }
//           .running-border2::before {
//             content: "";
//             border-radius: 190px;
//             background-image: conic-gradient(
//               #B69DFC,
//               #F0F3FF,
//               #F0F3FF,
//               #F0F3FF
//             );
//             width: 150%;
//             height: 150%;
//             position: absolute;
//             animation: rotate2 3s linear infinite;
//           }
//           .running-border2::after {
//     content: "";
//     width: 98.7%;
//     height: 98.7%;
//     background: linear-gradient(to bottom left, #dedef9, #F0F3FF, #F0F3FF); /* Updated gradient syntax */
//     position: absolute;
//     border-radius: 190px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     font-size: larger;
//     letter-spacing: 5px;
// }

//           @keyframes rotate2 {
//             0% {
//               transform: rotate(360deg);
//             }
//             100% {
//               transform: rotate(0deg);
//             }
//           }
//         `}</style>
//       <div className='w-[60%] z-50 flex flex-col items-center justify-center text-center'>
//         <div className='border-[1px] py-1 px-3 rounded-full bg-[#EDEDFE] mb-7 text-[#262556]'>
//           Inspiration for Geoscience Researchers
//         </div>
//         <div style={{ fontSize: 64, lineHeight: '1', color: colors.titleTextColor }}>
//           The Ultimate Hub for <br /> 3D Geoscience Models
//         </div>
//         <div className='self-center w-[70%] p-3 mx-auto text-[#262556]'>
//           REEFS Lab is committed to sharing high-quality virtual 3D models of locations in India, contributed by users from around the world, with the geoscience community.
//         </div>
//       </div>
//       <div className='top-28 flex gap-72 absolute'>
//         <div className='running-border rotate-[70deg]' />
//         <div className='running-border2 rotate-[-70deg]' />
//         {/* <div className=' rounded-[190px] h-[596px] w-[696px] bg-gradient-to-br from-[#EDEDFE] via-transparent to-transparent rotate-[70deg] flex justify-center items-center overflow-hidden relative'></div>
//         <div className='rounded-[190px] h-[596px] w-[696px] bg-gradient-to-bl from-[#EDEDFE] via-transparent to-transparent rotate-[-70deg]'></div> */}
//       </div>
//     </div>
//   );
// }
