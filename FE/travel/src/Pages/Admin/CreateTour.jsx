import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { createTours, getToursById } from "../../api/Tour";
import { useDebounce } from "use-debounce";

import { TextField, Button, Switch, FormControlLabel, Autocomplete } from "@mui/material";
import { getDestinations } from "../../api/Destinations";
import { getStyles } from "../../api/Style";
import { getTourCollections } from "../../api/TourCollection";

const CreateTour = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, mutate } = useSWR(id ? ["/tours", id] : null, ([_, id]) => getToursById(id));

    const [styleSearch, setStyleSearch] = useState("");
    const [collectionSearch, setCollectionSearch] = useState("");
    const [destinationSearch, setDestinationSearch] = useState("");

    const [debouncedStyleSearch] = useDebounce(styleSearch, 1000);

    const [debouncedCollectionSearch] = useDebounce(collectionSearch, 1000);

    const [debouncedDestinationSearch] = useDebounce(destinationSearch, 1000);

    const { data: styles = [] } = useSWR(["/tour-styles", debouncedStyleSearch], ([_, search]) =>
        getStyles({
            search,
            page: 1,
            limit: 20,
        }),
    );

    const { data: collections = [] } = useSWR(["/tour-collections", debouncedCollectionSearch], ([_, search]) =>
        getTourCollections({
            search,
            page: 1,
            limit: 20,
        }),
    );

    const { data: destinations = [] } = useSWR(["/destinations", debouncedDestinationSearch], ([_, search]) =>
        getDestinations({
            search,
            page: 1,
            limit: 20,
        }),
    );

    const [tour, setTour] = useState({
        code: "",

        duration_days: "",

        price_from: "",

        title_en: "",
        title_fr: "",

        slug_en: "",
        slug_fr: "",

        short_description_en: "",
        short_description_fr: "",

        overview_en: "",
        overview_fr: "",

        itinerary_en: "",
        itinerary_fr: "",

        inclusion_en: "",
        inclusion_fr: "",

        exclusion_en: "",
        exclusion_fr: "",

        is_featured: false,

        is_active: true,

        featuredImage: null,

        galleryImages: [],

        styles: [],

        collections: [],
    });

    const [destinationDays, setDestinationDays] = useState([
        {
            destination: null,
            dayOrder: 1,
            displayOrder: 1,
        },
    ]);

    const addDay = () => {
        setDestinationDays((prev) => [
            ...prev,
            {
                destination: null,
                dayOrder: prev.length + 1,
                displayOrder: prev.length + 1,
            },
        ]);
    };

    const removeDay = (index) => {
        setDestinationDays((prev) =>
            prev
                .filter((_, i) => i !== index)
                .map((item, idx) => ({
                    ...item,
                    dayOrder: idx + 1,
                    displayOrder: idx + 1,
                })),
        );
    };

    const handleFeaturedImage = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setTour((prev) => ({
            ...prev,
            featuredImage: file,
        }));
    };

    const handleGalleryImages = (e) => {
        const files = Array.from(e.target.files || []);

        setTour((prev) => ({
            ...prev,
            galleryImages: [...prev.galleryImages, ...files],
        }));
    };

