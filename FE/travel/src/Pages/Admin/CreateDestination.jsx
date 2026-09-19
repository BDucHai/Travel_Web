import { Box, TextField, Typography, Button, Switch, FormControlLabel, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { createDestinations, getDestinationById, updateDestination } from "../../api/Destinations";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { darkTextField } from "../../constant";
import { uploadImage } from "../../utils/uploadImage";
import LexicalEditor from "../../Components/AdminComponent/LexicalEditor";

export default function CreateDestination() {
    const { id } = useParams();

    const isEdit = !!id;

    const { data } = useSWR(id ? [`/admin/destinations/${id}?lang=en`, id] : null, ([_, id]) => getDestinationById(id));

    const navigate = useNavigate();
    const [destination, setDestination] = useState({
        countryId: "",
        region: 1,
        nameEn: "",
        nameFr: "",

        slugEn: "",
        slugFr: "",

        shortDescriptionEn: "",
        shortDescriptionFr: "",

        contentEn: "",
        contentFr: "",

        bestTimeToVisitEn: "",
        bestTimeToVisitFr: "",

        thumbnailUrl: "",
        heroImageUrl: "",

        latitude: "",
        longitude: "",

        isFeatured: false,
        isActive: true,

        displayOrder: 0,
    });

    const handleFeaturedImage = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const res = await uploadImage(file, "travel-website/destination");

            setDestination((prev) => ({
                ...prev,
                heroImageUrl: res.url,
            }));
        } catch (err) {
            console.error("Upload hero image failed:", err);
        }
    };

    const handleChange = (field, value) => {
        setDestination((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEdit) {
            const res = await updateDestination(id, destination);
            if (res) {
                navigate("/admin/destinations");
            }
        } else {
            const res = await createDestinations(destination);
            if (res) {
                navigate("/admin/destinations");
            }
        }
    };

    useEffect(() => {
        if (!data) return;

        setDestination({
            countryId: data?.country?.id || "",

            region: data?.region || 1,

            nameEn: data?.nameEn || "",
            nameFr: data?.nameFr || "",

            slugEn: data?.slugEn || "",
            slugFr: data?.slugFr || "",

            shortDescriptionEn: data?.shortDescriptionEn || "",

            shortDescriptionFr: data?.shortDescriptionFr || "",

            contentEn: data?.contentEn || "",
            contentFr: data?.contentFr || "",

            bestTimeToVisitEn: data?.bestTimeToVisitEn || "",

            bestTimeToVisitFr: data?.bestTimeToVisitFr || "",

            thumbnailUrl: data?.thumbnailUrl || "",

            heroImageUrl: data?.heroImageUrl || "",

            latitude: data?.latitude || "",

            longitude: data?.longitude || "",

            isFeatured: data?.isFeatured || false,

            isActive: data?.isActive ?? true,
            displayOrder: data?.displayOrder || 0,
        });
    }, [data]);

    return (
        <Box component="form" onSubmit={handleSubmit} className="min-h-screen bg-[#081416] text-white p-6">
            <div className="max-w-7xl mx-auto">
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        mb: 3,
                    }}>
                    {isEdit ? "Edit Destination" : "Create Destination"}
                </Typography>

                <div
                    className="
                rounded-3xl
                border border-white/10
                bg-white/[0.03]
                backdrop-blur-sm
                p-8
                shadow-2xl
            ">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <TextField
                            fullWidth
                            label="Name EN"
                            value={destination?.nameEn}
                            onChange={(e) => handleChange("nameEn", e.target.value)}
                            sx={darkTextField}
                        />

                        <TextField
                            fullWidth
                            label="Name FR"
                            value={destination?.nameFr}
                            onChange={(e) => handleChange("nameFr", e.target.value)}
                            sx={darkTextField}
                        />

                        <TextField
                            fullWidth
                            label="Slug EN"
                            value={destination?.slugEn}
                            onChange={(e) => handleChange("slugEn", e.target.value)}
                            sx={darkTextField}
                        />

                        <TextField
                            fullWidth
                            label="Slug FR"
                            value={destination?.slugFr}
                            onChange={(e) => handleChange("slugFr", e.target.value)}
                            sx={darkTextField}
                        />

                        <TextField
                            select
                            fullWidth
                            label="Region"
                            value={destination?.region}
                            onChange={(e) => handleChange("region", e.target.value)}
                            sx={darkTextField}>
                            <MenuItem value={"NORTH"}>Northern</MenuItem>
                            <MenuItem value={"CENTRAL"}>Central</MenuItem>
                            <MenuItem value={"SOUTH"}>Southern</MenuItem>
                        </TextField>

                        <TextField
                            select
                            fullWidth
                            label="Country"
                            value={destination?.countryId}
                            onChange={(e) => handleChange("countryId", e.target.value)}
                            sx={darkTextField}>
                            <MenuItem value={"1"}>Viet Nam</MenuItem>
                            <MenuItem value={"2"}>Cambo</MenuItem>
                        </TextField>

                        <TextField
                            fullWidth
                            label="Display Order"
                            type="number"
                            value={destination?.displayOrder}
                            onChange={(e) => handleChange("displayOrder", e.target.value)}
                            sx={darkTextField}
                        />

                        <div className="md:col-span-2">
                            <TextField
                                multiline
                                rows={3}
                                fullWidth
                                label="Short Description EN"
                                value={destination?.shortDescriptionEn}
                                onChange={(e) => handleChange("shortDescriptionEn", e.target.value)}
                                sx={darkTextField}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextField
                                multiline
                                rows={3}
                                fullWidth
                                label="Short Description FR"
                                value={destination?.shortDescriptionFr}
                                onChange={(e) => handleChange("shortDescriptionFr", e.target.value)}
                                sx={darkTextField}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <LexicalEditor
                                content={destination?.contentEn}
                                setContent={(html) =>
                                    setDestination((prev) => ({
                                        ...prev,
                                        contentEn: html,
                                    }))
                                }
                            />

                        </div>

                        <div className="md:col-span-2">
                            <LexicalEditor
                                content={destination?.contentFr}
                                setContent={(html) =>
                                    setDestination((prev) => ({
                                        ...prev,
                                        contentFr: html,
                                    }))
                                }
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextField
                                multiline
                                rows={3}
                                fullWidth
                                label="Title En"
                                value={destination?.bestTimeToVisitEn}
                                onChange={(e) => handleChange("bestTimeToVisitEn", e.target.value)}
                                sx={darkTextField}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextField
                                multiline
                                rows={3}
                                fullWidth
                                label="Title FR"
                                value={destination?.bestTimeToVisitFr}
                                onChange={(e) => handleChange("bestTimeToVisitFr", e.target.value)}
                                sx={darkTextField}
                            />
                        </div>


                        {/* Image  Hero*/}
                        <div className="col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 mt-[3rem]">
                            <h2 className="text-xl font-semibold mb-4">Featured Image</h2>
                            <input type="file" accept="image/*" onChange={handleFeaturedImage} className="cursor-pointer" />
                            {destination?.heroImageUrl && (
                                <img
                                    src={
                                        typeof destination?.heroImageUrl === "string"
                                            ? destination?.heroImageUrl
                                            : URL.createObjectURL(destination?.heroImageUrl)
                                    }
                                    alt=""
                                    className="mt-4 h-[300px] w-full object-cover rounded-2xl"
                                />
                            )}
                        </div>
                        <TextField
                            fullWidth
                            type="number"
                            label="Latitude"
                            value={destination?.latitude}
                            onChange={(e) => handleChange("latitude", e.target.value)}
                            sx={darkTextField}
                        />

                        <TextField
                            fullWidth
                            type="number"
                            label="Longitude"
                            value={destination?.longitude}
                            onChange={(e) => handleChange("longitude", e.target.value)}
                            sx={darkTextField}
                        />
                    </div>



                    <div className="flex flex-wrap gap-8 mt-8">
                        <FormControlLabel
                            sx={{
                                color: "#fff",
                            }}
                            control={
                                <Switch
                                    checked={destination?.isFeatured}
                                    onChange={(e) => handleChange("isFeatured", e.target.checked)}
                                    sx={{
                                        "& .MuiSwitch-switchBase.Mui-checked": {
                                            color: "#c39562",
                                        },

                                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                            backgroundColor: "#c39562",
                                        },
                                    }}
                                />
                            }
                            label="Featured Destination"
                        />

                        <FormControlLabel
                            sx={{
                                color: "#fff",
                            }}
                            control={
                                <Switch
                                    checked={destination?.isActive}
                                    onChange={(e) => handleChange("isActive", e.target.checked)}
                                    sx={{
                                        "& .MuiSwitch-switchBase.Mui-checked": {
                                            color: "#c39562",
                                        },

                                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                            backgroundColor: "#c39562",
                                        },
                                    }}
                                />
                            }
                            label="Active"
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-10">
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/admin/destinations")}
                            sx={{
                                borderColor: "rgba(255,255,255,0.2)",
                                color: "#fff",
                                px: 4,
                                py: 1.5,
                                borderRadius: "14px",

                                "&:hover": {
                                    borderColor: "#c39562",
                                },
                            }}>
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: "#c39562",
                                px: 4,
                                py: 1.5,
                                borderRadius: "14px",
                                textTransform: "none",
                                fontSize: "15px",
                                fontWeight: 700,

                                "&:hover": {
                                    backgroundColor: "#b28653",
                                },
                            }}>
                            {isEdit ? "Update Destination" : "Create Destination"}
                        </Button>
                    </div>
                </div>
            </div>
        </Box>
    );
}
