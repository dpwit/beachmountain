// This will take our sample data and dynamically create the resort cards.

import { resorts } from "./resorts.js";
import { fetchSnowReport,fetchResorts, fetchResortBySlug } from "./api.js";
import { mapResort, mapDetailedResort } from "./resortMapper.js";


const resortsContainer =
    document.querySelector("#resorts-container");

const searchInput =
    document.querySelector("#resort-search");

const countryFilter =
    document.querySelector("#country-filter");

const resultsCount =
    document.querySelector(".results-count");

const featuredTitle =
    document.querySelector(
        "#featured-title"
    );

const featuredDescription =
    document.querySelector(
        "#featured-description"
    );

const featuredSnowfall =
    document.querySelector(
        "#featured-snowfall"
    );

let currentResorts = [];
let resortDirectory = [];

const resortDetailsCache =
    new Map();

async function loadResortDirectory() {

    try {

        const apiResponse =
            await fetchResorts();


        resortDirectory =
            apiResponse
                .data
                .map(resort => ({

                    ...resort,

                    name:
                        resort.name?.trim(),

                    country:
                        resort.country?.trim(),

                    region:
                        resort.region?.trim()

                }));


        console.log(
            "Resort directory loaded:",
            resortDirectory
        );


    } catch (error) {

        console.error(
            "Resort directory failed:",
            error
        );


        resortDirectory = [];

    }

}

function normaliseSearchText(value) {

    return String(value || "")
        .toLowerCase()
        .trim();

}


