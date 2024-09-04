// import React, { useContext } from "react";
// import { styled } from "@mui/material/styles";
// import Dialog from "@mui/material/Dialog";
// import ContextApi from "../context/ContextApi";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     "& .MuiDialogContent-root": {
//         padding: theme.spacing(2),
//     },
//     "& .MuiDialogActions-root": {
//         padding: theme.spacing(1),
//     },
// }));

// export default function Digloue() {
//     const { digloue, setdigloue } = useContext(ContextApi);

//     return (
//         <>
//             <BootstrapDialog
//                 onClose={diglogue}
//                 aria-labelledby="customized-dialog-title"
//                 open={digloue}
//             >
//                 <div className="flex flex-col rounded-md w-[500px] bg-white">
//                     <span className="p-5 text-red-500 hover:bg-gray-200 font-semibold cursor-pointer">
//                         Unfollow
//                     </span>

//                     <span className="p-5  hover:bg-gray-200 font-semibold cursor-pointer">
//                         Add to favorites
//                     </span>
//                 </div>
//             </BootstrapDialog>
//         </>
//     );
// }
