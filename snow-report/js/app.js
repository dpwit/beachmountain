// This will take our sample data and dynamically create the resort cards.

import { resorts } from "./resorts.js";
import { fetchSnowReport } from "./api.js";


const resortsContainer =
    document.querySelector("#resorts-container");

const searchInput =
    document.querySelector("#resort-search");

const countryFilter =
    document.querySelector("#country-filter");

const resultsCount =
    document.querySelector(".results-count");



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
                            ${resort.temperature}°C
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
                            ${resort.liftsOpen}
                            /
                            ${resort.liftsTotal}
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



function filterResorts() {

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedCountry =
        countryFilter.value;


    const filteredResorts =
        resorts.filter(resort => {

            const matchesSearch =

                resort.name
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                resort.country
                    .toLowerCase()
                    .includes(searchTerm);


            const matchesCountry =

                selectedCountry === "all"

                ||

                resort.country ===
                selectedCountry;


            return (
                matchesSearch
                &&
                matchesCountry
            );

        });


    renderResorts(filteredResorts);

}



searchInput.addEventListener(
    "input",
    filterResorts
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


        console.log(
            `View resort: ${resortId}`
        );


        // We'll add individual resort pages later.

    }
);



renderResorts(resorts);
fetchSnowReport();