const handleSubmit = async () => {
    try {
        const payload = {
            code: tour.code,
            duration_days: Number(tour.duration_days),
            price_from: Number(tour.price_from),
            group_size: tour.group_size,

            title_en: tour.title_en,
            title_fr: tour.title_fr,

            slug_en: tour.slug_en,
            slug_fr: tour.slug_fr,

            short_description_en: tour.short_description_en,

            short_description_fr: tour.short_description_fr,

            overview_en: tour.overview_en,
            overview_fr: tour.overview_fr,

            itinerary_en: tour.itinerary_en,
            itinerary_fr: tour.itinerary_fr,

            inclusion_en: tour.inclusion_en,
            inclusion_fr: tour.inclusion_fr,

            exclusion_en: tour.exclusion_en,
            exclusion_fr: tour.exclusion_fr,

            is_featured: tour.is_featured,
            is_active: tour.is_active,

            style_ids: tour.styles.map((item) => item.id),

            collection_ids: tour.collections.map((item) => item.id),

            tour_destinations: destinationDays
                .filter((item) => item.destination)
                .map((item) => ({
                    destination_id: item.destination.id,

                    day_order: item.dayOrder,

                    display_order: item.displayOrder,
                })),
        };

        const formData = new FormData();

        formData.append("data", JSON.stringify(payload));

        if (tour.featuredImage) {
            formData.append("featured_image", tour.featuredImage);
        }

        tour.galleryImages.forEach((image) => {
            formData.append("gallery_images", image);
        });

        const res = await createTours(formData);
        if(res?.status === 200){

          navigate("/admin/tours");
        }
    } catch (error) {
        console.error(error);
    }
};

    const handleChange = (field) => (e) => {
        setTour((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    useEffect(() => {
        if (!data) return;

        setTour((prev) => ({
            ...prev,

            code: data?.code || "",

            duration_days: data?.duration_days || "",

            price_from: data?.price_from || "",

            group_size: data?.group_size || "",

            title_en: data?.title_en || "",

            title_fr: data?.title_fr || "",

            slug_en: data?.slug_en || "",

            slug_fr: data?.slug_fr || "",

            overview_en: data?.overview_en || "",

            overview_fr: data?.overview_fr || "",
        }));
    }, [data]);

    return (
        <div className="min-h-screen bg-[#020617] text-white p-8">
            <div className="mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Create Tour</h1>

                        <p className="text-slate-400 mt-1">Create new travel experience</p>
                    </div>

                    <Button variant="contained" onClick={handleSubmit}>
                        Save Tour
                    </Button>
                </div>

                {/* Basic Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                    <h2 className="text-xl font-semibold mb-6">Basic Information</h2>

                    <div className="grid grid-cols-2 gap-5">
                        <TextField label="Tour Code" value={tour?.code} onChange={handleChange("code")} fullWidth />

                        <TextField
                            label="Duration (Days)"
                            type="number"
                            value={tour?.duration_days}
                            onChange={handleChange("duration_days")}
                            fullWidth
                        />

                        <TextField
                            label="Price From"
                            type="number"
                            value={tour?.price_from}
                            onChange={handleChange("price_from")}
                            fullWidth
                        />

                        {/* <TextField
                            label="Group Size"
                            value={tour.group_size}
                            onChange={handleChange("group_size")}
                            fullWidth
                        /> */}

                        <TextField
                            label="Title EN"
                            value={tour?.title_en}
                            onChange={handleChange("title_en")}
                            fullWidth
                        />

                        <TextField
                            label="Title FR"
                            value={tour?.title_fr}
                            onChange={handleChange("title_fr")}
                            fullWidth
                        />

                        <TextField label="Slug EN" value={tour?.slug_en} onChange={handleChange("slug_en")} fullWidth />

                        <TextField label="Slug FR" value={tour?.slug_fr} onChange={handleChange("slug_fr")} fullWidth />
                    </div>
                </div>

                {/* Relatiónhip card */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                    <h2 className="text-xl font-semibold mb-6">Relationships</h2>

                    <div className="space-y-5">
                        <Autocomplete
                            multiple
                            options={styles}
                            filterOptions={(x) => x}
                            value={tour?.styles}
                            onInputChange={(_, value) => setStyleSearch(value)}
                            onChange={(_, value) =>
                                setTour((prev) => ({
                                    ...prev,
                                    styles: value,
                                }))
                            }
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} label="Tour Styles" />}
                        />

                        <Autocomplete
                            multiple
                            options={collections}
                            filterOptions={(x) => x}
                            value={tour?.collections}
                            onInputChange={(_, value) => setCollectionSearch(value)}
                            onChange={(_, value) =>
                                setTour((prev) => ({
                                    ...prev,
                                    collections: value,
                                }))
                            }
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} label="Collections" />}
                        />
                    </div>
                </div>

                {/* TIme line  */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                    <div className="flex justify-between mb-6">
                        <h2 className="text-xl font-semibold">Tour Destinations</h2>

                        <Button variant="contained" onClick={addDay}>
                            Add Day
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {destinationDays.map((item, index) => (
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
                                        <TextField label="Day" value={item.dayOrder} fullWidth />
                                    </div>

                                    <div className="flex-1">
                                        <Autocomplete
                                            options={destinations}
                                            filterOptions={(x) => x}
                                            onInputChange={(_, value) => setDestinationSearch(value)}
                                            value={item.destination}
                                            onChange={(_, value) => {
                                                const clone = [...destinationDays];

                                                clone[index].destination = value;

                                                setDestinationDays(clone);
                                            }}
                                            getOptionLabel={(option) => option.name_en}
                                            renderInput={(params) => <TextField {...params} label="Destination" />}
                                        />
                                    </div>

                                    <Button color="error" onClick={() => removeDay(index)}>
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Image  Hero*/}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Featured Image</h2>
                    <input type="file" accept="image/*" onChange={handleFeaturedImage} />
                    {tour?.featuredImage && (
                        <img
                            src={URL.createObjectURL(tour?.featuredImage)}
                            alt=""
                            className="mt-4 h-[300px] w-full object-cover rounded-2xl"
                        />
                    )}
                </div>

                {/* Galary IMG */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Tour Gallery</h2>
                    <input type="file" multiple accept="image/*" onChange={handleGalleryImages} />
                    <div className="grid grid-cols-4 gap-4 mt-6">
                        {tour.galleryImages.map((image, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(image)}
                                alt=""
                                className="h-40 w-full rounded-xl object-cover"
                            />
                        ))}
                    </div>
                </div>

                {/* Text Section */}
                <div className="grid grid-cols-2 gap-5">
                    <TextField
                        label="Overview EN"
                        value={tour?.overview_en}
                        onChange={handleChange("overview_en")}
                        multiline
                        minRows={3}
                        fullWidth
                    />
                    <TextField
                        label="Overview FR"
                        value={tour?.overview_fr}
                        onChange={handleChange("overview_fr")}
                        multiline
                        minRows={3}
                        fullWidth
                    />
                    <TextField
                        label="Short Description EN"
                        value={tour?.description_en}
                        onChange={handleChange("description_en")}
                        multiline
                        minRows={3}
                        fullWidth
                    />
                    <TextField
                        label="Short Description FR"
                        value={tour?.description_fr}
                        onChange={handleChange("description_fr")}
                        multiline
                        minRows={3}
                        fullWidth
                    />
                    <TextField
                        label="Itinerary EN"
                        value={tour?.itinerary_en}
                        onChange={handleChange("itinerary_en")}
                        multiline
                        minRows={3}
                        fullWidth
                    />
                    <TextField
                        label="Itinerary FR"
                        value={tour?.itinerary_fr}
                        onChange={handleChange("itinerary_fr")}
                        multiline
                        minRows={3}
                        fullWidth
                    />
                    <TextField
                        label="Inclusion EN"
                        value={tour?.inclusion_en}
                        onChange={handleChange("inclusion_en")}
                        multiline
                        minRows={3}
                        fullWidth
                    />
                    <TextField
                        label="Inclusion FR"
                        value={tour?.inclusion_fr}
                        onChange={handleChange("inclusion_fr")}
                        multiline
                        minRows={3}
                        fullWidth
                    />
                    <TextField
                        label="Exclusion EN"
                        value={tour?.exclusion_en}
                        onChange={handleChange("exclusion_en")}
                        multiline
                        minRows={3}
                        fullWidth
                    />
                    <TextField
                        label="Exclusion FR"
                        value={tour?.exclusion_f}
                        onChange={handleChange("exclusion_fr")}
                        multiline
                        minRows={3}
                        fullWidth
                    />
                </div>

                {/* Toggle  */}
                <div className="flex gap-8">
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
                            />
                        }
                        label="Active"
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateTour;