function getResortSearchText(resort) {

    const aliases =
        Array.isArray(resort.aliases)
            ? resort.aliases.join(" ")
            : "";


    return [

        resort.name,

        resort.country,

        resort.region,

        resort.slug,

        aliases

    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

}


function resortMatchesSearch(
    resort,
    searchTerm
) {

    if (!searchTerm) {

        return true;

    }


    const searchableText =
        getResortSearchText(resort);


    return searchableText.includes(
        searchTerm
    );

}

function searchResortDirectory(
    searchTerm
) {

    const normalisedSearch =
        normaliseSearchText(
            searchTerm
        );


    if (!normalisedSearch) {

        return [];

    }


    const matches =
        resortDirectory.filter(
            resort =>
                resortMatchesSearch(
                    resort,
                    normalisedSearch
                )
        );


    return matches.sort(
        (a, b) => {

            const aName =
                normaliseSearchText(
                    a.name
                );

            const bName =
                normaliseSearchText(
                    b.name
                );


            const aSlug =
                normaliseSearchText(
                    a.slug
                );

            const bSlug =
                normaliseSearchText(
                    b.slug
                );


            const aExact =
                aName === normalisedSearch
                ||
                aSlug === normalisedSearch;


            const bExact =
                bName === normalisedSearch
                ||
                bSlug === normalisedSearch;


            if (
                aExact &&
                !bExact
            ) {

                return -1;

            }


            if (
                !aExact &&
                bExact
            ) {

                return 1;

            }


            const aStarts =
                aName.startsWith(
                    normalisedSearch
                );


            const bStarts =
                bName.startsWith(
                    normalisedSearch
                );


            if (
                aStarts &&
                !bStarts
            ) {

                return -1;

            }


            if (
                !aStarts &&
                bStarts
            ) {

                return 1;

            }


            return aName.localeCompare(
                bName
            );

        }
    );

}

async function getResortDetails(
    slug
) {

    if (
        resortDetailsCache.has(slug)
    ) {

        return resortDetailsCache.get(
            slug
        );

    }


    const apiResponse =
        await fetchResortBySlug(
            slug
        );


    const resort =
        apiResponse.data;


    resortDetailsCache.set(
        slug,
        resort
    );


    return resort;

}

function updateFeaturedResort(resortsToUse) {

    if (
        !resortsToUse ||
        resortsToUse.length === 0
    ) {
        return;
    }


    const topResort =
        resortsToUse.reduce(
            (
                currentTop,
                resort
            ) => {

                return (
                    resort.snowfall24h >
                    currentTop.snowfall24h
                )
                    ? resort
                    : currentTop;

            }
        );


    featuredTitle.textContent =
        `❄️ ${topResort.name} is leading the way`;


    featuredDescription.textContent =
        `${topResort.name} has received the highest snowfall of our featured resorts in the last 24 hours.`;


    featuredSnowfall.textContent =
        `${topResort.snowfall24h} cm`;

}

function showLoadingState() {

    resultsCount.textContent =
    "Loading resorts...";

    resortsContainer.innerHTML = `

        <div class="loading-grid">

            ${Array(6)
                .fill(
                    `
                    <div class="skeleton-card">

                        <div
                            class="skeleton-line short"
                        ></div>

                        <div
                            class="skeleton-line medium"
                        ></div>

                        <div
                            class="skeleton-block"
                        ></div>

                        <div
                            class="skeleton-line"
                        ></div>

                        <div
                            class="skeleton-line medium"
                        ></div>

                    </div>
                    `
                )
                .join("")}

        </div>

    `;

}

function renderResorts(resortsToRender) {

    if (resortsToRender.length === 0) {

        resortsContainer.innerHTML = `

            <div class="no-results">

                <span>🏔️</span>

                <h3>
                    No resorts found
                </h3>

                <p>
                    Try searching for another resort or country.
                </p>

            </div>

        `;

    } else {

        resortsContainer.innerHTML =
            resortsToRender
                .map(createResortCard)
                .join("");

    }


    updateResultsCount(
        resortsToRender.length
    );

}



function createResortCard(resort) {

    const statusClass =
        resort.status
            .toLowerCase()
            .replaceAll(" ", "-");


    const temperature =
        resort.temperature ?? "—";


    const liftsOpen =
        resort.liftsOpen ?? "—";


    const liftsTotal =
        resort.liftsTotal ?? null;


    const liftDisplay =
        liftsTotal
            ? `${liftsOpen} / ${liftsTotal}`
            : liftsOpen;



    return `

        <article
            class="resort-card"
            data-resort="${resort.id}"
        >

            <div class="resort-card-header">

                <div>

                    <span class="country">
                        ${resort.flag}
                        ${resort.country}
                    </span>

                    <h3>
                        ${resort.name}
                    </h3>

                </div>


                <span
                    class="status status-${statusClass}"
                >
                    ${resort.status}
                </span>

            </div>


            <div class="snow-depth">

                <span class="snow-icon">
                    ❄️
                </span>

                <div>

                    <span class="stat-label">
                        Snow Depth
                    </span>

                    <strong>
                        ${resort.snowDepth} cm
                    </strong>

                </div>

            </div>


            <div class="resort-stats">

                <div class="stat">

                    <span>🌨</span>

                    <div>

                        <small>
                            24 Hour Snow
                        </small>

                        <strong>
                            ${resort.snowfall24h} cm
                        </strong>

                    </div>

                </div>


                <div class="stat">

                    <span>📅</span>

                    <div>

                        <small>
                            7 Day Snow
                        </small>

                        <strong>
                            ${resort.snowfall7d} cm
                        </strong>

                    </div>

                </div>


                <div class="stat">

                    <span>🌡</span>

                    <div>

                        <small>
                            Temperature
                        </small>

                        <strong>
    ${
        temperature === "—"
            ? "—"
            : `${temperature}°C`
    }
</strong>

                    </div>

                </div>


                <div class="stat">

                    <span>🚡</span>

                    <div>

                        <small>
                            Lifts Open
                        </small>

                        <strong>
                            ${liftDisplay}
                        </strong>

                    </div>

                </div>

            </div>


            <div class="resort-card-footer">

                <span>
                    Updated ${resort.updated}
                </span>

                <button
                    class="view-resort"
                    data-resort="${resort.id}"
                >
                    View Resort →
                </button>

            </div>

        </article>

    `;

}



function updateResultsCount(count) {

    const resortText =
        count === 1
            ? "resort"
            : "resorts";


    resultsCount.textContent =
        `Showing ${count} ${resortText}`;

}

function populateCountryFilter(resortsToUse) {

    const countries =
        [
            ...new Set(
                resortsToUse.map(
                    resort => resort.country
                )
            )
        ]
        .filter(Boolean)
        .sort();


    countryFilter.innerHTML = `
        <option value="all">
            All Countries
        </option>
    `;


    countries.forEach(country => {

        const option =
            document.createElement(
                "option"
            );


        option.value =
            country;


        option.textContent =
            country;


        countryFilter.appendChild(
            option
        );

    });

}

async function filterResorts() {

    const searchTerm =
        normaliseSearchText(
            searchInput.value
        );


    const selectedCountry =
        countryFilter.value;


    /*
    ---------------------------------
    NO SEARCH TERM
    ---------------------------------
    */

    if (!searchTerm) {

        const filteredResorts =
            currentResorts.filter(
                resort =>

                    selectedCountry === "all"

                    ||

                    resort.country ===
                    selectedCountry
            );


        renderResorts(
            filteredResorts
        );


        return;

    }


    /*
    ---------------------------------
    SEARCH FULL RESORT DIRECTORY
    ---------------------------------
    */

    const directoryMatches =
        searchResortDirectory(
            searchTerm
        );


    const countryMatches =
        directoryMatches.filter(
            resort =>

                selectedCountry === "all"

                ||

                resort.country ===
                selectedCountry
        );


    /*
    ---------------------------------
    NO DIRECTORY MATCHES
    ---------------------------------
    */

    if (
        countryMatches.length === 0
    ) {

        renderResorts([]);

        return;

    }


    /*
    ---------------------------------
    SHOW SEARCHING STATE
    ---------------------------------
    */

    resultsCount.textContent =
        "Searching SnowSure...";


    /*
    ---------------------------------
    LOAD MATCHING RESORT DATA
    ---------------------------------
    */

    try {

        const searchResults =
    countryMatches.slice(
        0,
        20
    );


const detailedResorts =
    await Promise.all(

        searchResults.map(
                    async directoryResort => {

                        /*
                        Check whether this resort
                        already exists in the
                        live snow report.
                        */

                        const liveResort =
                            currentResorts.find(
                                resort =>

                                    resort.slug ===
                                    directoryResort.slug

                                    ||

                                    resort.id ===
                                    directoryResort.slug
                            );


                        /*
                        Use existing live data
                        if available.
                        */

                        if (liveResort) {

                            return liveResort;

                        }


                        /*
                        Otherwise load the
                        individual resort.
                        */

                        const detailedResort =
                            await getResortDetails(
                                directoryResort.slug
                            );


                        return mapDetailedResort(
                            detailedResort
                        );

                    }
                )

            );


        renderResorts(
            detailedResorts
        );

    } catch (error) {

        console.error(
            "Universal resort search failed:",
            error
        );


        renderResorts([]);

    }

}

async function loadLiveResorts() {

    try {

        showLoadingState();


        const apiResponse =
            await fetchSnowReport();


        currentResorts =
            apiResponse
                .data
                .resorts
                .map(mapResort);


        console.log(
            "Mapped live resorts:",
            currentResorts
        );


        populateCountryFilter(
            currentResorts
        );


        renderResorts(
            currentResorts
        );


        updateFeaturedResort(
            currentResorts
        );

    } catch (error) {

        console.error(
            "Live snow data failed:",
            error
        );


        currentResorts =
            resorts;


        populateCountryFilter(
            currentResorts
        );


        renderResorts(
            currentResorts
        );


        updateFeaturedResort(
            currentResorts
        );

    }

}

let searchTimeout;


searchInput.addEventListener(
    "input",
    () => {

        clearTimeout(
            searchTimeout
        );


        searchTimeout =
            setTimeout(
                filterResorts,
                300
            );

    }
);


countryFilter.addEventListener(
    "change",
    filterResorts
);



document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".view-resort"
            );


        if (!button) {
            return;
        }


        const resortId =
            button.dataset.resort;


        if (!resortId) { return; } 
        window.location.href = `/snow-report/resort.html?slug=${encodeURIComponent(resortId)}`;

    }
);

async function initialiseApp() {

    await Promise.all(

        [

            loadLiveResorts(),

            loadResortDirectory()

        ]

    );

}


initialiseApp();