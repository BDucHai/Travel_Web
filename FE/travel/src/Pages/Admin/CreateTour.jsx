import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { createTours, getToursAdminById, updateTours } from "../../api/Tour";

import { TextField, Button, Switch, FormControlLabel, Autocomplete, Backdrop, CircularProgress } from "@mui/material";
import { getDestinations } from "../../api/Destinations";
import { getStyles } from "../../api/Style";
import { getTourCollections } from "../../api/TourCollection";
import { darkTextField, durationsDays } from "../../constant";
import { uploadImage } from "../../utils/uploadImage";

const CreateTour = () => {
    const { id } = useParams();
    const safeId = id;
    const navigate = useNavigate();
    const { data: tourDetail, isLoading } = useSWR(
        id ? ["/tours", id] : null,
        ([_, safeId]) => getToursAdminById(safeId),
        {
            revalidateOnMount: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false,
        },
    );
    const [loading, setLoading] = useState(false);

    const { data: styles = [] } = useSWR(["/tour-styles", { lang: "en" }], ([_, params]) => getStyles(params));

    const { data: collections = [] } = useSWR(["/tour-collections", { lang: "en" }], ([_, params]) =>
        getTourCollections(params),
    );

    const { data: destinations = [] } = useSWR(["/destinations", { lang: "en" }], ([_, params]) =>
        getDestinations(params),
    );

    const [tour, setTour] = useState({
        duration_days: "",

        price_from: "",

        group_size: "",

        title_en: "",
        title_fr: "",

        slug_en: "",
        slug_fr: "",

        short_description_en: "",
        short_description_fr: "",

        overview_en: "",
        overview_fr: "",

        inclusion_en: "",
        inclusion_fr: "",

        exclusion_en: "",
        exclusion_fr: "",

        is_featured: false,

        is_active: true,

        featuredImage: null,

        styles: [],

        collections: [],

        destinations: [],
    });

    const [destinationDays, setDestinationDays] = useState([
        {
            dayNumber: 1,
            titleEn: "",
            titleFr: "",
            descriptionEn: "",
            descriptionFr: "",
            imageUrl: null,
            displayOrder: null,
            imageIndex: null,
        },
    ]);

    const addDay = () => {
        setDestinationDays((prev) => [
            ...prev,
            {
                dayNumber: prev.length + 1,
                titleEn: "",
                titleFr: "",
                descriptionEn: "",
                descriptionFr: "",
                imageUrl: null,
                preview: null,
                displayOrder: prev.length + 1,
                imageIndex: null,
            },
        ]);
    };

    const removeDay = (index) => {
        setDestinationDays((prev) =>
            prev
                .filter((_, i) => i !== index)
                .map((item, idx) => ({
                    ...item,
                    dayNumber: idx + 1,
                    displayOrder: idx + 1,
                })),
        );
    };

    const handleFeaturedImage = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const res = await uploadImage(file);

            setTour((prev) => ({
                ...prev,
                featuredImage: res.url, // chỉ lưu URL
            }));
        } catch (err) {
            console.error("Upload featured image failed:", err);
        }
    };

    const handleGalleryImages = async (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        try {
            const uploadedImages = await Promise.all(files.map((file) => uploadImage(file)));

            const urls = uploadedImages.map((img) => img.url);

            setTour((prev) => ({
                ...prev,
                galleryImages: [...(Array.isArray(prev?.galleryImages) ? prev.galleryImages : []), ...urls],
            }));
        } catch (err) {
            console.error("Upload gallery images failed:", err);
        }
    };

    const handleUpdate = async () => {
        setLoading(true);

        try {
            let itineraryImageIndex = 0;

            const itineraryDaysPayload = destinationDays.map((day, index) => {
                const hasNewFile = day?.imageUrl instanceof File;

                return {
                    // id: day?.id,
                    dayNumber: day?.dayNumber || index + 1,
                    titleEn: day?.titleEn || "",
                    titleFr: day?.titleFr || "",
                    descriptionEn: day?.descriptionEn || "",
                    descriptionFr: day?.descriptionFr || "",
                    displayOrder: day?.displayOrder || index + 1,
                    imageIndex: hasNewFile ? itineraryImageIndex++ : null,
                    imageUrl: typeof day?.imageUrl === "string" ? day.imageUrl : null,
                };
            });

            const payload = {
                // id: tourDetail?.id,
                code: tour?.code,

                durationDays: Number(tour?.duration_days),
                priceFrom: Number(tour?.price_from),
                groupSize: tour?.group_size,

                titleEn: tour?.title_en,
                titleFr: tour?.title_fr,

                slugEn: tour?.slug_en,
                slugFr: tour?.slug_fr,

                shortDescriptionEn: tour?.short_description_en,
                shortDescriptionFr: tour?.short_description_fr,

                overviewEn: tour?.overview_en,
                overviewFr: tour?.overview_fr,

                inclusionEn: tour?.inclusion_en,
                inclusionFr: tour?.inclusion_fr,

                exclusionEn: tour?.exclusion_en,
                exclusionFr: tour?.exclusion_fr,

                isFeatured: Boolean(tour?.is_featured),
                isActive: Boolean(tour?.is_active),
                featuredImageUrl: tour?.featuredImage,
                imageUrls: tour?.galleryImages || [],
                status: "PUBLISHED",

                styleIds: tour?.styles?.map((x) => x?.id) || [],
                collectionIds: tour?.collections?.map((x) => x?.id) || [],
                destinationIds: tour?.destinations?.map((x) => x?.id) || [],

                itineraryDays: itineraryDaysPayload,
            };

            const formData = new FormData();
            formData.append("data", JSON.stringify(payload));

            // itinerary images
            destinationDays.forEach((day) => {
                if (day?.imageUrl instanceof File) {
                    formData.append("itineraryImages", day.imageUrl);
                }
            });

            const res = await updateTours({ id, data: formData });

            if (res) {
                navigate("/admin/tour");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);

        try {
            let itineraryImageIndex = 0;

            const itineraryDaysPayload = destinationDays.map((day, index) => {
                const hasFile = day?.imageUrl instanceof File;
                const currentImageIndex = hasFile ? itineraryImageIndex++ : null;

                return {
                    dayNumber: day?.dayNumber || index + 1,
                    titleEn: day?.titleEn || "",
                    titleFr: day?.titleFr || "",
                    descriptionEn: day?.descriptionEn || "",
                    descriptionFr: day?.descriptionFr || "",
                    displayOrder: day?.displayOrder || index + 1,
                    imageIndex: currentImageIndex,
                    imageUrl: typeof day?.imageUrl === "string" ? day.imageUrl : null,
                };
            });

            const payload = {
                code: tour?.code || `VN-${Date.now()}`,

                durationDays: Number(tour?.duration_days),
                priceFrom: Number(tour?.price_from),
                groupSize: tour?.group_size,

                titleEn: tour?.title_en,
                titleFr: tour?.title_fr,

                slugEn: tour?.slug_en,
                slugFr: tour?.slug_fr,

                shortDescriptionEn: tour?.short_description_en,
                shortDescriptionFr: tour?.short_description_fr,

                overviewEn: tour?.overview_en,
                overviewFr: tour?.overview_fr,

                inclusionEn: tour?.inclusion_en,
                inclusionFr: tour?.inclusion_fr,

                exclusionEn: tour?.exclusion_en,
                exclusionFr: tour?.exclusion_fr,

                isFeatured: Boolean(tour?.is_featured),
                isActive: Boolean(tour?.is_active),

                featuredImageUrl: tour?.featuredImage,
                imageUrls: tour?.galleryImages || [],
                status: "PUBLISHED",

                styleIds: tour?.styles?.map((x) => x?.id) || [],
                collectionIds: tour?.collections?.map((x) => x?.id) || [],
                destinationIds: tour?.destinations?.map((x) => x?.id) || [],

                itineraryDays: itineraryDaysPayload,
            };

            const formData = new FormData();
            formData.append("data", JSON.stringify(payload));

            // //  FEATURE IMAGE
            // if (tour?.featuredImage instanceof File) {
            //     formData.append("featuredImage", tour.featuredImage);
            // }

            // // GALLERY IMAGES
            // (tour?.galleryImages || []).forEach((img) => {
            //     if (img instanceof File) {
            //         formData.append("galleryImages", img);
            //     }
            // });

            destinationDays.forEach((day) => {
                if (day?.imageUrl instanceof File) {
                    formData.append("itineraryImages", day.imageUrl);
                }
            });

            const res = await createTours(formData);

            if (res) {
                navigate("/admin/tour");
            }
        } catch (error) {
            console.error("Create tour failed:", error);
            console.error("Response data:", error?.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field) => (e) => {
        setTour((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    useEffect(() => {
        if (!tourDetail) return;

        setTour((prev) => ({
            ...prev,

            duration_days: tourDetail?.durationDays || 7,

            price_from: tourDetail?.priceFrom || "",

            group_size: tourDetail?.groupSize || "",

            title_en: tourDetail?.titleEn || "",

            title_fr: tourDetail?.titleFr || "",

            slug_en: tourDetail?.slugEn || "",

            slug_fr: tourDetail?.slugFr || "",

            overview_en: tourDetail?.overviewEn || "",

            overview_fr: tourDetail?.overviewFr || "",

            short_description_en: tourDetail?.shortDescriptionEn || "",
            short_description_fr: tourDetail?.shortDescriptionFr || "",

            inclusion_en: tourDetail?.inclusionEn || "",
            inclusion_fr: tourDetail?.inclusionFr || "",

            exclusion_en: tourDetail?.exclusionEn || "",
            exclusion_fr: tourDetail?.exclusionFr || "",

            is_featured: tourDetail?.isFeatured,

            is_active: tourDetail?.isActive,

            featuredImage: tourDetail?.featuredImageUrl,
            galleryImages: tourDetail?.imageUrls || [],

            styles: tourDetail?.styleIds?.map((id) => ({ id })) || [],

            collections: tourDetail?.collectionIds?.map((id) => ({ id })) || [],

            destinations: tourDetail?.destinationIds?.map((id) => ({ id })) || [],
        }));

        setDestinationDays(tourDetail?.itineraryDays);
    }, [tourDetail]);

    return (
        <div className="min-h-screen bg-[#020617] text-white p-8">
            <div className="mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Create Tour</h1>

                        <p className="text-slate-400 mt-1">Create new travel experience</p>
                    </div>

                    <Button variant="contained" onClick={safeId ? handleUpdate : handleSubmit}>
                        Save Tour
                    </Button>
                </div>

                {/* Basic Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                    <h2 className="text-xl font-semibold mb-6">Basic Information</h2>

                    <div className="grid grid-cols-2 gap-5">
                        {/* <TextField
                            label="Tour Code"
                            value={tour?.code}
                            onChange={handleChange("code")}
                            fullWidth
                            sx={darkTextField}
                        /> */}

                        <Autocomplete
                            options={durationsDays}
                            value={durationsDays.find((item) => item.value === tour?.duration_days) || null}
                            onChange={(_, value) =>
                                setTour((prev) => ({
                                    ...prev,
                                    duration_days: value?.value || null,
                                }))
                            }
                            sx={darkTextField}
                            getOptionLabel={(option) => String(option?.value || "")}
                            renderInput={(params) => <TextField {...params} label="Days" />}
                        />

                        <TextField
                            label="Price From"
                            type="number"
                            value={tour?.price_from}
                            onChange={handleChange("price_from")}
                            fullWidth
                            sx={darkTextField}
                        />

                        <TextField
                            label="Group Size"
                            value={tour?.group_size}
                            onChange={handleChange("group_size")}
                            fullWidth
                            sx={darkTextField}
                        />

                        <TextField
                            label="Title EN"
                            value={tour?.title_en}
                            onChange={handleChange("title_en")}
                            fullWidth
                            sx={darkTextField}
                        />

                        <TextField
                            label="Title FR"
                            value={tour?.title_fr}
                            onChange={handleChange("title_fr")}
                            fullWidth
                            sx={darkTextField}
                        />

                        <TextField
                            label="Slug EN"
                            value={tour?.slug_en}
                            onChange={handleChange("slug_en")}
                            fullWidth
                            sx={darkTextField}
                        />

                        <TextField
                            label="Slug FR"
                            value={tour?.slug_fr}
                            onChange={handleChange("slug_fr")}
                            fullWidth
                            sx={darkTextField}
                        />
                    </div>
                </div>

                {/* Relatiónhip card */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mt-[3rem]">
                    <h2 className="text-xl font-semibold mb-6">Relationships</h2>

                    <div className="space-y-5">
                        <Autocomplete
                            multiple
                            sx={darkTextField}
                            options={styles}
                            value={styles?.filter((style) => tour?.styles?.some((s) => s.id === style.id))}
                            // onInputChange={(_, value) => setStyleSearch(value)}
                            onChange={(_, value) =>
                                setTour((prev) => ({
                                    ...prev,
                                    styles: value,
                                }))
                            }
                            getOptionLabel={(option) => option?.name || ""}
                            renderInput={(params) => <TextField {...params} label="Tour Styles" />}
                        />

                        <Autocomplete
                            multiple
                            sx={darkTextField}
                            options={collections}
                            value={collections?.filter((style) => tour?.collections?.some((s) => s.id === style.id))}
                            // onInputChange={(_, value) => setCollectionSearch(value)}
                            onChange={(_, value) =>
                                setTour((prev) => ({
                                    ...prev,
                                    collections: value,
                                }))
                            }
                            getOptionLabel={(option) => option?.name || ""}
                            renderInput={(params) => <TextField {...params} label="Collections" />}
                        />

                        <Autocomplete
                            sx={darkTextField}
                            multiple
                            options={destinations}
                            // onInputChange={(_, value) => setDestinationSearch(value)}
                            value={destinations?.filter((style) => tour?.destinations?.some((s) => s.id === style.id))}
                            onChange={(_, value) => {
                                setTour((prev) => ({
                                    ...prev,
                                    destinations: value,
                                }));
                            }}
                            getOptionLabel={(option) => option?.name || ""}
                            renderInput={(params) => <TextField {...params} label="Destination" />}
                        />
                    </div>
                </div>

                {/* TIme line  */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mt-[3rem]">
                    <div className="flex justify-between mb-6">
                        <h2 className="text-xl font-semibold">Tour Destinations</h2>

                        <Button variant="contained" onClick={addDay}>
                            Add Day
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {destinationDays?.map((item, index) => (
                            <div
                                key={index}
                                className="
                        border
                        border-slate-700
                        rounded-2xl
                        p-4
                    ">
                                <div className="flex gap-4">
                                    <div className="w-32">
                                        <TextField
                                            label="Day"
                                            value={item?.dayNumber}
                                            onChange={(e) => {
                                                setDestinationDays((prev) =>
                                                    prev.map((item, i) =>
                                                        i === index
                                                            ? {
                                                                  ...item,
                                                                  dayNumber: e.target.value,
                                                              }
                                                            : item,
                                                    ),
                                                );
                                            }}
                                            fullWidth
                                            sx={darkTextField}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <TextField
                                            label="Title En"
                                            value={item?.titleEn || ""}
                                            onChange={(e) => {
                                                setDestinationDays((prev) =>
                                                    prev.map((item, i) =>
                                                        i === index
                                                            ? {
                                                                  ...item,
                                                                  titleEn: e.target.value,
                                                              }
                                                            : item,
                                                    ),
                                                );
                                            }}
                                            fullWidth
                                            multiline
                                            maxRows={2}
                                            sx={darkTextField}
                                        />
                                        <div className="flex-1 mt-[0.5rem]">
                                            <TextField
                                                label="Title Fr"
                                                value={item?.titleFr || ""}
                                                onChange={(e) => {
                                                    setDestinationDays((prev) =>
                                                        prev.map((item, i) =>
                                                            i === index
                                                                ? {
                                                                      ...item,
                                                                      titleFr: e.target.value,
                                                                  }
                                                                : item,
                                                        ),
                                                    );
                                                }}
                                                fullWidth
                                                multiline
                                                maxRows={2}
                                                sx={darkTextField}
                                            />
                                        </div>
                                    </div>

                                    <Button color="error" onClick={() => removeDay(index)}>
                                        Remove
                                    </Button>
                                </div>
                                <div className="my-[1rem]"></div>
                                <TextField
                                    label="Description Destination En"
                                    value={item?.descriptionEn || ""}
                                    onChange={(e) => {
                                        setDestinationDays((prev) =>
                                            prev.map((item, i) =>
                                                i === index
                                                    ? {
                                                          ...item,
                                                          descriptionEn: e.target.value,
                                                      }
                                                    : item,
                                            ),
                                        );
                                    }}
                                    fullWidth
                                    multiline
                                    maxRows={2}
                                    sx={darkTextField}
                                />
                                <div className="my-[1rem]"></div>
                                <TextField
                                    label="Description Destination Fr"
                                    value={item?.descriptionFr || ""}
                                    onChange={(e) => {
                                        setDestinationDays((prev) =>
                                            prev.map((item, i) =>
                                                i === index
                                                    ? {
                                                          ...item,
                                                          descriptionFr: e.target.value,
                                                      }
                                                    : item,
                                            ),
                                        );
                                    }}
                                    fullWidth
                                    multiline
                                    maxRows={2}
                                    sx={darkTextField}
                                />

                                <div className="mt-4">
                                    <Button variant="outlined" component="label">
                                        Upload Image
                                        <input
                                            hidden
                                            accept="image/*"
                                            type="file"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];

                                                if (!file) return;

                                                const clone = [...destinationDays];

                                                clone[index].imageUrl = file;
                                                clone[index].preview = URL.createObjectURL(file);

                                                setDestinationDays(clone);
                                            }}
                                        />
                                    </Button>

                                    <img
                                        src={item.preview || item.imageUrl}
                                        alt=""
                                        className="w-48 h-32 object-cover rounded-xl border border-slate-700"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Image  Hero*/}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mt-[3rem]">
                    <h2 className="text-xl font-semibold mb-4">Featured Image</h2>
                    <input type="file" accept="image/*" onChange={handleFeaturedImage} className="cursor-pointer" />
                    {tour?.featuredImage && (
                        <img
                            src={
                                typeof tour?.featuredImage === "string"
                                    ? tour?.featuredImage
                                    : URL.createObjectURL(tour?.featuredImage)
                            }
                            alt=""
                            className="mt-4 h-[300px] w-full object-cover rounded-2xl"
                        />
                    )}
                </div>

                {/* Galary IMG */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mt-[3rem]">
                    <h2 className="text-xl font-semibold mb-4">Tour Gallery</h2>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleGalleryImages}
                        className="cursor-pointer"
                    />
                    <div className="grid grid-cols-4 gap-4 mt-6">
                        {tour?.galleryImages?.map((image, index) => (
                            <img
                                key={index}
                                src={image instanceof File ? URL.createObjectURL(image) : image}
                                alt=""
                                className="h-40 w-full rounded-xl object-cover"
                            />
                        ))}
                    </div>
                </div>

                {/* Text Section */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 grid grid-cols-2 gap-5 mt-[3rem]">
                    <TextField
                        sx={darkTextField}
                        label="Overview EN"
                        value={tour?.overview_en}
                        onChange={handleChange("overview_en")}
                        multiline
                        minRows={3}
                        fullWidth
                    />
                    <TextField
                        label="Overview FR"
                        sx={darkTextField}
                        value={tour?.overview_fr}
                        onChange={handleChange("overview_fr")}
                        multiline
                        minRows={3}
                        fullWidth
                    />

                    <TextField
                        label="Short Description EN"
                        sx={darkTextField}
                        value={tour?.short_description_en}
                        onChange={handleChange("short_description_en")}
                        multiline
                        minRows={3}
                        fullWidth
                    />
                    <TextField
                        label="Short description FR"
                        sx={darkTextField}
                        value={tour?.short_description_fr}
                        onChange={handleChange("short_description_fr")}
                        multiline
                        minRows={3}
                        fullWidth
                    />
                    <TextField
                        label="Inclusion EN"
                        sx={darkTextField}
                        value={tour?.inclusion_en}
                        onChange={handleChange("inclusion_en")}
                        multiline
                        minRows={3}
                        fullWidth
                    />
                    <TextField
                        label="Inclusion FR"
                        sx={darkTextField}
                        value={tour?.inclusion_fr}
                        onChange={handleChange("inclusion_fr")}
                        multiline
                        minRows={3}
                        fullWidth
                    />
                    <TextField
                        label="Exclusion EN"
                        sx={darkTextField}
                        value={tour?.exclusion_en}
                        onChange={handleChange("exclusion_en")}
                        multiline
                        minRows={3}
                        fullWidth
                    />
                    <TextField
                        label="Exclusion FR"
                        sx={darkTextField}
                        value={tour?.exclusion_fr}
                        onChange={handleChange("exclusion_fr")}
                        multiline
                        minRows={3}
                        fullWidth
                    />
                </div>

                {/* Toggle  */}
                <div className="flex gap-8 mt-[3rem] bg-slate-900 border border-slate-800 rounded-3xl p-6">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={tour?.is_featured}
                                onChange={(e) =>
                                    setTour((prev) => ({
                                        ...prev,
                                        is_featured: e.target.checked,
                                    }))
                                }
                                sx={{
                                    "& .MuiSwitch-track": {
                                        backgroundColor: "rgba(255,255,255,0.12)",
                                        opacity: 1,
                                    },

                                    "& .MuiSwitch-thumb": {
                                        backgroundColor: "#fff",
                                        border: "1px solid rgba(255,255,255,0.15)",
                                    },

                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                        color: "#c39562",
                                    },

                                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                        backgroundColor: "#c39562",
                                        opacity: 1,
                                    },

                                    "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
                                        backgroundColor: "#fff",
                                    },
                                }}
                            />
                        }
                        label="Featured"
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={tour?.is_active}
                                onChange={(e) =>
                                    setTour((prev) => ({
                                        ...prev,
                                        is_active: e.target.checked,
                                    }))
                                }
                                sx={{
                                    "& .MuiSwitch-track": {
                                        backgroundColor: "rgba(255,255,255,0.12)",
                                        opacity: 1,
                                    },

                                    "& .MuiSwitch-thumb": {
                                        backgroundColor: "#fff",
                                        border: "1px solid rgba(255,255,255,0.15)",
                                    },

                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                        color: "#c39562",
                                    },

                                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                        backgroundColor: "#c39562",
                                        opacity: 1,
                                    },

                                    "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
                                        backgroundColor: "#fff",
                                    },
                                }}
                            />
                        }
                        label="Active"
                    />
                </div>

                <div className="flex items-center justify-end mt-[1rem]">
                    <Button variant="contained" onClick={id ? handleUpdate : handleSubmit}>
                        Save Tour
                    </Button>
                </div>
            </div>
            <Backdrop
                open={loading || isLoading}
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 9999,
                    backgroundColor: "rgba(0,0,0,0.35)",
                }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default CreateTour;
