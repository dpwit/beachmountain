const API_BASE_URL =
    "https://www.snowsure.ai/api/v1";


export async function fetchSnowReport() {

    try {

        const response =
            await fetch(
                `${API_BASE_URL}/snow-report?limit=12`
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

export async function fetchResorts() {

    try {

        const response =
            await fetch(
                `${API_BASE_URL}/resorts`
            );


        if (!response.ok) {

            throw new Error(
                `Resorts request failed: ${response.status}`
            );

        }


        const data =
            await response.json();


        console.log(
            "SnowSure resorts response:",
            data
        );


        return data;

    } catch (error) {

        console.error(
            "Unable to fetch resorts:",
            error
        );


        throw error;

    }

}