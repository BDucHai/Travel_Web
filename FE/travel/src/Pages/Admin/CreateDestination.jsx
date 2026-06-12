import { Box, Grid, TextField, Typography, Button, Switch, FormControlLabel, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { createDestinations, getDestinationById, updateDestination } from "../../api/Destinations";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";

export default function CreateDestination() {
    const { id } = useParams();

    const isEdit = !!id;

    const { data, isLoading } = useSWR(id ? ["/destinations", id] : null, ([_, id]) => getDestinationById(id));

    const navigate = useNavigate();
    const [destination, setDestination] = useState({
        country_id: "",
        region: {id: 1, value: "northen"},
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

            region: data?.region || "northen",

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
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                bgcolor: "#121212",
                minHeight: "100vh",
                color: "#fff",
                p: 4,
            }}>
            <Typography variant="h5" mb={3}>
                {isEdit ? "Edit Destination" : "Create Destination"}
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Name EN"
                        value={destination?.name_en}
                        onChange={(e) => handleChange("name_en", e.target.value)}
                        sx={{
                            "& .MuiInputBase-root": {
                            backgroundColor: "#fff",  
                            color: "#000",          
                            borderRadius: "8px",
                            },
                            "& .MuiInputLabel-root": {
                            color: "#ccc",            
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#444",     
                            },
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Name FR"
                        value={destination?.name_fr}
                        onChange={(e) => handleChange("name_fr", e.target.value)}
                         sx={{
                            "& .MuiInputBase-root": {
                            backgroundColor: "#fff",  
                            color: "#000",          
                            borderRadius: "8px",
                            },
                            "& .MuiInputLabel-root": {
                            color: "#ccc",            
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#444",     
                            },
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Slug EN"
                        value={destination?.slug_en}
                        onChange={(e) => handleChange("slug_en", e.target.value)}
                         sx={{
                            "& .MuiInputBase-root": {
                            backgroundColor: "#fff",  
                            color: "#000",          
                            borderRadius: "8px",
                            },
                            "& .MuiInputLabel-root": {
                            color: "#ccc",            
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#444",     
                            },
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Slug FR"
                        value={destination?.slug_fr}
                        onChange={(e) => handleChange("slug_fr", e.target.value)}
                         sx={{
                            "& .MuiInputBase-root": {
                            backgroundColor: "#fff",  
                            color: "#000",          
                            borderRadius: "8px",
                            },
                            "& .MuiInputLabel-root": {
                            color: "#ccc",            
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#444",     
                            },
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        select
                        fullWidth
                        label="Region"
                        value={destination?.region}
                        onChange={(e) => handleChange("region", e.target.value)}  
                        sx={{
                            "& .MuiInputBase-root": {
                            backgroundColor: "#fff",  
                            color: "#000",          
                            borderRadius: "8px",
                            },
                            "& .MuiInputLabel-root": {
                            color: "#ccc",            
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#444",     
                            },
                        }}>
                        <MenuItem value={id= 1, value= "northen"}>Northen</MenuItem>

                        <MenuItem value={id= 2, value= "central"}>Central</MenuItem>

                        <MenuItem vvalue={id= 3, value= "south"}>South</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        multiline
                        rows={4}
                        fullWidth
                        label="Short Description EN"
                        value={destination?.short_description_en}
                        onChange={(e) => handleChange("short_description_en", e.target.value)}
                         sx={{
                            "& .MuiInputBase-root": {
                            backgroundColor: "#fff",  
                            color: "#000",          
                            borderRadius: "8px",
                            },
                            "& .MuiInputLabel-root": {
                            color: "#ccc",            
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#444",     
                            },
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        multiline
                        rows={4}
                        fullWidth
                        label="Short Description FR"
                        value={destination?.short_description_fr}
                        onChange={(e) => handleChange("short_description_fr", e.target.value)}
                         sx={{
                            "& .MuiInputBase-root": {
                            backgroundColor: "#fff",  
                            color: "#000",          
                            borderRadius: "8px",
                            },
                            "& .MuiInputLabel-root": {
                            color: "#ccc",            
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#444",     
                            },
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        multiline
                        rows={8}
                        fullWidth
                        label="Content EN"
                        value={destination?.content_en}
                        onChange={(e) => handleChange("content_en", e.target.value)}
                         sx={{
                            "& .MuiInputBase-root": {
                            backgroundColor: "#fff",  
                            color: "#000",          
                            borderRadius: "8px",
                            },
                            "& .MuiInputLabel-root": {
                            color: "#ccc",            
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#444",     
                            },
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        multiline
                        rows={8}
                        fullWidth
                        label="Content FR"
                        value={destination?.content_fr}
                        onChange={(e) => handleChange("content_fr", e.target.value)}
                         sx={{
                            "& .MuiInputBase-root": {
                            backgroundColor: "#fff",  
                            color: "#000",          
                            borderRadius: "8px",
                            },
                            "& .MuiInputLabel-root": {
                            color: "#ccc",            
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#444",     
                            },
                        }}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Thumbnail URL"
                        value={destination?.thumbnail_url}
                        onChange={(e) => handleChange("thumbnail_url", e.target.value)}
                         sx={{
                            "& .MuiInputBase-root": {
                            backgroundColor: "#fff",  
                            color: "#000",          
                            borderRadius: "8px",
                            },
                            "& .MuiInputLabel-root": {
                            color: "#ccc",            
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#444",     
                            },
                        }}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Hero Image URL"
                        value={destination?.hero_image_url}
                        onChange={(e) => handleChange("hero_image_url", e.target.value)}
                         sx={{
                            "& .MuiInputBase-root": {
                            backgroundColor: "#fff",  
                            color: "#000",          
                            borderRadius: "8px",
                            },
                            "& .MuiInputLabel-root": {
                            color: "#ccc",            
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#444",     
                            },
                        }}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        type="number"
                        label="Latitude"
                        value={destination?.latitude}
                        onChange={(e) => handleChange("latitude", e.target.value)}
                         sx={{
                            "& .MuiInputBase-root": {
                            backgroundColor: "#fff",  
                            color: "#000",          
                            borderRadius: "8px",
                            },
                            "& .MuiInputLabel-root": {
                            color: "#ccc",            
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#444",     
                            },
                        }}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        type="number"
                        label="Longitude"
                        value={destination?.longitude}
                        onChange={(e) => handleChange("longitude", e.target.value)}
                         sx={{
                            "& .MuiInputBase-root": {
                            backgroundColor: "#fff",  
                            color: "#000",          
                            borderRadius: "8px",
                            },
                            "& .MuiInputLabel-root": {
                            color: "#ccc",            
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#444",     
                            },
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={destination?.is_featured}
                                onChange={(e) => handleChange("is_featured", e.target.checked)}
                            />
                        }
                        label="Featured"
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={destination?.is_active}
                                onChange={(e) => handleChange("is_active", e.target.checked)}
                            />
                        }
                        label="Active"
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button type="submit" variant="contained" size="large">
                        {isEdit ? "Update Destination" : "Create Destination"}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
