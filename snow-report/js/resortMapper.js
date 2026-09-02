function getCountryFlag(country) {

    const countryFlags = {

        "Argentina": "🇦🇷",
        "Australia": "🇦🇺",
        "Austria": "🇦🇹",
        "Canada": "🇨🇦",
        "Chile": "🇨🇱",
        "France": "🇫🇷",
        "Germany": "🇩🇪",
        "Italy": "🇮🇹",
        "Japan": "🇯🇵",
        "Lesotho": "🇱🇸",
        "New Zealand": "🇳🇿",
        "Norway": "🇳🇴",
        "Spain": "🇪🇸",
        "Sweden": "🇸🇪",
        "Switzerland": "🇨🇭",
        "United States": "🇺🇸"

    };


    return (
        countryFlags[country]
        ||
        "🏔️"
    );

}

export function mapDetailedResort(
    resort
) {

    const snowDepth =

        resort.snow?.depthCm

        ??

        resort.snow?.reportedDepth

        ??

        resort.conditions?.data
            ?.displayDepthCm

        ??

        0;


    const temperature =

        resort.currentConditions
            ?.temperature

        ??

        resort.conditionsByElevation
            ?.summit
            ?.temperature
            ?.celsius

        ??

        null;


    const liftsOpen =

        resort.operations
            ?.liftsOpen

        ??

        resort.conditions
            ?.data
            ?.lifts
            ?.value
            ?.open

        ??

        0;


    const liftsTotal =

        resort.operations
            ?.liftsTotal

        ??

        resort.stats
            ?.lifts

        ??

        resort.conditions
            ?.data
            ?.lifts
            ?.value
            ?.total

        ??

        null;


    const snowfall24h =

        resort.snow
            ?.last24hCm

        ??

        0;


    const snowfall7d =

        resort.snow
            ?.last7dCm

        ??

        0;


    return {

        id:
            resort.slug,

        slug:
            resort.slug,

        name:
            resort.name,

        country:
            resort.country,

        region:
            resort.region,

        aliases:
            resort.aliases || [],

        flag:
    getCountryFlag(
        resort.country
    ),

        status:
            resort.statusLabel
            ||
            resort.closure?.label
            ||
            "Unknown",

        snowDepth,

        snowfall24h,

        snowfall7d,

        temperature,

        liftsOpen,

        liftsTotal,

                updated:
            resort.meta?.timestamp
            ||
            resort.currentConditions
                ?.lastUpdated
            ||
            "Recently",

        isOpen:
            resort.isOpen,

        snowSureScore:
            resort.snowSure
                ?.score
            ??
            null,

        snowSureRating:
            resort.snowSure
                ?.rating
            ??
            null,

        snowSureTagline:
            resort.snowSure
                ?.tagline
            ??
            null,

        snowSureTrend:
            resort.snowSure
                ?.trend
            ??
            null,
        
        description:
            resort.description,

        apresSki:
            resort.apresSki
                ?.top
            ??
            null,
        
        elevationBase:
            resort.elevation
                ?.base
            ??
            null,
        
        elevationSummit:
            resort.elevation
                ?.summit
            ??
            null

    };

}

function getResortStatus(resort) {

    if (resort.notOperatingToday) {

        return "Closed";

    }


    if (resort.isOpen) {

        return "Open";

    }


    return "Partially Open";

}


export function mapResort(apiResort) {

    return {

        id:
            apiResort.slug,

        name:
            apiResort.name,

        country:
            apiResort.country,

        flag:
            getCountryFlag(
                apiResort.country
            ),


        snowDepth:
            apiResort.conditions
                ?.displayDepthCm
                ?.value

            ??

            apiResort.conditions
                ?.snowDepthCm

            ??

            0,


        snowfall24h:
            apiResort.conditions
                ?.snowfall24hCm

            ?? 0,


        snowfall7d:
            apiResort.conditions
                ?.snowfall7dCm

            ?? 0,


        temperature:
            apiResort.stats
                ?.temperature

            ?? "—",


        liftsOpen:
            apiResort.stats
                ?.lifts

            ?? "—",


        liftsTotal:
            null,


        runs:
            apiResort.stats
                ?.runs

            ?? null,


        status:
            getResortStatus(
                apiResort
            ),


        updated:
            "Live data",


        // Extra live data for later phases

        heroImage:
            apiResort.heroImage,

        coordinates:
            apiResort.coordinates,

        region:
            apiResort.region,

        snowSureScore:
            apiResort.snowSure
                ?.score,

        snowSureRating:
            apiResort.snowSure
                ?.rating,

        snowSureTagline:
            apiResort.snowSure
                ?.tagline,

        snowSureTrend:
            apiResort.snowSure
                ?.trend,

        forecast7d:
            apiResort.conditions
                ?.forecast7dCm,

        forecast14d:
            apiResort.conditions
                ?.forecast14dCm,

        elevation:
            apiResort.elevation,

        sourceUrl:
            apiResort.links
                ?.snowsure

    };

}