const API_BASE_URL =
    "https://www.snowsure.ai/api/v1";


export async function fetchSnowReport() {

    try {

        const response =
            await fetch(
                `${API_BASE_URL}/snow-report?limit=25`
            );


        if (!response.ok) {

            throw new Error(
                `API request failed: ${response.status}`
            );

        }


        const data =
            await response.json();


        console.log(
    "SnowSure API response:",
    data
);


console.log(
    "First resort:",
    data.data.resorts[0]
);


        return data;

    } catch (error) {

        console.error(
            "Unable to fetch snow report:",
            error
        );


        throw error;

    }

}