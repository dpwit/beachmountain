import {
fetchResortBySlug
} from "./api.js";

import {
mapDetailedResort
} from "./resortMapper.js";

const resortPageContent =
document.querySelector(
"#resort-page-content"
);

function getSlugFromUrl() {

const params =
    new URLSearchParams(
        window.location.search
    );

return params.get("slug");

}

function showError(message) {

resortPageContent.innerHTML = `

    <div class="resort-page-error">

        <span>
            🏔️
        </span>

        <h1>
            Resort not found
        </h1>

        <p>
            ${message}
        </p>

        <a
            href="/snow-report/"
            class="back-to-resorts"
        >
            ← Back to Snow Reports
        </a>

    </div>

`;

}

function renderResort(resort) {

document.title =
    `${resort.name} Snow Report | SnowSure`;


resortPageContent.innerHTML = `

    <div class="box-resorts">

        <div class="resort-hero-content">

            <span class="resort-country">

                ${resort.flag}

                ${resort.country}

            </span>


            <h1>
                ${resort.name}
            </h1>


            <p class="resort-region">
                ${resort.region || ""}
            </p>


            <span
                class="status status-${getStatusClass(resort.status)}"
            >
                ${resort.status}
            </span>

        </div>

    </div>

    <div class="snowsure-panel margin-bottom-16">

        <div class="snowsure-panel-header">

            <div>

                <span class="snowsure-label">
                    Description
                </span>

                <h2>
                    Resort description
                </h2>

            </div>

        </div>

        ${resort.description}

    </div>

    <div class="resort-overview">

        <div class="resort-overview-card">

            <span class="overview-icon">
                🏔️
            </span>

            <span class="overview-label">
                Resort details
            </span>

            <strong>
                Base: ${resort.elevationBase}m
            </strong>

            <strong>
                Summit: ${resort.elevationSummit}m
            </strong>

        </div>

        <div class="resort-overview-card">

            <span class="overview-icon">
                ❄️
            </span>

            <span class="overview-label">
                Snow Depth
            </span>

            <strong>
                ${resort.snowDepth} cm
            </strong>

        </div>


        <div class="resort-overview-card">

            <span class="overview-icon">
                🌨
            </span>

            <span class="overview-label">
                24 Hour Snow
            </span>

            <strong>
                ${resort.snowfall24h} cm
            </strong>

        </div>


        <div class="resort-overview-card">

            <span class="overview-icon">
                📅
            </span>

            <span class="overview-label">
                7 Day Snow
            </span>

            <strong>
                ${resort.snowfall7d} cm
            </strong>

        </div>


        <div class="resort-overview-card">

            <span class="overview-icon">
                🚡
            </span>

            <span class="overview-label">
                Lifts Open
            </span>

            <strong>
                ${resort.liftsOpen}
                ${
                    resort.liftsTotal
                        ? ` / ${resort.liftsTotal}`
                        : ""
                }
            </strong>

        </div>

        <div class="resort-overview-card">

            <span class="overview-icon">
                🌡
            </span>

            <span class="overview-label">
                Temperature
            </span>

            <strong>
                ${resort.temperature} °C
            </strong>

        </div>

    </div>

    <div class="snowsure-panel">

        <div class="snowsure-panel-header">

            <div>

                <span class="snowsure-label">
                    SnowSure Score
                </span>

                <h2>
                    Snow reliability at a glance
                </h2>

            </div>

            <div class="snowsure-score">

                <strong>
                    ${
                        resort.snowSureScore !== null
                            ? resort.snowSureScore
                            : "—"
                    }
                </strong>

                <span>
                    / 100
                </span>

            </div>

        </div>

        ${
            resort.snowSureRating
                ? `
                    <div class="snowsure-rating">
                        ${resort.snowSureRating}
                    </div>
                `
                : ""
        }

        ${
            resort.snowSureTagline
                ? `
                    <p class="snowsure-tagline">
                        ${resort.snowSureTagline}
                    </p>
                `
                : ""
        }

    </div>

    <div class="snowsure-panel margin-bottom-16">

        <div class="snowsure-panel-header">

            <div>

                <span class="snowsure-label">
                    Apres Ski
                </span>

                <h2>
                    Apres Ski options
                </h2>

            </div>

        </div>

        ${resort.apresSki}

    </div>


    <div class="resort-page-footer">

        <a
            href="/snow-report/"
            class="back-to-resorts"
        >
            ← Back to Snow Reports
        </a>

    </div>

`;

}

function getStatusClass(status) {

return String(status || "unknown")
    .toLowerCase()
    .replaceAll(" ", "-");

}

async function loadResortPage() {

const slug =
    getSlugFromUrl();


if (!slug) {

    showError(
        "No resort was specified."
    );

    return;

}


try {

    const apiResponse =
        await fetchResortBySlug(
            slug
        );


    if (
        !apiResponse ||
        !apiResponse.data
    ) {

        throw new Error(
            "Resort data was not returned."
        );

    }


    const resort =
        mapDetailedResort(
            apiResponse.data
        );


    console.log(
        "Individual resort loaded:",
        resort
    );


    renderResort(
        resort
    );

} catch (error) {

    console.error(
        "Unable to load resort page:",
        error
    );


    showError(
        "We were unable to load the latest information for this resort. Please try again."
    );

}

}

loadResortPage();
