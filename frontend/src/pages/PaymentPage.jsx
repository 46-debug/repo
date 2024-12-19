import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PaymentPage = () => {

    const { id } = useParams();
    const [info, setInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/paxInfo/${id}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setInfo(data);
            } catch (error) {
                console.error("Error fetching details:", error);
                setInfo(null); // Handle errors by setting `info` to null
            }
        };

        fetchData();
    }, [id]);

    if (info === null) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-gray-500">Error loading data. Please try again later.</p>
            </div>
        );
    }

    if (!info) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen w-screen bg-white">
                <div>
                    <h1>Package Invoice</h1>
                    <h3>Customer Information</h3>
                </div>
            </div>
        </>
    )
}

export default PaymentPage;