import { useEffect, useState } from "react";
import {
    Dialog,
    TextField,
    Backdrop,
    CircularProgress,
    Select,
    MenuItem,
    InputAdornment,
    OutlinedInput,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";

import PermIdentity from "@mui/icons-material/PermIdentity";
import PublicIcon from "@mui/icons-material/Public";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import InfoIcon from "@mui/icons-material/Info";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import GroupIcon from "@mui/icons-material/Group";
import LuggageIcon from "@mui/icons-material/Luggage";
import BlurLinearIcon from "@mui/icons-material/BlurLinear";

import { FormControl } from "@mui/material";
import { useMemo } from "react";
import countryList from "react-select-country-list";
import * as Flags from "country-flag-icons/react/3x2";
import { createContacts } from "../api/Contact";
import { IoMdSearch } from "react-icons/io";
import { toast } from "react-toastify";

const ContactModalFrm = ({ t, open, onClose, content = "" }) => {
    const [loading, setLoading] = useState(false);
    const countries = useMemo(() => countryList().getData(), []);
    const [contactPlan, setContactPlan] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        message: content || "",
        nationality: "",
        contactMethod: "",
        hearFrom: "",
        title: "",
    });

    const handleCreateRequest = async () => {
        if (!contactPlan?.fullName || !contactPlan?.nationality || !contactPlan?.email || !contactPlan?.contactMethod) {
            toast.error(t("notify.create_fail"));
            return;
        }
        setLoading(true);
        const res = await createContacts({
            fullName: contactPlan?.title + " " + contactPlan?.fullName,
            email: contactPlan?.email,
            phoneNumber: contactPlan?.phoneNumber,
            message: contactPlan?.message,
            nationality: contactPlan?.nationality,
            contactMethod: contactPlan?.contactMethod,
            hearFrom: contactPlan?.hearFrom,
        });
        if (res) {
            onClose();
        }
        setLoading(false);
    };

    useEffect(() => {
        setContactPlan({
            fullName: "",
            email: "",
            phoneNumber: "",
            message: content || "",
            nationality: "",
            contactMethod: "",
            hearFrom: "",
            title: "",
        });
    }, [content]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: "90vw",
                    height: "90vh",
                    maxWidth: "none",
                    maxHeight: "none",
                },
            }}>
            <div className="relative text-[1rem] w-full h-full px-[1rem] lg:px-[3rem] py-[1.5rem] overflow-scroll bg-[#fdfbf8]">
                {/* header */}
                <div className="text-center font-gelasio uppercase tracking-wider text-[#b77c31]">
                    {t("plan_journey")}
                </div>
                <hr className="mt-[0.25rem] w-[4rem] border-2 text-[#efb771] ml-[47%]" />
                <div className="text-center text-[1.5rem] lg:text-[2rem] font-bold uppercase">
                    {t("send_us_enquiry")}
                </div>
                <div className="text-center text-[#514d4d] font-gelasio text-[0.85rem]">{t("plan_contact_desc")}</div>
                {/* Fill */}
                <label className="font-medium">{t("plan_journey")}</label>
                <TextField
                    // label={t("your_request")}
                    multiline
                    rows={5}
                    value={contactPlan?.message}
                    fullWidth
                    placeholder={t("contact_mess_placeholder")}
                    variant="outlined"
                    sx={{
                        marginTop: "8px",
                        "& .MuiInputBase-input": {
                            backgroundColor: "#fff",
                        },
                    }}
                    onChange={(e) => setContactPlan((prev) => ({ ...prev, message: e.target.value }))}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem] mt-[1rem]">
                    <div>
                        <label className="font-medium">
                            {t("your_name")} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-[8px]">
                            <TextField
                                // label={t("your_name")}
                                fullWidth
                                value={contactPlan?.fullName}
                                sx={{
                                    "& .MuiInputBase-input": {
                                        paddingRight: "18%",
                                        backgroundColor: "#fff",
                                    },
                                }}
                                placeholder={t("contact_name_placeholder")}
                                variant="outlined"
                                required
                                onChange={(e) => setContactPlan((prev) => ({ ...prev, fullName: e.target.value }))}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PermIdentity color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <FormControl sx={{ position: "absolute", top: 0, right: 0, tabIndex: 10, width: "15%" }}>
                                <Select
                                    sx={{
                                        backgroundColor: "white",
                                    }}
                                    displayEmpty
                                    labelId="title"
                                    id="title-select"
                                    renderValue={(selected) => {
                                        if (!selected) {
                                            return <span className="text-gray-400">{t("title")}</span>;
                                        }

                                        return selected;
                                    }}
                                    value={contactPlan?.title}
                                    label={t("title")}
                                    onChange={(e) => setContactPlan((prev) => ({ ...prev, title: e.target.value }))}>
                                    <MenuItem value={""}></MenuItem>
                                    <MenuItem value={"Mr."}>Mr.</MenuItem>
                                    <MenuItem value={"Mrs."}>Mrs.</MenuItem>
                                    <MenuItem value={"Ms."}>Ms.</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div>
                        <label className="font-medium">
                            {t("nationality")} <span className="text-red-500">*</span>
                        </label>
                        <FormControl fullWidth sx={{ marginTop: "8px" }}>
                            <Select
                                labelId="nationality-label"
                                value={contactPlan?.nationality || ""}
                                label="Nationality"
                                displayEmpty
                                input={
                                    <OutlinedInput
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <PublicIcon color="action" />
                                            </InputAdornment>
                                        }
                                    />
                                }
                                renderValue={(selected) => {
                                    if (!selected) {
                                        return <span className="text-gray-400">{t("nationality")}</span>;
                                    }

                                    return selected;
                                }}
                                sx={{
                                    backgroundColor: "white",
                                }}
                                required
                                onChange={(e) =>
                                    setContactPlan((prev) => ({
                                        ...prev,
                                        nationality: e.target.value,
                                    }))
                                }>
                                {countries?.map((country) => {
                                    const CountryFlag = Flags[country?.value];

                                    return (
                                        <MenuItem key={country?.value} value={country?.label}>
                                            <div className="flex items-center gap-2">
                                                {CountryFlag && (
                                                    <CountryFlag
                                                        style={{
                                                            width: "24px",
                                                            height: "16px",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                )}

                                                <span>{country?.label}</span>
                                            </div>
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </div>

                    {/* email and phoneNumber */}
                    <div>
                        <label className="font-medium">
                            {t("email")} <span className="text-red-500">*</span>
                        </label>
                        <TextField
                            // label={t("your_name")}
                            fullWidth
                            value={contactPlan?.email}
                            sx={{
                                marginTop: "8px",
                                "& .MuiInputBase-input": {
                                    paddingRight: "18%",
                                    backgroundColor: "#fff",
                                },
                            }}
                            placeholder={t("mailExample")}
                            variant="outlined"
                            required
                            onChange={(e) => setContactPlan((prev) => ({ ...prev, email: e.target.value }))}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <div>
                        <label className="font-medium">{t("phone_number_title")}</label>
                        <TextField
                            // label={t("your_name")}
                            fullWidth
                            value={contactPlan?.phoneNumber}
                            sx={{
                                marginTop: "8px",
                                "& .MuiInputBase-input": {
                                    paddingRight: "18%",
                                    backgroundColor: "#fff",
                                },
                            }}
                            placeholder={t("phone_number_example")}
                            variant="outlined"
                            onChange={(e) => setContactPlan((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    {/* End mail and phone */}
                </div>

                {/* Small Notify */}
                <div className="flex items-center bg-[#f9f3ed] border-[1px] rounded-[0.6rem] border-[#f4dcc4] mt-[1rem] px-[1rem] py-[0.5rem]">
                    <InfoIcon sx={{ color: "#c49c62" }} />
                    <div className="ml-[1rem] whitespace-pre-line">{t("contact_info")}</div>
                </div>
                {/* End Small Notify */}

                {/* Contact method */}
                <div className="block lg:flex mt-[1.5rem]">
                    <div className="w-full lg:pr-[5%] lg:border-r-[2px] lg:border-[#ccc]">
                        {/* Question */}
                        <Typography className="!mb-2 !text-[14px] !font-medium !text-gray-800">
                            {t("contact_method")} <span className="text-red-500">*</span>
                        </Typography>

                        <RadioGroup
                            value={contactPlan.contactMethod}
                            onChange={(e) => setContactPlan((prev) => ({ ...prev, contactMethod: e.target.value }))}
                            className="!gap-0">
                            {/* WhatsApp */}
                            <div className="flex items-center h-[34px]">
                                <WhatsAppIcon className="mr-2 text-[18px] text-[#25D366]" />

                                <FormControlLabel
                                    value="whatsapp"
                                    control={
                                        <Radio
                                            size="small"
                                            sx={{
                                                padding: "4px",
                                                color: "#bdbdbd",
                                                "&.Mui-checked": {
                                                    color: "#25D366",
                                                },
                                            }}
                                        />
                                    }
                                    label={<span className="text-[13px] text-gray-700">Yes, by WhatsApp</span>}
                                    className="!m-0"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex items-center h-[34px]">
                                <EmailIcon className="!mr-2 !text-[18px]" sx={{ color: "#a9a9a9" }} />

                                <FormControlLabel
                                    value="email"
                                    control={
                                        <Radio
                                            size="small"
                                            sx={{
                                                padding: "4px",
                                                color: "#bdbdbd",
                                                "&.Mui-checked": {
                                                    color: "#4caf50",
                                                },
                                            }}
                                        />
                                    }
                                    label={<span className="text-[13px] text-gray-700">No, email is sufficient</span>}
                                    className="!m-0"
                                />
                            </div>
                        </RadioGroup>

                        <div className="mt-3 flex items-start gap-3 rounded-[4px] bg-[#f2f7ef] px-3 py-3">
                            <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-white">
                                <WhatsAppIcon className="text-[19px] text-[#25D366]" />
                            </div>

                            <p className="m-0 text-[11px] leading-[1.45] text-gray-600">{t("what_apps_choose")}</p>
                        </div>
                    </div>

                    <div className="w-full lg:pl-[5%]">
                        <Typography className="!mb-2 !text-[14px] !font-medium !text-gray-800">
                            {t("hear_about")}
                        </Typography>
                        <FormControl fullWidth>
                            <Select
                                sx={{
                                    backgroundColor: "white",
                                }}
                                displayEmpty
                                labelId="hear"
                                id="hear-select"
                                renderValue={(selected) => {
                                    if (!selected) {
                                        return <span className="text-gray-400">{t("select_options")}</span>;
                                    }

                                    return selected;
                                }}
                                value={contactPlan?.hearFrom}
                                label={t("title")}
                                onChange={(e) => setContactPlan((prev) => ({ ...prev, hearFrom: e.target.value }))}>
                                <MenuItem value={""}>{t("none")}</MenuItem>
                                <MenuItem value={"Google / Search engine"}>
                                    <IoMdSearch sx={{ marginRight: "0.25rem" }} /> {t("hear_from.google")}
                                </MenuItem>
                                <MenuItem value={"Travel website / Blog"}>
                                    <LuggageIcon sx={{ marginRight: "0.25rem" }} /> {t("hear_from.web")}
                                </MenuItem>
                                <MenuItem value={"Facebook / Instagram"}>
                                    <ThumbUpOffAltIcon sx={{ marginRight: "0.25rem" }} />
                                    {t("hear_from.facebook")}
                                </MenuItem>
                                <MenuItem value={"Previous trip with us"}>
                                    <FlightTakeoffIcon sx={{ marginRight: "0.25rem" }} />
                                    {t("hear_from.pre_trip")}
                                </MenuItem>
                                <MenuItem value={"Recommendation from a friend"}>
                                    <GroupIcon sx={{ marginRight: "0.25rem" }} />
                                    {t("hear_from.friend")}
                                </MenuItem>
                                <MenuItem value={"Travel agency / Travel professional"}>
                                    <CardTravelIcon sx={{ marginRight: "0.25rem" }} />
                                    {t("hear_from.travel_agency")}
                                </MenuItem>
                                <MenuItem value={"Other"}>
                                    <BlurLinearIcon sx={{ marginRight: "0.25rem" }} />
                                    {t("hear_from.other")}
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                {/*End Contact method */}

                {/* Btn submit */}
                <div className="flex flex-col items-center mt-[2rem]">
                    {/* Button */}
                    <div
                        className="w-[210px] py-[1rem] text-center rounded-[4px] bg-[#064b35] text-white text-[11px] font-semibold tracking-[1.5px] uppercase transition-all duration-200 hover:bg-[#053d2c] hover:shadow-md cursor-pointer"
                        onClick={handleCreateRequest}>
                        {t("send_require")}
                    </div>

                    {/* Security text */}
                    <div className="flex items-center gap-[3px] mt-[5px] text-[9px] text-gray-500">
                        <LockOutlinedIcon
                            sx={{
                                fontSize: "10px",
                            }}
                        />
                        <span>{t("not_share_info")}</span>
                    </div>
                </div>
            </div>

            <Backdrop
                open={loading}
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 9999,
                    backgroundColor: "rgba(0,0,0,0.35)",
                }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Dialog>
    );
};

export default ContactModalFrm;
