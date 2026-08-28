// This will take our sample data and dynamically create the resort cards.

import { resorts } from "./resorts.js";


const resortsContainer =
    document.querySelector("#resorts-container");

const searchInput =
    document.querySelector("#resort-search");


function renderResorts(resortsToRender) {

    resortsContainer.innerHTML =
        resortsToRender
            .map(createResortCard)
            .join("");

}


function createResortCard(resort) {

    return `

        <article class="resort-card">

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
                    class="status status-open"
                >
                    ${resort.status}
                </span>

            </div>


            <!-- MAIN SNOW DEPTH -->

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


            <!-- STATS -->

            <div class="resort-stats">

                <div class="stat">

                    <span>
                        🌨
                    </span>

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

                    <span>
                        📅
                    </span>

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

                    <span>
                        🌡
                    </span>

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

                    <span>
                        🚡
                    </span>

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


            <!-- FOOTER -->

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


function searchResorts() {

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();


    const filteredResorts =
        resorts.filter(resort => {

            return (

                resort.name
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                resort.country
                    .toLowerCase()
                    .includes(searchTerm)

            );

        });


    renderResorts(filteredResorts);

}


searchInput.addEventListener(
    "input",
    searchResorts
);


renderResorts(resorts);