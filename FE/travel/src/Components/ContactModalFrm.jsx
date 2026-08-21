// import { useState } from "react";
// import {
//     Dialog,
//     TextField,
//     Backdrop,
//     CircularProgress,
//     Select,
//     MenuItem,
// } from "@mui/material";
// // import PermIdentity from '@mui/icons-material/PermIdentity';

// import { useCountryField, VisitorAPIComponents } from "react-country-state-fields";
// import { FormControl, InputLabel } from "@mui/material";

const ContactModalFrm = ({ t, open, onClose, content = "" }) => {
//     const [loading, setLoading] = useState(false);
//   const { countries } = useCountryField();
//     const [contactPlan, setContactPlan] = useState({
//         fullName: "",
//         email: "",
//         phoneNumber: "",
//         message: content || "",
//         nationality: "",
//         contactMethod: "",
//         hearFrom: "",
//         title: ""
//     });

    return (
        <></>
        // <Dialog open={open} onClose={onClose} sx={{ width: "80%", height: "70%" }}>
        //     <div className="relative text-[1rem] w-full h-full px-[1rem] lg:px-[3rem] py-[1.5rem] overflow-scroll">
        //         {/* header */}
        //         <div className="text-center font-gelasio uppercase">
        //             {t("plan_journey")}
        //         </div>
        //         <div className="text-center text-[1.5rem] lg:text-[2rem] uppercase">
        //             {t("send_us_enquiry")}
        //         </div>
        //         <div className="text-center text-[#ccc] font-gelasio uppercase">
        //             {t("plan_journey")}
        //         </div>
        //         <hr className="mt-[0.5rem] w-[4rem] border-2 text-[#efb771] ml-[47%]" />
        //         {/* Fill */}
        //         <label>{t("plan_journey")}</label>
        //         <TextField
        //             // label={t("your_request")}
        //             multiline
        //             rows={5}
        //             value={contactPlan?.message}
        //             fullWidth
        //             placeholder={t("contact_mess_placeholder")}
        //             variant="outlined"
        //             margin="normal"
        //             onChange={(e) => setContactPlan((prev) => ({ ...prev, message: e.target.value }))}
        //         />

        //         <div className="grid grid-cols-1 md:grid-cols-2">
        //             <div>
        //                 <label>{t("your_name")} <span className="text-red-500">*</span></label>
        //                 <TextField
        //                     // label={t("your_name")}
        //                     fullWidth
        //                     sx={{ paddingLeft: "1.5rem", paddingY: "0.25rem", paddingRight: "4rem" }}
        //                     value={contactPlan?.name}
        //                     placeholder={t("contact_name_placeholder")}
        //                     variant="outlined"
        //                     margin="normal"
        //                     onChange={(e) => setContactPlan((prev) => ({ ...prev, name: e.target.value }))}
        //                 // InputProps={{
        //                 //     startAdornment: (
        //                 //         <InputAdornment position="start">
        //                 //             <PermIdentity color="action" />
        //                 //         </InputAdornment>
        //                 //     )
        //                 // }}
        //                 />
        //                 <FormControl fullWidth>
        //                     <InputLabel id="title">{t("title")}</InputLabel>
        //                     <Select
        //                         labelId="title"
        //                         id="title-select"
        //                         value={contactPlan?.title}
        //                         label={t("title")}
        //                         onChange={(e) => setContactPlan((prev) => ({ ...prev, title: e.target.value }))}
        //                     >
        //                         <MenuItem value={""}>{t("title")}</MenuItem>
        //                         <MenuItem value={"Mr."}>Mr.</MenuItem>
        //                         <MenuItem value={"Mrs."}>Mrs.</MenuItem>
        //                         <MenuItem value={"Ms."}>Ms.</MenuItem>
        //                     </Select>
        //                 </FormControl>

        //             </div>

        //             <div>
        //                 <VisitorAPIComponents>
        //                     <FormControl fullWidth>
        //                         <InputLabel id="national">Nationality</InputLabel>
        //                         <Select
        //                             labelId="national"
        //                             value={contactPlan?.nationality || ""}
        //                             onChange={(e) =>
        //                                 setContactPlan((prev) => ({ ...prev, nationality: e.target.value }))
        //                             }
        //                         >
        //                             {countries.map((c) => (
        //                                 <MenuItem key={c.isoCode} value={c.name}>
        //                                     {c.name}
        //                                 </MenuItem>
        //                             ))}
        //                         </Select>
        //                     </FormControl>
        //                 </VisitorAPIComponents>


        //             </div>
        //         </div>
        //     </div>
        //     <Backdrop
        //         open={loading}
        //         sx={{
        //             color: "#fff",
        //             zIndex: (theme) => theme.zIndex.drawer + 9999,
        //             backgroundColor: "rgba(0,0,0,0.35)",
        //         }}>
        //         <CircularProgress color="inherit" />
        //     </Backdrop>
        // </Dialog>
    )
}

export default ContactModalFrm;