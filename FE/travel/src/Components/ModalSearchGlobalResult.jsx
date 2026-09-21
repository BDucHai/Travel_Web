export default function ModalSearchGloabalResult({
    blogs = [],
    tours = [],
    loading = false,
    onSelect,
    onSeeAll,
    t,
    mobile = false,
}) {
    return (
        <div
            className={
                mobile
                    ? "w-full bg-white"
                    : `
                        absolute
                        top-[calc(100%+0.75rem)]
                         left-1/2
                         -translate-x-1/2
                        w-[35rem]
                        z-[9999]
                        bg-white
                        rounded-[1rem]
                        border
                        border-black/[0.08]
                        shadow-[0_15px_50px_rgba(0,0,0,0.18)]
                    `
            }>
            {/* Blogs */}
            <div className="max-h-[27rem] overflow-y-auto">
                {blogs?.length > 0 && (
                    <div>
                        <div className="px-[1rem] py-[0.75rem] text-[0.8rem] font-semibold uppercase text-black/50">
                            {t("blogs")}
                        </div>

                        {blogs?.map((blog) => (
                            <div
                                key={blog?.id}
                                onClick={() => onSelect("blog", blog?.slug)}
                                className="
                                flex
                                gap-[0.75rem]
                                px-[1rem]
                                py-[0.75rem]
                                cursor-pointer
                                hover:bg-black/[0.04]
                            ">
                                <img
                                    src={blog?.thumbnailUrl || blog.heroImageUrl}
                                    alt={blog?.title}
                                    className="
                                    w-[4.5rem]
                                    h-[3.5rem]
                                    object-cover
                                    rounded-[0.5rem]
                                    flex-shrink-0
                                "
                                />

                                <div className="min-w-0">
                                    <div className="font-medium text-black line-clamp-1">{blog?.title}</div>

                                    <div className="text-[0.8rem] text-black/50 line-clamp-2">{blog?.excerpt}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Divider */}
                {blogs?.length > 0 && tours?.length > 0 && <div className="border-t border-black/10" />}

                {/* Tours */}
                {tours?.length > 0 && (
                    <div>
                        <div className="px-[1rem] py-[0.75rem] text-[0.8rem] font-semibold uppercase text-black/50">
                            {t("tours")}
                        </div>

                        {tours.map((tour) => (
                            <div
                                key={tour?.id}
                                onClick={() => onSelect("tour", tour?.slug)}
                                className="
                                flex
                                gap-[0.75rem]
                                px-[1rem]
                                py-[0.75rem]
                                cursor-pointer
                                hover:bg-black/[0.04]
                            ">
                                <img
                                    src={tour?.featuredImageUrl}
                                    alt={tour?.title}
                                    className="
                                    w-[4.5rem]
                                    h-[3.5rem]
                                    object-cover
                                    rounded-[0.5rem]
                                    flex-shrink-0
                                "
                                />

                                <div className="min-w-0">
                                    <div className="font-medium text-black line-clamp-1">{tour?.title}</div>

                                    <div className="text-[0.8rem] text-black/50">
                                        {tour?.durationDays} {t("days")}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {!loading && (blogs.length > 0 || tours.length > 0) && (
                <div className="border-t border-black/10 p-[0.75rem] bg-white rounded-b-[1rem]">
                    <button
                        type="button"
                        onClick={() => onSeeAll()}
                        className=" w-full py-[0.65rem] rounded-[0.5rem] text-[0.85rem] font-medium text-[#ef8d21] hover:bg-[#ef8d21]/10 transition cursor-pointer">
                        {t("see_all")}
                    </button>
                </div>
            )}

            {/* No result */}
            {!loading && blogs?.length === 0 && tours?.length === 0 && (
                <div className="px-[1rem] py-[2rem] text-center text-black/50">{t("no_results")}</div>
            )}

            {/* Loading */}
            {loading && <div className="px-[1rem] py-[2rem] text-center text-black/50">{t("loading")}</div>}
        </div>
    );
}
