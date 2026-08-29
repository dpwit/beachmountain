function getCountryFlag(country) {

    const countryFlags = {

        "Argentina": "🇦🇷",
        "Austria": "🇦🇹",
        "Canada": "🇨🇦",
        "Chile": "🇨🇱",
        "France": "🇫🇷",
        "Germany": "🇩🇪",
        "Italy": "🇮🇹",
        "Japan": "🇯🇵",
        "New Zealand": "🇳🇿",
        "Norway": "🇳🇴",
        "Spain": "🇪🇸",
        "Switzerland": "🇨🇭",
        "United States": "🇺🇸"

    };


    return (
        countryFlags[country]
        ||
        "🏔️"
    );

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
            null,


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