import { Box, TextField, Typography, Button, Switch, FormControlLabel, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { createDestinations, getDestinationById, updateDestination } from "../../api/Destinations";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { darkTextField } from "../../constant";

export default function CreateDestination() {
    const { id } = useParams();

    const isEdit = !!id;

    const { data } = useSWR(id ? ["/destinations", id] : null, ([_, id]) => getDestinationById(id));

    const navigate = useNavigate();
    const [destination, setDestination] = useState({
        country_id: "",
        region: 1,
        name_en: "",
        name_fr: "",

        slug_en: "",
        slug_fr: "",

        short_description_en: "",
        short_description_fr: "",

        content_en: "",
        content_fr: "",

        best_time_to_visit_en: "",
        best_time_to_visit_fr: "",

        thumbnail_url: "",
        hero_image_url: "",

        latitude: "",
        longitude: "",

        is_featured: false,
        is_active: true,

        display_order: 0,
    });

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
            if (res?.status === 200) {
                navigate("/admin/destinations");
            }
        } else {
            const res = await createDestinations(destination);
            if (res?.status === 200) {
                navigate("/admin/destinations");
            }
        }
    };

    useEffect(() => {
        if (!data) return;

        setDestination({
            country_id: data?.country_id || "",

            region: data?.region || 1,

            name_en: data?.name_en || "",
            name_fr: data?.name_fr || "",

            slug_en: data?.slug_en || "",
            slug_fr: data?.slug_fr || "",

            short_description_en: data?.short_description_en || "",

            short_description_fr: data?.short_description_fr || "",

            content_en: data?.content_en || "",
            content_fr: data?.content_fr || "",

            best_time_to_visit_en: data?.best_time_to_visit_en || "",

            best_time_to_visit_fr: data?.best_time_to_visit_fr || "",

            thumbnail_url: data?.thumbnail_url || "",

            hero_image_url: data?.hero_image_url || "",

            latitude: data?.latitude || "",

            longitude: data?.longitude || "",

            is_featured: data?.is_featured || false,

            is_active: data?.is_active ?? true,

            display_order: data?.display_order || 0,
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
                            value={destination.name_en}
                            onChange={(e) => handleChange("name_en", e.target.value)}
                            sx={darkTextField}
                        />

                        <TextField
                            fullWidth
                            label="Name FR"
                            value={destination.name_fr}
                            onChange={(e) => handleChange("name_fr", e.target.value)}
                            sx={darkTextField}
                        />

                        <TextField
                            fullWidth
                            label="Slug EN"
                            value={destination.slug_en}
                            onChange={(e) => handleChange("slug_en", e.target.value)}
                            sx={darkTextField}
                        />

                        <TextField
                            fullWidth
                            label="Slug FR"
                            value={destination.slug_fr}
                            onChange={(e) => handleChange("slug_fr", e.target.value)}
                            sx={darkTextField}
                        />

                        <TextField
                            select
                            fullWidth
                            label="Region"
                            value={destination.region}
                            onChange={(e) => handleChange("region", e.target.value)}
                            sx={darkTextField}>
                            <MenuItem value={1}>Northern</MenuItem>
                            <MenuItem value={2}>Central</MenuItem>
                            <MenuItem value={3}>Southern</MenuItem>
                        </TextField>

                        <TextField
                            fullWidth
                            label="Display Order"
                            type="number"
                            value={destination.display_order}
                            onChange={(e) => handleChange("display_order", e.target.value)}
                            sx={darkTextField}
                        />

                        <div className="md:col-span-2">
                            <TextField
                                multiline
                                rows={4}
                                fullWidth
                                label="Short Description EN"
                                value={destination.short_description_en}
                                onChange={(e) => handleChange("short_description_en", e.target.value)}
                                sx={darkTextField}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextField
                                multiline
                                rows={4}
                                fullWidth
                                label="Short Description FR"
                                value={destination.short_description_fr}
                                onChange={(e) => handleChange("short_description_fr", e.target.value)}
                                sx={darkTextField}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextField
                                multiline
                                rows={8}
                                fullWidth
                                label="Content EN"
                                value={destination.content_en}
                                onChange={(e) => handleChange("content_en", e.target.value)}
                                sx={darkTextField}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextField
                                multiline
                                rows={8}
                                fullWidth
                                label="Content FR"
                                value={destination.content_fr}
                                onChange={(e) => handleChange("content_fr", e.target.value)}
                                sx={darkTextField}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextField
                                multiline
                                rows={3}
                                fullWidth
                                label="Best Time To Visit EN"
                                value={destination.best_time_to_visit_en}
                                onChange={(e) => handleChange("best_time_to_visit_en", e.target.value)}
                                sx={darkTextField}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextField
                                multiline
                                rows={3}
                                fullWidth
                                label="Best Time To Visit FR"
                                value={destination.best_time_to_visit_fr}
                                onChange={(e) => handleChange("best_time_to_visit_fr", e.target.value)}
                                sx={darkTextField}
                            />
                        </div>

                        <TextField
                            fullWidth
                            label="Thumbnail URL"
                            value={destination.thumbnail_url}
                            onChange={(e) => handleChange("thumbnail_url", e.target.value)}
                            sx={darkTextField}
                        />

                        <TextField
                            fullWidth
                            label="Hero Image URL"
                            value={destination.hero_image_url}
                            onChange={(e) => handleChange("hero_image_url", e.target.value)}
                            sx={darkTextField}
                        />

                        <TextField
                            fullWidth
                            type="number"
                            label="Latitude"
                            value={destination.latitude}
                            onChange={(e) => handleChange("latitude", e.target.value)}
                            sx={darkTextField}
                        />

                        <TextField
                            fullWidth
                            type="number"
                            label="Longitude"
                            value={destination.longitude}
                            onChange={(e) => handleChange("longitude", e.target.value)}
                            sx={darkTextField}
                        />
                    </div>

                    {(destination.thumbnail_url || destination.hero_image_url) && (
                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                            {destination.thumbnail_url && (
                                <div>
                                    <p className="text-sm text-gray-400 mb-2">Thumbnail Preview</p>

                                    <img
                                        src={destination.thumbnail_url}
                                        alt="thumbnail"
                                        className="
                                    w-full
                                    h-56
                                    object-cover
                                    rounded-2xl
                                    border
                                    border-white/10
                                "
                                    />
                                </div>
                            )}

                            {destination.hero_image_url && (
                                <div>
                                    <p className="text-sm text-gray-400 mb-2">Hero Preview</p>

                                    <img
                                        src={destination.hero_image_url}
                                        alt="hero"
                                        className="
                                    w-full
                                    h-56
                                    object-cover
                                    rounded-2xl
                                    border
                                    border-white/10
                                "
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-8 mt-8">
                        <FormControlLabel
                            sx={{
                                color: "#fff",
                            }}
                            control={
                                <Switch
                                    checked={destination.is_featured}
                                    onChange={(e) => handleChange("is_featured", e.target.checked)}
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
                                    checked={destination.is_active}
                                    onChange={(e) => handleChange("is_active", e.target.checked)}
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
