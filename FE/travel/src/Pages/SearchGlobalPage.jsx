import { Backdrop, Box, CircularProgress, Pagination, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { useAuth } from "../contexts/AuthContext";
import { globalSearch } from "../api/GlobalSearch";
import BlogSmallCard from "../Components/BlogSmallCard";
import { useTranslation } from "react-i18next";
import CardHome from "../Components/CardHome";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            tabIndex={0}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const SearchGlobalPage = () => {
    const { search } = useParams();
    const { lang } = useAuth();
    const { t } = useTranslation();
    const [value, setValue] = useState(0);

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    const [blogPage, setBlogPage] = useState(0);
    const [tourPage, setTourPage] = useState(0);

    const { data: searchValue, isLoading } = useSWR(
        search ? ["blogs/globalSearch", search, lang, blogPage, tourPage] : null,
        ([_, keyword, lang, blogPage, tourPage]) =>
            globalSearch({
                keyword,
                lang,
                blogPage,
                tourPage,
                limit: 12,
            }),
    );
    return (
        <div className="py-[2.5rem] px-[0. onClick={() => setValue(1)}5rem] md:px-[2rem] xl:px-[3.5rem] bg-[#fcf5ef]">
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="fullWidth"
                sx={{
                    width: "100%",
                    backgroundColor: "#f3e8dc",
                    borderRadius: "10px",
                    minHeight: "48px",
                    padding: "4px",

                    "& .MuiTabs-indicator": {
                        height: "100%",
                        borderRadius: "8px",
                        backgroundColor: "#4a999b",
                        zIndex: 0,
                    },

                    "& .MuiTab-root": {
                        flex: 1,
                        minWidth: 0,
                        minHeight: "40px",
                        padding: "8px 16px",
                        color: "#795548",
                        fontWeight: 500,
                        fontSize: "0.95rem",
                        textTransform: "none",
                        zIndex: 1,
                        transition: "all 0.2s ease",
                    },

                    "& .MuiTab-root.Mui-selected": {
                        color: "#ffffff",
                        fontWeight: 600,
                    },
                }}>
                <Tab label="All" {...a11yProps(0)} />
                <Tab label="Blogs" {...a11yProps(1)} />
                <Tab label="Tours" {...a11yProps(2)} />
            </Tabs>

            <CustomTabPanel value={value} index={0}>
                {/* Blogs */}
                <div className="my-[1rem] text-[1rem] md:text-[1.5rem] font-bold font-lora">{t("blog")}</div>
                <div className="flex gap-4 overflow-x-auto pb-2 lg:overflow-x-visible">
                    {searchValue?.blogs?.content?.slice(0, 3)?.map((blog, index) => (
                        <div key={blog.id || index} className="w-[60%] shrink-0 sm:w-[50%] md:w-1/3">
                            <BlogSmallCard blog={blog} isShortDesc={true} />
                        </div>
                    ))}
                </div>
                <div className="my-[1rem] flex justify-center">
                    <div
                        className="px-[3rem] py-[0.75rem] border-1 borer-[#76e16f] rounded-[0.5rem] bg-[#e1ab6f] text-white hover:bg-[#8f894e] cursor-pointer"
                        onClick={() => setValue(1)}>
                        {t("see_all")}
                    </div>
                </div>

                {/* Tour */}
                <hr className="mt-[3rem] w-full border-1 text-[#efb771]" />

                <div className="my-[1rem] text-[1rem] md:text-[1.5rem] font-bold font-lora">{t("tour")}</div>
                <div className="flex gap-4 overflow-x-auto pb-2 lg:overflow-x-visible">
                    {searchValue?.tours?.content?.slice(0, 3)?.map((tour, index) => (
                        <div key={tour.id || index} className="w-[60%] shrink-0 sm:w-[50%] md:w-1/3">
                            <CardHome tour={tour} isShortDesc={true} />
                        </div>
                    ))}
                </div>
                <div className="my-[1rem] flex justify-center">
                    <div
                        className="px-[3rem] py-[0.75rem] border-1 borer-[#76e16f] rounded-[0.5rem] bg-[#e1ab6f] text-white hover:bg-[#8f894e] cursor-pointer"
                        onClick={() => setValue(2)}>
                        {t("see_all")}
                    </div>
                </div>
            </CustomTabPanel>

            {/* Blog Panel */}
            <CustomTabPanel value={value} index={1}>
                <div className="my-[1rem] text-[1rem] md:text-[1.5rem] font-bold font-lora">{t("blog")}</div>
                <div className="flex gap-4 overflow-x-auto pb-2 lg:overflow-x-visible">
                    {searchValue?.blogs?.content?.slice(0, 3)?.map((blog, index) => (
                        <div key={blog.id || index} className="w-[60%] shrink-0 sm:w-[50%] md:w-1/3">
                            <BlogSmallCard blog={blog} isShortDesc={true} />
                        </div>
                    ))}
                </div>
                <div className="my-[1rem] flex justify-center">
                    <div
                        className="px-[3rem] py-[0.75rem] border-1 borer-[#76e16f] rounded-[0.5rem] bg-[#e1ab6f] text-white hover:bg-[#8f894e] cursor-pointer"
                        onClick={() => setValue(1)}>
                        {t("see_all")}
                    </div>
                </div>

                <Pagination
                    page={blogPage + 1}
                    count={searchValue?.blogs?.totalPages || 0}
                    onChange={(_, value) => {
                        setBlogPage(value - 1);
                    }}
                />
            </CustomTabPanel>

            {/* TourPanel */}
            <CustomTabPanel value={value} index={2}>
                <Pagination
                    page={tourPage + 1}
                    count={searchValue?.tours?.totalPages || 0}
                    onChange={(event, value) => {
                        setTourPage(value - 1);
                    }}
                />
            </CustomTabPanel>

            {/* BackDrop */}
            <Backdrop
                open={isLoading}
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

export default SearchGlobalPage;
